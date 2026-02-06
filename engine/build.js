import fs from "node:fs/promises";
import path from "node:path";
import { parseMarkdown } from "./parseMarkdown.js";

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
    .replaceAll("{{ title }}", site.title ?? "")
    .replaceAll("{{ description }}", site.description ?? "")
    .replace("{{ lang }}", site.language ?? "ka")
    .replace("{{ keywords }}", site.keywords)
    .replaceAll("{{ title-short }}", site.title_short)
    .replaceAll("{{ description-short }}", site.description_short)
    .replaceAll("{{ site-url }}", site.site_url)
    .replace("{{ locale }}", site.locale)
    .replace("{{ original-link }}", site.original_link)
    .replace("{{ original-language }}", site.original_language)
    .replace("{{ translator }}", site.translator)
    .replaceAll("{{ GA-ID }}", site.google_analytics_id)
    .replace("{{ github-edit-link }}", site.github_edit_link)
    .replace("{{ year }}", site.year ?? "2026")
    .replace("{{ content }}", contentHtml);

  await fs.writeFile(path.join(DIST_DIR, "index.html"), template);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
