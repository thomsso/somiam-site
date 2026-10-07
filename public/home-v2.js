/* Native controls: no scroll hijacking or animation dependency. */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const gallery = document.querySelector('.gallery-track-wrap');
document.querySelectorAll('[data-gallery-step]').forEach(button => {
  button.addEventListener('click', () => gallery.scrollBy({left:Number(button.dataset.galleryStep) * Math.min(gallery.clientWidth * .8, 740), behavior:reduceMotion.matches ? 'instant' : 'smooth'}));
});
const motionButton = document.querySelector('.motion-toggle');
function setMotionPaused(paused) {
  window.somiamMotionPaused = paused;
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Reprendre les animations' : 'Mettre les animations en pause';
  if(typeof resetAuto === 'function') resetAuto();
  if(typeof resetResAuto === 'function') resetResAuto();
}
motionButton.addEventListener('click', () => setMotionPaused(!window.somiamMotionPaused));
reduceMotion.addEventListener('change', event => setMotionPaused(event.matches));
setMotionPaused(reduceMotion.matches);

const heroPhotos = document.querySelector('.hero-shots');
document.querySelectorAll('[data-hero-step]').forEach(button => {
  button.addEventListener('click', () => heroPhotos.scrollBy({left:Number(button.dataset.heroStep) * 124, behavior:reduceMotion.matches ? 'instant' : 'smooth'}));
});
