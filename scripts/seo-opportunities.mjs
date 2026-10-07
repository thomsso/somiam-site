import fs from 'node:fs';
const file = process.argv[2] || '.seo/performance.json';
if (!fs.existsSync(file)) { console.error('Données absentes : relever Search Console avant de conclure.'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
if (!data.observedAt || !data.period || !Array.isArray(data.pages)) throw new Error('Relevé incomplet');
const age = Math.floor((Date.now() - Date.parse(data.observedAt)) / 86400000);
console.log(JSON.stringify({ source: data.source, period: data.period, observedAt: data.observedAt, stale: age > 7, note: 'Hypothèses à confirmer par requêtes, ancienneté et intention. Aucune causalité établie.' }));
for (const p of [...data.pages].sort((a,b) => (b.impressions ?? -1) - (a.impressions ?? -1))) {
  const clicks = p.clicks, impressions = p.impressions;
  if (!Number.isFinite(clicks) || !Number.isFinite(impressions) || impressions <= 0) continue;
  const ctr = clicks / impressions * 100;
  const action = impressions >= 100 && ctr < 1 ? 'Examiner requêtes, position, titre et adéquation de la réponse' : clicks >= 2 ? 'Chercher une question voisine distincte et une preuve nouvelle' : 'Continuer à observer : faible signal';
  console.log(JSON.stringify({ url: p.url, clicks, impressions, ctr: Number(ctr.toFixed(2)), aiImpressions: p.aiImpressions ?? null, action }));
}
