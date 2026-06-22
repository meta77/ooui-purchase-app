import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { analyzeVueFile } from './analyzer.js';
import { generateHtml } from './generator.js';

const cwd = process.cwd();
const srcDir = path.join(cwd, 'src');
const outputDir = path.join(cwd, 'docs');
const outputFile = path.join(outputDir, 'vue-analyzer.html');

async function run() {
  console.log('Scanning Vue files...');
  const files = await glob('**/*.vue', { cwd: srcDir, absolute: true });
  
  const componentsData = [];
  
  for (const file of files) {
    console.log(`Analyzing: ${path.relative(cwd, file)}`);
    const data = analyzeVueFile(file);
    componentsData.push(data);
  }
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('Generating HTML report...');
  generateHtml(componentsData, outputFile);
  
  console.log(`Done! Report generated at: ${outputFile}`);
}

run().catch(console.error);
