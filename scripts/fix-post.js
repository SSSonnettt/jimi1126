const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "content", "blog");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let raw = fs.readFileSync(filePath, "utf-8");

  // Ensure the file starts with export const metadata
  if (!raw.startsWith("export const metadata")) continue;

  // Strip and parse metadata
  const endIdx = raw.indexOf("};\n");
  if (endIdx === -1) continue;
  const metaStr = raw.substring("export const metadata = ".length, endIdx + 2);

  // Get body after metadata
  let body = raw.substring(endIdx + 3).trimStart();

  // Rebuild file with clean LF line endings and tight metadata
  const clean = "export const metadata = " + metaStr + "\n\n" + body + "\n";

  if (raw !== clean) {
    fs.writeFileSync(filePath, clean, "utf-8");
    console.log("Cleaned:", file);
  }
}

console.log("Done.");
