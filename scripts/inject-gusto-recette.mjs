import { readFileSync, writeFileSync } from 'node:fs';
// Ajoute le bloc La Recette, le lien de menu et la question FAQ à public/gusto.html (idempotent).
// Les textes vivent dans gusto-recette-blocs.json pour que le diff de la page reste lisible.
const blocs = JSON.parse(readFileSync('scripts/gusto-recette-blocs.json', 'utf8'));
let html = readFileSync('public/gusto.html', 'utf8');
if (!html.includes('id="recette-diagnostic"')) {
  const insertAfter = (anchor, text) => {
    if (!html.includes(anchor)) throw new Error(`Ancre introuvable : ${anchor.slice(0, 60)}`);
    html = html.replace(anchor, () => anchor + text);
  };
  const insertBefore = (anchor, text) => {
    if (!html.includes(anchor)) throw new Error(`Ancre introuvable : ${anchor.slice(0, 60)}`);
    html = html.replace(anchor, () => text + anchor);
  };
  insertAfter('"mainEntity": [', blocs.faqQuestion);
  insertBefore('<a href="#tarif">Le tarif</a>', '<a href="#recette-diagnostic">La Recette</a>');
  insertAfter('Imaginé par So MIAM et +100 restaurateurs.</p></section>', blocs.section);
  insertAfter('<h2>Les réponses<br/>à tes questions.</h2><div>', blocs.faqDetails);
  writeFileSync('public/gusto.html', html);
}
