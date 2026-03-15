import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const DIST = path.join(process.cwd(), "dist");

const assets = ["styles", "fonts", "scripts"];

async function copyAssets() {
  for (const asset of assets) {
    const srcPath = path.join(process.cwd(), asset);
    const destPath = path.join(DIST, asset);

    if (existsSync(srcPath)) {
      await fs.cp(srcPath, destPath, { recursive: true });
    }
  }
}

copyAssets()
  .then(() => console.log("✓ Assets copied to dist/"))
  .catch((err) => {
    console.error("Error copyings assets:", err);
    process.exit(1);
  });
