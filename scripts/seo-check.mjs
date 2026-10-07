import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir = 'src/content/blog';
const errors = [];
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const text = fs.readFileSync(`${dir}/${file}`, 'utf8');
  const metadata = text.split('---')[1] || '';
  const value = key => metadata.match(new RegExp(`^${key}: *["']?(.*?)["']?$`, 'm'))?.[1];
  const title = value('title'), description = value('description');
  if (!title || title.length > 65) errors.push(`${file}: titre absent ou >65 caractères`);
  if (!description || description.length < 140 || description.length > 160) errors.push(`${file}: description hors 140–160 caractères`);
  if (!['gusto','formation','agence'].includes(value('offer'))) errors.push(`${file}: offre absente ou invalide`);
  if (!fs.readFileSync('public/sitemap.xml','utf8').includes(`/blog/${file.slice(0,-3)}<`)) errors.push(`${file}: sitemap absent`);
  for (const pattern of [/250[ \u00a0]?000.{0,12}(?:€|CA)/i, /520\s*%/, /\+100\s*%.{0,90}chaque mois/i, /15\s*%.{0,30}(?:classement|ranking)/i]) {
    // Prohibited marketing claims, not a complete fact checker.
    if (pattern.test(text)) errors.push(`${file}: affirmation obsolète à vérifier (${pattern})`);
  }
}
const layout = fs.readFileSync('src/layouts/BlogLayout.astro','utf8');
assert(layout.includes("href: '/gusto'"));
assert(layout.includes("href: 'https://recette.so-miam.com/'"));
assert(!/href="https:\/\/recette.so-miam.com\/"[^>]*>Essayer/.test(layout));
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Métadonnées, offres, sitemap et régressions éditoriales connues : OK. Relecture des faits encore requise.');
