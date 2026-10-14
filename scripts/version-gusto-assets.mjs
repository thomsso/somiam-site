import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
// Content-addressed files prevent an old cached stylesheet from styling new markup.
mkdirSync('public/assets', { recursive: true });
let html = readFileSync('public/gusto.html', 'utf8');
for (const extension of ['css', 'js']) {
  const content = readFileSync(`public/gusto.${extension}`);
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const url = `/assets/gusto-${hash}.${extension}`;
  writeFileSync(`public${url}`, content);
  const attribute = extension === 'css' ? 'href' : 'src';
  html = html.replace(new RegExp(`${attribute}="/(?:gusto\\.${extension}|assets/gusto-[a-f0-9]+\\.${extension})"`), `${attribute}="${url}"`);
}
writeFileSync('public/gusto.html', html);
// Apply the same cache-safe delivery to the homepage hero stylesheet.
const homeCss = readFileSync('public/home-v2.css');
const homeHash = createHash('sha256').update(homeCss).digest('hex').slice(0, 12);
const homeUrl = `/assets/home-v2-${homeHash}.css`;
writeFileSync(`public${homeUrl}`, homeCss);
const home = readFileSync('public/index.html', 'utf8').replace(/href="\/(?:home-v2\.css|assets\/home-v2-[a-f0-9]+\.css)"/, `href="${homeUrl}"`);
writeFileSync('public/index.html', home);
