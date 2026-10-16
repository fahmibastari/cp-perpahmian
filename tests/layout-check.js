/* Run in the browser console on a served page: checkPortfolioLayout().
 * Check at 320, 390, 768, 1024, and 1440 px; visual review is still required.
 * This is read-only: it does not modify the page or submit forms.
 */
function checkPortfolioLayout() {
  const issues = [];
  const width = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > width + 1) issues.push('Horizontal document overflow');
  const page = document.querySelector('[data-project-detail]') ? 'project' : document.body.dataset.page;
  const features = { home: '.motion-story', work: '.archive-ribbon', services: '.delivery-diagram', about: '.brand-assembly--about', project: '.product-viewer', contact: '.contact-signal', privacy: '.privacy-index', '404': '.brand-assembly--missing' };
  if (!document.querySelector('.page-reading-rail')) issues.push('Shared choreography not mounted');
  if (!document.querySelector('script[src^="motion-intent.js"]')) issues.push('Proximity layer not loaded');
  if (width < 960) {
    if (document.documentElement.classList.contains('intent-enabled')) issues.push('Desktop proximity enabled on a small viewport');
    if ([...document.querySelectorAll('.intent-frame,.intent-caption')].some(e => getComputedStyle(e).display !== 'none')) issues.push('Pointer decorations visible on a small viewport');
  }
  if (features[page] && !document.querySelector(features[page])) issues.push(`Missing ${page} motion composition`);
  for (const element of document.querySelectorAll('h1,h2,h3,button,input,textarea,.site-footer__statement')) {
    if (!getComputedStyle(element).fontFamily.includes('Manrope')) issues.push(`Inconsistent font: ${element.tagName}`);
  }
  for (const word of document.querySelectorAll('.kinetic-word')) {
    if (word.firstElementChild.getBoundingClientRect().width > word.getBoundingClientRect().width + 1) issues.push(`Clipped heading word: ${word.textContent}`);
  }
  for (const row of document.querySelectorAll('.service-detail__row')) {
    const columns = getComputedStyle(row).gridTemplateColumns.split(' ').length;
    if (width < 960 && columns !== 1) issues.push('Services still uses desktop columns on mobile/tablet');
  }
  for (const card of document.querySelectorAll('.service-proof > a')) {
    if (card.getBoundingClientRect().width < 120) issues.push('Service proof card is too narrow');
  }
  for (const art of document.querySelectorAll('.project-art--paired')) {
    const primary = art.querySelector('.project-art__primary').getBoundingClientRect();
    const secondary = art.querySelector('.project-art__secondary').getBoundingClientRect();
    if (primary.width && secondary.width && primary.right > secondary.left + 1) {
      issues.push('Product screenshots overlap');
    }
  }
  const heights = [...document.querySelectorAll('.project-gallery__media')].map(frame => frame.getBoundingClientRect().height);
  if (heights.length && Math.max(...heights) - Math.min(...heights) > 2) issues.push('Gallery frame heights differ');
  for (const image of document.images) {
    if (image.complete && !image.naturalWidth) issues.push(`Broken image: ${image.getAttribute('src')}`);
  }
  return { page: location.pathname, width, pass: issues.length === 0, issues };
}
