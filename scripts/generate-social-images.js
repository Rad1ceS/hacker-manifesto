import sharp from "sharp";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const input = path.join(process.cwd(), "icons/base_social-2400x1260.png");
const outDir = path.join(process.cwd(), "dist/social");

async function generateSocialImages() {
  if (!existsSync(outDir)) {
    await fs.mkdir(outDir, { recursive: true });
  }

  await sharp(input).resize(1200, 630).png().toFile(`${outDir}/og-1200x630.png`);
  await sharp(input).resize(600, 315).png().toFile(`${outDir}/og-600x315.png`);
  await sharp(input).resize(1200, 630).png().toFile(`${outDir}/twitter-1200x630.png`);

  console.log("✓ Generated social images.");
}

generateSocialImages().catch((err) => {
  console.error("Failed to generate social images:", err);
  process.exit(1);
});
