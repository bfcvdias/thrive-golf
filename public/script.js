import { cleanState, togglePriority, summary, requestBody } from './state.mjs';
import { siteConfig } from './config.js';
const routeTable = { '/': 'home', '/about': 'about', '/sports': 'sports', '/personal': 'personal', '/golf': 'golf', '/golf/advantage': 'advantage', '/golf/learn': 'learn', '/golf/how': 'how', '/build/priorities': 'priorities', '/build/training': 'training', '/build/program': 'program', '/request': 'request' };
const previousRoute = { priorities: '/', training: '/build/priorities', program: '/build/training', request: '/' };
const darkHeaders = new Set(['home', 'sports']);
const builderScreens = new Set(['priorities', 'training', 'program', 'request']);
const storageKey = 'thrive-program-v3';
let state;
try { state = cleanState(JSON.parse(sessionStorage.getItem(storageKey))); } catch { state = cleanState(); }
let lastScreen = 'home';
let requestOrigin = state.training && state.priorities.length ? '/build/program' : '/';
let preparedRequest = '';
const $ = selector => document.querySelector(selector);
function saveState() { try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Selections still work in this tab if storage is unavailable. */ } }
function syncControls() {
  document.querySelectorAll('input[name="priority"]').forEach(input => { input.checked = state.priorities.includes(input.value); });
  document.querySelectorAll('input[name="training"]').forEach(input => { input.checked = state.training === input.value; });
}
function refreshSummary() {
  const current = summary(state);
  $('#summary-goal').textContent = current.goal;
  $('#summary-priorities').textContent = current.priorities || 'To discuss';
  $('#summary-training').textContent = current.training || 'To discuss';
  $('#program-photo').src = state.goal === 'personal' ? 'assets/reference/life.webp' : state.goal === 'sports' ? 'assets/reference/sports.webp' : 'assets/reference/hero.webp';
  $('#request-selection').textContent = state.priorities.length ? `Your selection: ${current.priorities}${current.training ? ` · ${current.training}` : ''}` : '';
}
function renderRoute(focus = true) {
  let route = location.hash.slice(1) || '/';
  if (!Object.hasOwn(routeTable, route)) { history.replaceState(null, '', '#/'); route = '/'; }
  if (route === '/build/training' && !state.priorities.length) { history.replaceState(null, '', '#/build/priorities'); route = '/build/priorities'; }
  if (route === '/build/program' && (!state.priorities.length || !state.training)) { route = !state.priorities.length ? '/build/priorities' : '/build/training'; history.replaceState(null, '', `#${route}`); }
  const current = routeTable[route];
  if (current === 'request' && lastScreen !== 'request') requestOrigin = lastScreen === 'program' ? '/build/program' : Object.keys(routeTable).find(key => routeTable[key] === lastScreen) || '/';
  document.querySelectorAll('[data-screen]').forEach(section => { section.hidden = section.dataset.screen !== current; });
  $('#site-header').classList.toggle('light-header', darkHeaders.has(current));
  document.body.classList.toggle('builder-mode', builderScreens.has(current));
  $('.main-nav').hidden = builderScreens.has(current);
  $('#back-link').hidden = !builderScreens.has(current);
  $('#back-link').href = '#' + (current === 'request' ? requestOrigin : current === 'priorities' && state.goal === 'personal' ? '/personal' : previousRoute[current] || '/');
  document.querySelectorAll('[data-nav]').forEach(link => { if (link.dataset.nav === current) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  syncControls(); refreshSummary();
  if (current === 'request' && lastScreen !== 'request') { $('#request-form').elements.interest.value = state.goal; $('#request-ready').hidden = true; }
  const heading = document.querySelector(`[data-screen="${current}"] h1`);
  document.title = `${heading.innerText.replace(/\s+/g, ' ').trim()} | Thrive`;
  if (focus) heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
  lastScreen = current;
}
$('.skip-link').addEventListener('click', event => { event.preventDefault(); document.querySelector('[data-screen]:not([hidden]) h1').focus(); });
document.querySelectorAll('[data-goal]').forEach(link => link.addEventListener('click', () => { state.goal = link.dataset.goal; saveState(); }));
document.querySelectorAll('input[name="priority"]').forEach(input => input.addEventListener('change', () => { state = togglePriority(state, input.value, input.checked); saveState(); syncControls(); $('#priority-error').textContent = ''; }));
$('#priorities-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!state.priorities.length) { $('#priority-error').textContent = 'Choose at least one area, or select “I’m not sure”.'; $('input[name="priority"]').focus(); return; }
  location.hash = '/build/training';
});
document.querySelectorAll('input[name="training"]').forEach(input => input.addEventListener('change', () => { state.training = input.value; saveState(); $('#training-error').textContent = ''; }));
$('#training-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!state.training) { $('#training-error').textContent = 'Choose Independent or Pro to continue.'; $('input[name="training"]').focus(); return; }
  location.hash = '/build/program';
});
$('#request-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = Object.fromEntries(new FormData(form));
  if (!fields.name.trim()) { form.elements.name.setCustomValidity('Please enter your name.'); form.elements.name.reportValidity(); return; }
  preparedRequest = requestBody(fields, state);
  const subject = `Thrive information request — ${form.elements.interest.selectedOptions[0].textContent}`;
  $('#email-draft').href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedRequest)}`;
  $('#request-ready').hidden = false;
  $('#copy-status').textContent = '';
  $('#request-ready').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});
$('#request-form').addEventListener('input', event => { $('#request-ready').hidden = true; if (event.target.name === 'name') event.target.setCustomValidity(''); });
$('#copy-request').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(preparedRequest); $('#copy-status').textContent = `Copied. Paste into an email to ${siteConfig.contactEmail}.`; }
  catch { $('#copy-status').textContent = 'Copy is unavailable in this browser. Please use the email draft button.'; }
});
$('#year').textContent = new Date().getFullYear();
window.addEventListener('hashchange', () => renderRoute());
renderRoute(false);
