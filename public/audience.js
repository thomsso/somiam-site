(() => {
  'use strict';
  const measurementId = 'G-HJNNL9B0CF';
  const consentKey = 'somiam-audience-consent-v1';
  const consentLifetime = 180 * 24 * 60 * 60 * 1000;
  let started = false;
  let previousFocus;

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(consentKey));
      if (saved && ['accepted', 'refused'].includes(saved.choice) &&
          saved.expires > Date.now()) return saved.choice;
    } catch { /* Storage may be unavailable; default to no tracking. */ }
    return null;
  }

  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', location.hostname, '.so-miam.com']) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  }

  function startAnalytics() {
    if (started) return;
    // Never send preview/local visits to the production property.
    if (!['www.so-miam.com', 'so-miam.com'].includes(location.hostname)) return;
    started = true;
    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    // Drop URL parameters/fragments (including checkout session identifiers).
    const pageUrl = new URL(location.href);
    pageUrl.search = '';
    pageUrl.hash = '';
    let referrer = '';
    try {
      const source = new URL(document.referrer);
      referrer = source.origin + source.pathname;
    } catch { /* Direct visit. */ }
    window.gtag('config', measurementId, {
      page_location: pageUrl.href,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 60 * 60 * 24 * 395,
      cookie_update: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  const banner = document.createElement('section');
  banner.id = 'audience-consent';
  banner.setAttribute('aria-label', 'Choix de mesure d’audience');
  banner.hidden = true;
  banner.innerHTML = `<div><strong>Mesure d’audience</strong><p>Avec ton accord, Google Analytics nous aide à comprendre les visites et les pages consultées. Tu peux refuser ou changer d’avis à tout moment.</p><a href="/politique-confidentialite">En savoir plus</a></div><div class="audience-actions"><button type="button" data-choice="refused">Refuser</button><button type="button" data-choice="accepted">Accepter</button></div>`;
  const preferences = document.createElement('div');
  preferences.className = 'audience-preferences';
  const settingsButton = document.createElement('button');
  settingsButton.type = 'button';
  settingsButton.textContent = 'Gérer les cookies';
  settingsButton.setAttribute('aria-controls', banner.id);
  settingsButton.setAttribute('aria-expanded', 'false');
  preferences.append(settingsButton);
  document.body.append(preferences, banner);

  function showChoices(focus) {
    banner.hidden = false;
    settingsButton.setAttribute('aria-expanded', 'true');
    if (focus) {
      previousFocus = document.activeElement;
      banner.querySelector('button').focus();
    }
  }
  settingsButton.addEventListener('click', () => showChoices(true));
  banner.addEventListener('click', (event) => {
    const choice = event.target.closest('button[data-choice]')?.dataset.choice;
    if (!choice) return;
    try {
      localStorage.setItem(consentKey, JSON.stringify({ choice, expires: Date.now() + consentLifetime }));
    } catch { /* Honor the choice for this page even without persistence. */ }
    banner.hidden = true;
    settingsButton.setAttribute('aria-expanded', 'false');
    (previousFocus || settingsButton).focus({ preventScroll: true });
    if (choice === 'accepted') startAnalytics();
    else {
      window[`ga-disable-${measurementId}`] = true;
      clearAnalyticsCookies();
      // Unload the tag completely after withdrawal; no cookieless pings.
      if (started) location.reload();
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== consentKey && event.key !== null) return;
    if (readChoice() !== 'accepted') {
      window[`ga-disable-${measurementId}`] = true;
      clearAnalyticsCookies();
      if (started) location.reload();
    }
  });
  if (readChoice() === 'accepted') startAnalytics();
  else {
    window[`ga-disable-${measurementId}`] = true;
    clearAnalyticsCookies();
    if (!readChoice()) showChoices(false);
  }
})();
