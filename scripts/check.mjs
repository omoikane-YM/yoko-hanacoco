import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const facts = JSON.parse(await readFile(path.join(root, "src/data/site-facts.json"), "utf8"));
const humanFacts = await readFile(path.join(root, "SITE_FACTS.md"), "utf8");
const pages = ["index.html", "legal/index.html"];
const html = Object.fromEntries(await Promise.all(pages.map(async (file) => [file, await readFile(path.join(root, "dist", file), "utf8")])));
const allHtml = Object.values(html).join("\n");

function requireText(haystack, expected, label) {
  if (!haystack.includes(String(expected))) throw new Error(`Missing ${label}: ${expected}`);
}

for (const [value, label] of [
  [facts.brand.name, "brand name"],
  [facts.brand.footerText, "footer text"],
  [facts.hero.heading, "hero heading"],
  [facts.product.priceSummary, "price"],
  [facts.shipping.leadTime, "shipping lead time"],
  [`抗酸化特殊溶液配合の${facts.product.sizeMm}mmセラミックス`, "product material and size"],
  [facts.product.postMaterial, "post material"]
]) requireText(humanFacts, value, `SITE_FACTS ${label}`);

for (const [value, label] of [
  [facts.brand.footerText, "footer text"],
  [facts.hero.heading, "hero heading"],
  [new Intl.NumberFormat("ja-JP").format(facts.product.priceYen) + "円", "price"],
  [facts.shipping.leadTime, "shipping lead time"],
  [facts.product.material, "product material"],
  [facts.product.postMaterial, "post material"],
  [facts.order.orderUrl.replaceAll("&", "&amp;"), "LINE order URL"],
  [facts.order.contactUrl.replaceAll("&", "&amp;"), "LINE contact URL"],
  [facts.order.officialAccountUrl, "LINE account URL"],
  [facts.returns.customerConvenience, "return condition"],
  [facts.returns.handmadeVariance, "handmade return condition"]
]) requireText(allHtml, value, `generated ${label}`);

if (/\{\{[^}]+\}\}/.test(allHtml)) throw new Error("Unresolved template value in generated HTML");

for (const file of pages) {
  const content = html[file];
  for (const match of content.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const reference = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|\/\/)/.test(reference)) continue;
    const local = path.resolve(path.dirname(path.join(root, "dist", file)), reference.replace(/\/$/, "/index.html"));
    await access(local);
  }
}

for (const image of ["actual-products.png", "earring-post-no-text.png", "silicone-catch-no-text.png", "wearing-image.png"]) {
  const info = await stat(path.join(root, "dist/images", image));
  if (info.size === 0) throw new Error(`Empty image: ${image}`);
}

console.log("Static site checks passed");
