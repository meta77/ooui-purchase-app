import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateHtml(data, outputPath) {
  const templatePath = path.join(__dirname, 'template.html');
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  
  const finalHtml = templateHtml.replace(
    '/* INJECT_DATA_HERE */',
    JSON.stringify(data, null, 2)
  );
  
  fs.writeFileSync(outputPath, finalHtml, 'utf-8');
}
