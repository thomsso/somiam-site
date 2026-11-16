// « Gérer les cookies » du pied de page : rouvre le bandeau de consentement existant
// (bouton créé par audience.js ou gusto-consent.js). Sans lui, le lien mène à la politique de confidentialité.
document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-smf-cookies]');
  if (!link) return;
  const reopen = document.querySelector('.audience-preferences button');
  if (!reopen) return;
  event.preventDefault();
  reopen.click();
});
