import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'content', 'blog');

function extractString(source, key) {
  const re = new RegExp(key + '\\s*:\\s*["\'`]([^"\'`]*)["\'`]');
  const match = source.match(re);
  return match ? match[1] : null;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const metaMatch = content.match(/export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\n\});/);
  const ok = metaMatch ? 'OK' : 'FAIL';
  if (metaMatch) {
    const title = extractString(metaMatch[1], 'title');
    const date = extractString(metaMatch[1], 'date');
    console.log(`${ok} | ${file} | title=${title} | date=${date || '(missing)'}`);
  } else {
    console.log(`${ok} | ${file} | NO MATCH`);
  }
}
