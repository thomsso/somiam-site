const filters=[...document.querySelectorAll('[data-filter]')];
filters.forEach(button=>button.addEventListener('click',()=>{
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;document.querySelectorAll('#photo-grid figure').forEach(photo=>{const show=button.dataset.filter==='all'||photo.dataset.category===button.dataset.filter;photo.hidden=!show;if(show)count++;});
 document.querySelector('.filter-status').textContent=`${count} photos · ${button.textContent==='Tout'?'classées par Gusto':button.textContent}`;
}));

const demoValues=[1800, 2450, 3000, 4100, 4800, 6100, 7050, 8300, 9400, 10100, 11600, 12800, 14200, 15400, 16600, 18000, 19400, 21000, 22200, 23500, 25000, 26700, 27800, 29100, 30700, 32100, 33700, 35200, 36200, 37370].map(value => value * 10);
const chart=document.querySelector('.interactive-chart');
let point=29;
function showPoint(i){point=Math.max(0,Math.min(29,i));const x=point*700/29,y=180-(demoValues[point]-demoValues[0])/(demoValues[29]-demoValues[0])*155;
chart.querySelector('.chart-cross').setAttribute('x1',x);chart.querySelector('.chart-cross').setAttribute('x2',x);chart.querySelector('.chart-dot').setAttribute('cx',x);chart.querySelector('.chart-dot').setAttribute('cy',y);
const text=`Jour ${point+1} · ${demoValues[point].toLocaleString('fr-FR')} vues`;chart.querySelector('output').textContent=text;chart.setAttribute('aria-valuenow',point+1);chart.setAttribute('aria-valuetext',text);
chart.querySelector('output').style.left=`${Math.max(0,Math.min(chart.clientWidth-165,chart.clientWidth*point/29-70))}px`;}
function pointAt(e){const r=chart.getBoundingClientRect();showPoint(Math.round((e.clientX-r.left)/r.width*29));}
chart.addEventListener('pointermove',pointAt);chart.addEventListener('pointerdown',pointAt);chart.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();showPoint(e.key==='Home'?0:e.key==='End'?29:point+(e.key==='ArrowRight'?1:-1));}});showPoint(29);

const photoRail=document.querySelector('#photo-grid');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollMode=reduced?'instant':'smooth';
function updatePhotoButtons(){document.querySelectorAll('[data-photo-dir]').forEach(b=>b.disabled=Number(b.dataset.photoDir)<0?photoRail.scrollLeft<2:photoRail.scrollLeft>=photoRail.scrollWidth-photoRail.clientWidth-2);}
document.querySelectorAll('[data-photo-dir]').forEach(b=>b.addEventListener('click',()=>photoRail.scrollBy({left:Number(b.dataset.photoDir)*photoRail.clientWidth*.75,behavior:scrollMode})));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{photoRail.scrollTo({left:0,behavior:'instant'});requestAnimationFrame(updatePhotoButtons);}));
photoRail.addEventListener('scroll',updatePhotoButtons,{passive:true});window.addEventListener('resize',updatePhotoButtons);updatePhotoButtons();
const proofRail=document.querySelector('.proof-carousel'),pauseButton=document.querySelector('#proof-pause'),proofContainer=document.querySelector('.customer-proof');
let paused=reduced,hovered=false,visible=false;
function setPaused(value){paused=value;pauseButton.textContent=value?'Reprendre':'Pause';pauseButton.setAttribute('aria-pressed',String(value));}
function advance(dir){const cards=[...proofRail.children],step=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(proofRail).gap);const atEnd=proofRail.scrollLeft>=proofRail.scrollWidth-proofRail.clientWidth-3;proofRail.scrollTo({left:dir>0&&atEnd?0:Math.max(0,proofRail.scrollLeft+dir*step),behavior:scrollMode});}
document.querySelectorAll('[data-proof-dir]').forEach(b=>b.addEventListener('click',()=>{setPaused(true);advance(Number(b.dataset.proofDir));}));
pauseButton.addEventListener('click',()=>setPaused(!paused));proofRail.addEventListener('pointerdown',()=>setPaused(true));proofRail.addEventListener('keydown',e=>{setPaused(true);if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();advance(e.key==='ArrowRight'?1:-1);}});proofRail.addEventListener('focusin',()=>setPaused(true));proofContainer.addEventListener('mouseenter',()=>hovered=true);proofContainer.addEventListener('mouseleave',()=>hovered=false);
window.addEventListener('blur',()=>setPaused(true));new IntersectionObserver(entries=>visible=entries[0].isIntersecting,{threshold:.15}).observe(proofRail);
proofRail.addEventListener('scroll',()=>{const step=proofRail.children[0].getBoundingClientRect().width+parseFloat(getComputedStyle(proofRail).gap);document.querySelector('.proof-position').textContent=`${Math.round(proofRail.scrollLeft/step)+1} / ${proofRail.children.length}`;},{passive:true});
setInterval(()=>{if(!paused&&!hovered&&visible&&!document.hidden)advance(1);},7000);setPaused(paused);

