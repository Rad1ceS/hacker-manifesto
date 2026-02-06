import fs from "node:fs/promises";
import path from "node:path";
import { parseMarkdown } from "./parseMarkdown.ts";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const DIST_DIR = path.join(ROOT, "dist");

async function build() {
  await fs.mkdir(DIST_DIR, { recursive: true });

  const markdown = await fs.readFile(
    path.join(CONTENT_DIR, "essay.md"),
    "utf-8",
  );

  const site = JSON.parse(
    await fs.readFile(path.join(CONTENT_DIR, "site.json"), "utf-8"),
  );

  const contentHtml = await parseMarkdown(markdown);

  let template = await fs.readFile(
    path.join(ROOT, "templates", "base.html"),
    "utf-8",
  );

  template = template
    .replace("{{ title }}", site.title ?? "")
    .replace("{{ description }}", site.description ?? "")
    .replace("{{ lang }}", site.language ?? "en")
    .replace("{{ content }}", contentHtml);

  await fs.writeFile(path.join(DIST_DIR, "index.html"), template);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
