import fs from 'fs';
import path from 'path';
import { parse as parseSfc, compileTemplate } from '@vue/compiler-sfc';
import { parse as babelParse } from '@babel/parser';
import _traverse from '@babel/traverse';
const traverse = _traverse.default || _traverse;

export function analyzeVueFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.vue');
  
  const result = {
    name: fileName,
    path: filePath,
    apiType: 'unknown',
    props: [],
    emits: [],
    state: [],
    computed: [],
    methods: [],
    children: [], // dependencies in template
    stores: [],
    error: null,
  };

  try {
    const { descriptor, errors } = parseSfc(content);
    if (errors.length) {
      throw errors[0];
    }

    // 1. Analyze Template to find child components
    if (descriptor.template) {
      const templateAst = compileTemplate({
        source: descriptor.template.content,
        id: 'test',
        filename: filePath,
      }).ast;
      
      const findComponents = (node) => {
        if (node.type === 1 /* ELEMENT */) {
          if (node.tagType === 1 /* COMPONENT */) {
            // Vue components are usually PascalCase or kebab-case
            if (!result.children.includes(node.tag)) {
              result.children.push(node.tag);
            }
          }
        }
        if (node.children) {
          node.children.forEach(findComponents);
        }
      };
      if (templateAst) findComponents(templateAst);
    }

    // 2. Analyze Script
    const script = descriptor.scriptSetup || descriptor.script;
    if (script) {
      result.apiType = descriptor.scriptSetup ? 'composition' : 'options';
      
      const ast = babelParse(script.content, {
        sourceType: 'module',
        plugins: ['typescript', 'decorators-legacy'],
      });

      traverse(ast, {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          if (source.includes('store') || source.includes('pinia') || source.includes('vuex')) {
             result.stores.push(source);
          }
        },
        CallExpression(path) {
          const callee = path.node.callee;
          if (callee.type === 'Identifier') {
            const name = callee.name;
            if (name === 'ref' || name === 'reactive' || name === 'computed') {
              if (path.parentPath.isVariableDeclarator()) {
                const varName = path.parentPath.node.id.name;
                if (varName) {
                  if (name === 'computed') {
                    result.computed.push({ name: varName, dependencies: [] });
                  } else {
                    result.state.push({ name: varName, type: name });
                  }
                }
              }
            } else if (name === 'defineProps') {
              const arg = path.node.arguments[0];
              if (arg && arg.type === 'ObjectExpression') {
                 arg.properties.forEach(prop => {
                   if (prop.key && (prop.key.name || prop.key.value)) {
                     result.props.push({ name: prop.key.name || prop.key.value, type: 'unknown', required: false, default: null });
                   }
                 });
              } else if (arg && arg.type === 'ArrayExpression') {
                 arg.elements.forEach(el => {
                   if (el.type === 'StringLiteral') {
                     result.props.push({ name: el.value, type: 'unknown', required: false, default: null });
                   }
                 });
              }
            } else if (name === 'defineEmits') {
              const arg = path.node.arguments[0];
              if (arg && arg.type === 'ArrayExpression') {
                 arg.elements.forEach(el => {
                   if (el.type === 'StringLiteral') {
                     result.emits.push({ name: el.value, data: 'unknown' });
                   }
                 });
              }
            }
          }
        },
        VariableDeclarator(path) {
          if (path.node.init && (path.node.init.type === 'ArrowFunctionExpression' || path.node.init.type === 'FunctionExpression')) {
            if (path.node.id && path.node.id.name) {
              result.methods.push({ name: path.node.id.name, role: 'Function' });
            }
          }
        },
        FunctionDeclaration(path) {
           if (path.node.id && path.node.id.name) {
             result.methods.push({ name: path.node.id.name, role: 'Function' });
           }
        },
        ObjectProperty(path) {
           if (result.apiType === 'composition') return;
           if (path.node.key && path.node.key.name === 'props') {
             if (path.node.value.type === 'ObjectExpression') {
               path.node.value.properties.forEach(prop => {
                 result.props.push({ name: prop.key.name || prop.key.value, type: 'unknown', required: false, default: null });
               });
             } else if (path.node.value.type === 'ArrayExpression') {
               path.node.value.elements.forEach(el => {
                 result.props.push({ name: el.value, type: 'unknown', required: false, default: null });
               });
             }
           } else if (path.node.key && path.node.key.name === 'emits') {
             if (path.node.value.type === 'ArrayExpression') {
               path.node.value.elements.forEach(el => {
                 result.emits.push({ name: el.value, data: 'unknown' });
               });
             }
           } else if (path.node.key && path.node.key.name === 'methods') {
             if (path.node.value.type === 'ObjectExpression') {
               path.node.value.properties.forEach(prop => {
                 if (prop.key && prop.key.name) {
                   result.methods.push({ name: prop.key.name, role: 'Method' });
                 }
               });
             }
           }
        }
      });
    }
  } catch (err) {
    result.error = err.message || 'Parse error';
  }

  return result;
}