// Le code reste dans l'URL : aucune attribution anonyme persistante.
const affiliateRef = new URLSearchParams(window.location.search).get('ref');
const affiliateCode = affiliateRef && /^[a-z0-9]{12}$/.test(affiliateRef) ? affiliateRef : null;
if (affiliateCode) {
  document.querySelectorAll('[data-diagnostic]').forEach(link => {
    link.href = 'https://app.so-miam.com/partenaires/diagnostic?ref=' + encodeURIComponent(affiliateCode);
  });
}

// Qualification sans collecte de coordonnées ; le parcours partenaire conserve
// son formulaire et son attribution serveur avant l'ouverture du même calendrier.
const qualificationForm = document.querySelector('#diagnostic-form');
qualificationForm.elements.investment.addEventListener('change', () => {
  const needsQualification = qualificationForm.elements.investment.value !== 'free';
  qualificationForm.elements.role.required = needsQualification;
  qualificationForm.elements.goal.required = needsQualification;
});
qualificationForm.addEventListener('submit', event => {
  event.preventDefault();
  const answers = new FormData(qualificationForm);
  const result = document.querySelector('#diagnostic-result');
  const free = answers.get('investment') === 'free';
  const software = answers.get('goal') === 'software';
  const other = answers.get('role') === 'other';
  result.replaceChildren();
  const heading = document.createElement('h3');
  const text = document.createElement('p');
  const link = document.createElement('a');
  link.className = 'cta';
  if (free) {
    heading.textContent = 'Commence par nos guides gratuits.';
    text.textContent = 'Le blog So MIAM te donne des conseils concrets à appliquer dans ton restaurant, sans réserver un appel commercial.';
    link.href = '/blog'; link.textContent = 'Accéder au blog gratuit ↗';
  } else if (software) {
    heading.textContent = 'Gusto seul correspond à ton besoin.';
    text.textContent = 'Découvre le logiciel pendant 14 jours, puis 69 € HT/mois sans engagement. Aucun diagnostic commercial nécessaire.';
    link.href = '#gusto-seul'; link.textContent = 'Voir l’offre Gusto seul ↗';
  } else if (other) {
    heading.textContent = 'Prépare l’échange avec le décisionnaire.';
    text.textContent = 'Invite le dirigeant ou ton associé à compléter ce formulaire pour discuter ensemble des priorités et d’un éventuel accompagnement payant.';
    link.href = '/blog'; link.textContent = 'Consulter les conseils So MIAM ↗';
  } else {
    heading.textContent = 'Choisis ton créneau de diagnostic.';
    text.textContent = 'Tu vas renseigner tes coordonnées et choisir un rendez-vous de 45 minutes en visioconférence. La réservation sera confirmée par GoHighLevel.';
    link.href = affiliateCode
      ? 'https://app.so-miam.com/partenaires/diagnostic?ref=' + encodeURIComponent(affiliateCode)
      : 'https://api.leadconnectorhq.com/widget/booking/7HVaYjLFFiKpS6RwuXXd';
    link.textContent = 'Choisir mon créneau ↗';
  }
  const reset = document.createElement('button');
  reset.type = 'button'; reset.className = 'qualification-reset'; reset.textContent = 'Modifier mes réponses';
  reset.addEventListener('click', () => { result.hidden = true; qualificationForm.hidden = false; qualificationForm.querySelector('select').focus(); });
  result.append(heading, text, link, reset);
  qualificationForm.hidden = true; result.hidden = false; result.focus();
});

// Tous les essais utilisent le même endpoint Stripe.
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
      body: JSON.stringify({ restaurantName: '', affiliateCode }),
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

const demoPlay = document.querySelector('.demo-play');
demoPlay?.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.tella.tv/video/vid_cmv8b63b600oy02kz8bop4zu6/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0&autoPlay=true';
  iframe.title = 'Découvre Gusto en 90 secondes';
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;
  demoPlay.replaceWith(iframe);
  iframe.focus();
}, { once: true });
