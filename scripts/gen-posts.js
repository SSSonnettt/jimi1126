const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "content", "blog");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

const imports = [];
const entries = [];
for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const id = "p_" + files.indexOf(file);
  const relPath = "../../content/blog/" + file;
  imports.push(`import ${id} from "${relPath}";`);
  entries.push(`  "${slug.replace(/"/g, '\\"')}": ${id},`);
}

const code =
  "// Auto-generated — run: node scripts/gen-posts.js\n" +
  imports.join("\n") +
  "\n\n" +
  'import type { ComponentType } from "react";\n\n' +
  "export const postMap: Record<string, ComponentType> = {\n" +
  entries.join("\n") +
  "\n};\n\n" +
  `export const postCount = ${files.length};\n`;

const out = path.join(__dirname, "..", "src", "lib", "posts.gen.ts");
fs.writeFileSync(out, code);
console.log(`Generated ${files.length} post imports → src/lib/posts.gen.ts`);
