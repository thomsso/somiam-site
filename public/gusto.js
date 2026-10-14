'use strict';
const menu = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}
menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    }
  });
});

const dashboardDialog = document.querySelector('.dashboard-dialog');
document.querySelector('.dashboard-zoom').addEventListener('click', () => dashboardDialog.showModal());
dashboardDialog.addEventListener('click', event => {
  if (event.target === dashboardDialog) {
    const rect = dashboardDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dashboardDialog.close();
  }
});

// All entry points use the same existing Stripe checkout endpoint.
let checkoutPending = false;
const checkoutButtons = [...document.querySelectorAll('[data-checkout]')];
async function startCheckout() {
  if (checkoutPending) return;
  checkoutPending = true;
  checkoutButtons.forEach(button => {
    button.dataset.originalContent = button.innerHTML;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Ouverture de l’essai…';
  });
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantName: '' }),
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error('Checkout unavailable');
    const data = await response.json();
    const url = new URL(data.url);
    if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Invalid checkout URL');
    window.location.assign(url.href);
  } catch {
    checkoutPending = false;
    checkoutButtons.forEach(button => {
      button.innerHTML = button.dataset.originalContent;
      button.disabled = false;
      button.removeAttribute('aria-busy');
    });
    document.querySelector('.checkout-error').showModal();
  }
}
checkoutButtons.forEach(button => button.addEventListener('click', startCheckout));

// Keep the mobile action out of the way of consent and visible conversion sections.
const mobileTrial = document.querySelector('.mobile-trial');
const mobileQuery = matchMedia('(max-width: 800px)');
const visibility = { hero: true, prix: false, final: false, footer: false };
function updateMobileTrial() {
  const consent = document.getElementById('audience-consent');
  const visible = mobileQuery.matches && !visibility.hero && !visibility.prix && !visibility.final && !visibility.footer && (!consent || consent.hidden);
  mobileTrial.hidden = !visible;
  document.body.classList.toggle('has-mobile-trial', visible);
}
const observed = new Map([
  [document.getElementById('hero'), 'hero'],
  [document.getElementById('prix'), 'prix'],
  [document.querySelector('.last-call'), 'final'],
  [document.querySelector('footer'), 'footer']
]);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { visibility[observed.get(entry.target)] = entry.isIntersecting; });
  updateMobileTrial();
});
observed.forEach((key, element) => observer.observe(element));
mobileQuery.addEventListener('change', updateMobileTrial);
window.addEventListener('DOMContentLoaded', () => {
  const consent = document.getElementById('audience-consent');
  if (consent) new MutationObserver(updateMobileTrial).observe(consent, { attributes: true, attributeFilter: ['hidden'] });
  updateMobileTrial();
});
