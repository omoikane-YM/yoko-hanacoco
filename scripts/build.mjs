import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const facts = JSON.parse(await readFile(path.join(root, "src/data/site-facts.json"), "utf8"));
const output = path.join(root, "dist");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const [brandFirst, brandSecond] = facts.brand.name.split("🌸").filter(Boolean);
const values = {
  "brand.first": brandFirst,
  "brand.second": brandSecond,
  "brand.flower": "✿",
  "brand.plainName": `${brandFirst} ${brandSecond}`,
  "brand.footerText": facts.brand.footerText,
  "hero.heading": facts.hero.heading,
  "product.name": facts.product.name,
  "product.price": new Intl.NumberFormat("ja-JP").format(facts.product.priceYen) + "円",
  "product.priceLabel": facts.shipping.shippingIncluded ? "税込・送料込み" : "税込",
  "product.priceLegal": `${new Intl.NumberFormat("ja-JP").format(facts.product.priceYen)}円（税込・送料込み）`,
  "product.material": facts.product.material,
  "product.design": facts.product.design,
  "product.sizeMm": facts.product.sizeMm,
  "product.postMaterial": facts.product.postMaterial,
  "product.catchMaterial": facts.product.catchMaterial,
  "product.catchListLabel": `${facts.product.catchMaterial.replace("クリア透明色の", "")}キャッチ（クリア透明色）`,
  "order.method": facts.order.method,
  "order.messageDoesNotConfirm": facts.order.messageDoesNotConfirm,
  "order.confirmationPoint": facts.order.confirmationPoint,
  "order.confirmationSentence": facts.order.confirmationPoint === "入金確認時点" ? "当方が入金を確認した時点" : facts.order.confirmationPoint,
  "order.orderUrl": facts.order.orderUrl,
  "order.contactUrl": facts.order.contactUrl,
  "order.officialAccountUrl": facts.order.officialAccountUrl,
  "shipping.leadTime": facts.shipping.leadTime,
  "returns.customerConvenience": facts.returns.customerConvenience,
  "returns.damageWindow": facts.returns.damageWindow,
  "returns.handmadeVariance": facts.returns.handmadeVariance
};

function render(template, filename) {
  const rendered = template.replace(/\{\{([a-zA-Z0-9.]+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`${filename}: unknown data key ${key}`);
    return escapeHtml(values[key]);
  });
  if (/\{\{[^}]+\}\}/.test(rendered)) throw new Error(`${filename}: unresolved template value`);
  return rendered;
}

async function renderFile(source, destination) {
  const template = await readFile(path.join(root, source), "utf8");
  const target = path.join(output, destination);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, render(template, source), "utf8");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await renderFile("index.html", "index.html");
await renderFile("legal/index.html", "legal/index.html");
await cp(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
await cp(path.join(root, "images"), path.join(output, "images"), { recursive: true });
await cp(path.join(root, "favicon.svg"), path.join(output, "favicon.svg"));
console.log("Built static site in dist/");
