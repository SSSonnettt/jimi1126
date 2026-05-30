import fs from 'fs';
import path from 'path';

const srcDir = '/Users/wuji/workspace/blog/content/articles';
const destDir = path.join(process.cwd(), 'src', 'content', 'blog');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const yaml = match[1];
  const body = match[2];
  const title = (yaml.match(/title:\s*['"]([^'"]*)['"]/) || [])[1] || '';
  const description = (yaml.match(/description:\s*['"]([^'"]*)['"]/) || [])[1] || '';
  const published = (yaml.match(/published:\s*(\S+)/) || [])[1] || '';
  const keywordsMatch = yaml.match(/content:\s*'([^']*)'/);
  const keywords = keywordsMatch ? keywordsMatch[1] : '';
  return { title, description, published, keywords, body };
}

function formatDate(published) {
  if (!published) return '';
  const parts = published.split('/');
  if (parts.length !== 3) return published;
  return `${parts[0]}-${String(parts[1]).padStart(2, '0')}-${String(parts[2]).padStart(2, '0')}`;
}

function escapeAngleBrackets(body) {
  const parts = [];
  let remaining = body;

  while (remaining.length > 0) {
    const codeStart = remaining.indexOf('```');
    if (codeStart === -1) {
      parts.push({ text: remaining, isCode: false });
      break;
    }
    if (codeStart > 0) {
      parts.push({ text: remaining.substring(0, codeStart), isCode: false });
    }
    const afterStart = remaining.substring(codeStart + 3);
    const codeEnd = afterStart.indexOf('```');
    if (codeEnd === -1) {
      parts.push({ text: remaining.substring(codeStart), isCode: true });
      break;
    }
    parts.push({ text: remaining.substring(codeStart, codeStart + 3 + codeEnd + 3), isCode: true });
    remaining = remaining.substring(codeStart + 3 + codeEnd + 3);
  }

  return parts.map(p => {
    if (p.isCode) return p.text;
    // Escape <Uppercase...> patterns (MDX treats them as JSX components)
    return p.text.replace(/<([A-Z][^>]*)>/g, '&lt;$1&gt;');
  }).join('');
}

function migrate() {
  const subdirs = fs.readdirSync(srcDir).filter(d => !d.startsWith('.'));

  for (const subdir of subdirs) {
    const dirPath = path.join(srcDir, subdir);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const result = parseFrontmatter(raw);
      if (!result) continue;

      const { title, description, published, keywords, body } = result;
      const date = formatDate(published);
      const tags = keywords ? keywords.split(',').map(t => t.trim()).filter(Boolean) : [];

      const metaEntries = [];
      metaEntries.push(`  title: "${title.replace(/"/g, '\\"')}"`);
      metaEntries.push(`  description: "${description.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
      metaEntries.push(`  date: "${date}"`);
      if (tags.length > 0) {
        metaEntries.push(`  tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
      }

      const metadata = `export const metadata = {\n${metaEntries.join(',\n')}\n};\n`;
      const safeBody = escapeAngleBrackets(body);
      const outName = file.replace(/\.md$/, '.mdx');
      const outPath = path.join(destDir, outName);

      const output = (metadata + '\n' + safeBody.trimStart()).replace(/\r\n/g, '\n');
      console.log('WRITE:', outName);
      fs.writeFileSync(outPath, output, 'utf-8');
    }
  }
  console.log('\nDone.');
}

migrate().catch(console.error);
