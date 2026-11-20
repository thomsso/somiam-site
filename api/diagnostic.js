import { createHash } from 'node:crypto';

// Diagnostic gratuit de la page /gusto. Le navigateur ne parle qu'a cette
// fonction ; elle relaie vers Gusto (app.so-miam.com) avec le secret partage,
// qui ne quitte jamais le serveur. Le scan, le score et les plafonds vivent
// dans Gusto (somiam-platform, app/api/public/diagnostic).
//
//   GET  /api/diagnostic?places=<saisie>          suggestions de restaurants
//   GET  /api/diagnostic?id=<uuid>                avancement, puis resultat
//   POST /api/diagnostic {action:'start', placeId, keyword, instagram}
//   POST /api/diagnostic {action:'contact', id, firstName, email, phone}

const PLATFORM = (process.env.PLATFORM_URL || 'https://app.so-miam.com').replace(/\/$/, '');
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function deviceHash(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = forwarded || req.socket?.remoteAddress || 'inconnue';
  return createHash('sha256').update(`${ip}|${process.env.INVITE_SECRET || ''}`).digest('hex');
}

async function relay(req, res, path, init = {}) {
  let response;
  try {
    response = await fetch(`${PLATFORM}/api/public/diagnostic${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'x-invite-secret': process.env.INVITE_SECRET || '',
        'x-device-hash': deviceHash(req),
      },
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return res.status(503).json({ error: 'Le diagnostic ne répond pas. Réessaie dans un instant.' });
  }
  const body = await response.json().catch(() => null);
  // Une erreur d'authentification entre nos deux serveurs ne regarde pas le visiteur.
  if (!body || response.status === 401 || response.status === 403) {
    console.error('Diagnostic relay error:', response.status);
    return res.status(503).json({ error: 'Le diagnostic ne répond pas. Réessaie dans un instant.' });
  }
  return res.status(response.status).json(body);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (!process.env.INVITE_SECRET) {
    console.error('Diagnostic: INVITE_SECRET absent');
    return res.status(503).json({ error: 'Le diagnostic ne répond pas. Réessaie dans un instant.' });
  }

  if (req.method === 'GET') {
    const { places, id } = req.query || {};
    if (typeof places === 'string') {
      const q = places.trim().slice(0, 80);
      if (q.length < 3) return res.status(200).json({ places: [] });
      return relay(req, res, `/places?q=${encodeURIComponent(q)}`);
    }
    if (typeof id === 'string' && UUID.test(id)) return relay(req, res, `/${id}`);
    return res.status(400).json({ error: 'Requête invalide.' });
  }

  if (req.method === 'POST') {
    const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
    // Champ piege : un humain ne le voit pas, un robot le remplit.
    if (typeof body.website === 'string' && body.website.trim()) return res.status(400).json({ error: 'Requête invalide.' });
    if (body.action === 'start') {
      return relay(req, res, '', {
        method: 'POST',
        body: JSON.stringify({ placeId: body.placeId, keyword: body.keyword, instagram: body.instagram, deviceHash: deviceHash(req) }),
      });
    }
    if (body.action === 'contact' && typeof body.id === 'string' && UUID.test(body.id)) {
      return relay(req, res, `/${body.id}`, {
        method: 'POST',
        body: JSON.stringify({ firstName: body.firstName, email: body.email, phone: body.phone }),
      });
    }
    return res.status(400).json({ error: 'Requête invalide.' });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
