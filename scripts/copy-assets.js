import fs from "fs";
import path from "path";

const DIST = "dist";

const assets = ["styles", "fonts", "scripts"];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (const asset of assets) {
  copyRecursive(asset, path.join(DIST, asset));
}

console.log("✓ Assets copied to dist/");
