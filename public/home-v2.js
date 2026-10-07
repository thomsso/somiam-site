/* Native controls: no scroll hijacking or animation dependency. */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const gallery = document.querySelector('.gallery-track-wrap');
document.querySelectorAll('[data-gallery-step]').forEach(button => {
  button.addEventListener('click', () => gallery.scrollBy({left:Number(button.dataset.galleryStep) * Math.min(gallery.clientWidth * .8, 740), behavior:reduceMotion.matches ? 'instant' : 'smooth'}));
});
const heroPhotos = document.querySelector('.hero-shots');
document.querySelectorAll('[data-hero-step]').forEach(button => {
  button.addEventListener('click', () => heroPhotos.scrollBy({left:Number(button.dataset.heroStep) * 124, behavior:reduceMotion.matches ? 'instant' : 'smooth'}));
});
