import { programOffer, personalPhotos } from './programs.mjs?v=3.2.0';
import { cleanState, togglePriority, summary, requestBody, priorities } from './state.mjs?v=3.2.0';
import { emptyDemo, createDemoAccount, simulatePayment, resolveCheckoutRoute } from './checkout.mjs?v=3.2.0';
import { siteConfig } from './config.js?v=3.2.0';
const routeTable = { '/': 'home', '/about': 'about', '/sports': 'sports', '/personal': 'personal', '/personal/recognition': 'personal-recognition', '/personal/advantage': 'personal-advantage', '/personal/paths': 'personal-paths', '/personal/professionals': 'personal-professionals', '/personal/travelers': 'personal-travelers', '/personal/students': 'personal-students', '/personal/everyday': 'personal-everyday', '/golf': 'golf', '/golf/advantage': 'advantage', '/golf/learn': 'learn', '/golf/how': 'how', '/build/priorities': 'priorities', '/build/training': 'training', '/build/program': 'program', '/request': 'request', '/store/account': 'account', '/store/payment': 'payment', '/store/welcome': 'welcome', '/demo/checkout': 'account' };
const previousRoute = { priorities: '/', training: '/build/priorities', program: '/build/training', request: '/', account: '/build/program', payment: '/store/account' };
const darkHeaders = new Set(['home', 'sports', 'welcome']);
const builderScreens = new Set(['priorities', 'training', 'program', 'request', 'account', 'payment']);
const storageKey = 'thrive-program-v3';
let state;
try { state = cleanState(JSON.parse(sessionStorage.getItem(storageKey))); } catch { state = cleanState(); }
let lastScreen = 'home';
let requestOrigin = state.training && state.priorities.length ? '/build/program' : '/';
let preparedRequest = '';
let demo = emptyDemo();
const $ = selector => document.querySelector(selector);
function saveState() { try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Selections still work in this tab if storage is unavailable. */ } }
function syncControls() {
  document.querySelectorAll('input[name="priority"]').forEach(input => { input.checked = state.priorities.includes(input.value); });
  document.querySelectorAll('input[name="training"]').forEach(input => { input.checked = state.training === input.value; });
}
function refreshSummary() {
  const current = summary(state);
  const personal = state.goal === 'personal';
  $('#summary-goal-label').textContent = personal ? 'Your Path:' : 'Your Goal:';
  $('#summary-goal').textContent = personal ? current.path : current.goal;
  $('#change-personal-path').hidden = !personal;
  document.querySelectorAll('[data-program-context]').forEach(node => { node.hidden = !personal; node.textContent = current.goal + ' · ' + current.path; });
  $('#summary-priorities').textContent = current.priorities || 'To discuss';
  $('#summary-training').textContent = current.training || 'To discuss';
  $('#program-action').href = programOffer(state) ? '#/store/account' : '#/request';
  $('#program-action-label').textContent = state.goal === 'golf' ? 'START YOUR UNFAIR ADVANTAGE' : personal ? 'START YOUR PERSONAL LIFE ADVANTAGE' : 'REQUEST INFORMATION';
  const photo = selectedPhoto();
  setPhoto($('#program-photo'), photo);
  setPhoto($('#independent-photo'), personal ? {src:'assets/personal/independent.webp',position:'center',alt:'Independent practice with a laptop at home'} : {src:'assets/concept/sunset.webp',position:'center',alt:'Golfer practicing independently on a course'});
  setPhoto($('#coaching-photo'), personal ? {src:'assets/personal/coaching.webp',position:'center',alt:'Personal performance coaching conversation'} : {src:'assets/concept/coach.webp',position:'center',alt:'Golfer working with a coach'});
  $('#request-selection').textContent = state.priorities.length ? `Your selection: ${current.priorities}${current.training ? ` · ${current.training}` : ''}` : '';
}
function setPhoto(node, photo) {
  node.src = photo.src; node.alt = photo.alt; node.style.objectPosition = photo.position;
}
function selectedPhoto() {
  if (state.goal === 'personal') return personalPhotos[state.path] || {src:'assets/personal/advantage.webp',position:'80% center',alt:'Woman looking across a peaceful lake'};
  return {src:state.goal === 'sports' ? 'assets/reference/sports.webp' : 'assets/reference/hero-video-finish.webp',position:'76% center',alt:state.goal === 'sports' ? 'Sprinter on a track' : 'Golfer completing a swing at sunset'};
}
function selectPersonalPath(path) {
  const next = cleanState({...state,goal:'personal',path});
  if (state.goal !== next.goal || state.path !== next.path) invalidateDemoPayment();
  state = next; saveState();
}
function renderRoute(focus = true) {
  let route = location.hash.slice(1) || '/';
  if (route === '/demo/checkout') {
    state = cleanState({ goal: 'golf', priorities: ['focus', 'calm', 'reset'], training: 'pro' });
    saveState(); resetDemo(); route = '/store/account';
    history.replaceState(null, '', '#' + route);
  }
  if (!Object.hasOwn(routeTable, route)) { history.replaceState(null, '', '#/'); route = '/'; }
  if (route === '/personal' || route.startsWith('/personal/')) {
    const path = route.split('/')[2];
    selectPersonalPath(Object.hasOwn(personalPhotos, path) ? path : state.path);
  }
  if (route.startsWith('/build/') && state.goal === 'personal' && !state.path) {
    route = '/personal/paths'; history.replaceState(null, '', '#' + route);
  }
  if (route === '/build/training' && !state.priorities.length) { history.replaceState(null, '', '#/build/priorities'); route = '/build/priorities'; }
  if (route === '/build/program' && (!state.priorities.length || !state.training)) { route = !state.priorities.length ? '/build/priorities' : '/build/training'; history.replaceState(null, '', `#${route}`); }
  const guardedRoute = resolveCheckoutRoute(route, state, demo);
  if (guardedRoute !== route) { route = guardedRoute; history.replaceState(null, '', '#' + route); }
  if ($('#preview-dialog').open) $('#preview-dialog').close();
  const current = routeTable[route];
  if (current === 'request' && lastScreen !== 'request') requestOrigin = lastScreen === 'program' ? '/build/program' : Object.keys(routeTable).find(key => routeTable[key] === lastScreen) || '/';
  document.querySelectorAll('[data-screen]').forEach(section => { section.hidden = section.dataset.screen !== current; });
  $('#site-header').classList.toggle('light-header', darkHeaders.has(current));
  document.body.classList.toggle('builder-mode', builderScreens.has(current));
  document.body.classList.toggle('personal-program', state.goal === 'personal');
  $('.main-nav').hidden = builderScreens.has(current);
  $('#back-link').hidden = !builderScreens.has(current);
  $('#back-link').href = '#' + (current === 'request' ? requestOrigin : current === 'priorities' && state.goal === 'personal' ? '/personal/' + (state.path || 'paths') : previousRoute[current] || '/');
  document.querySelectorAll('[data-nav]').forEach(link => { if (link.dataset.nav === current) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  syncControls(); refreshSummary(); refreshCheckout();
  if (current === 'request' && lastScreen !== 'request') { $('#request-form').elements.interest.value = state.goal; $('#request-ready').hidden = true; }
  const heading = document.querySelector(`[data-screen="${current}"] h1`);
  document.title = `${heading.innerText.replace(/\s+/g, ' ').trim()} | Thrive`;
  if (focus) heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
  lastScreen = current;
}
$('.skip-link').addEventListener('click', event => { event.preventDefault(); document.querySelector('[data-screen]:not([hidden]) h1').focus(); });
document.querySelectorAll('[data-goal]').forEach(link => link.addEventListener('click', () => { if (state.goal !== link.dataset.goal) invalidateDemoPayment(); state = cleanState({...state,goal:link.dataset.goal}); saveState(); }));
document.querySelectorAll('[data-personal-path]').forEach(link => link.addEventListener('click', () => selectPersonalPath(link.dataset.personalPath)));

document.querySelectorAll('input[name="priority"]').forEach(input => input.addEventListener('change', () => { state = togglePriority(state, input.value, input.checked); invalidateDemoPayment(); saveState(); syncControls(); $('#priority-error').textContent = ''; }));
$('#priorities-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!state.priorities.length) { $('#priority-error').textContent = 'Choose at least one area, or select “I’m not sure”.'; $('input[name="priority"]').focus(); return; }
  location.hash = '/build/training';
});
document.querySelectorAll('input[name="training"]').forEach(input => input.addEventListener('change', () => { state.training = input.value; invalidateDemoPayment(); saveState(); $('#training-error').textContent = ''; }));
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
function invalidateDemoPayment() {
  demo = { ...demo, payment: 'idle', paidProgram: null };
}
function resetDemo() {
  demo = emptyDemo();
  $('#account-form').reset();
  $('#account-error').textContent = '';
  $('#demo-password').type = 'password';
  $('#toggle-password').setAttribute('aria-pressed', 'false');
  $('#toggle-password').setAttribute('aria-label', 'Show demo password');
}
function refreshCheckout() {
  const current = summary(state);
  const offer = programOffer(state);
  const personal = state.goal === 'personal';
  setPhoto($('#checkout-photo'), selectedPhoto());
  setPhoto($('#welcome-photo'), personal ? {src:'assets/personal/advantage.webp',position:'80% center',alt:'Woman looking over a lake at sunset'} : {src:'assets/reference/hero-video-finish.webp',position:'',alt:'Golfer following through at sunset'});
  $('#checkout-path').hidden = !personal;
  $('#checkout-path').textContent = 'Path: ' + current.path;
  $('#program-price').textContent = offer?.priceLabel || 'To be confirmed';
  $('#payment-program-note').textContent = personal ? 'Your Personal Life Advantage program — ' + current.path + ' · ' + current.training + ' — will have its own Stripe checkout when payments are connected.' : 'Your program will use Stripe for secure payment when checkout is connected.';
  $('#welcome-program-message').textContent = personal ? 'Your Personal Life Advantage starts here.' : 'You’re on your way to building your Unfair Advantage.';
  $('#welcome-program-context').textContent = [current.path || current.goal, current.training, current.priorities].filter(Boolean).join(' · ');
  document.querySelectorAll('[data-checkout-goal]').forEach(node => { node.textContent = current.goal; });
  document.querySelectorAll('[data-checkout-level]').forEach(node => { node.textContent = current.training; });
  const capabilities = $('#checkout-capabilities');
  capabilities.replaceChildren();
  state.priorities.forEach(key => {
    const item = document.createElement('div');
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-' + key);
    icon.append(use);
    const label = document.createElement('b');
    label.textContent = priorities[key];
    item.append(icon, label); capabilities.append(item);
  });
  $('#checkout-email').textContent = demo.account?.email || '';
  const statuses = {
    declined: 'Demo payment declined. No charge was made. Try the successful-payment simulation to continue.',
    cancelled: 'Demo checkout cancelled. No charge was made. Your program is still here when you are ready.'
  };
  $('#payment-status').textContent = statuses[demo.payment] || '';
}
$('#fill-demo').addEventListener('click', () => {
  const form = $('#account-form');
  form.elements.firstName.value = 'Alex';
  form.elements.lastName.value = 'Morgan';
  form.elements.email.value = 'alex.morgan@example.com';
  form.elements.phone.value = '+1 202 555 0147';
  $('#account-error').textContent = '';
  form.elements.demoConsent.focus();
});
$('#toggle-password').addEventListener('click', () => {
  const show = $('#demo-password').type === 'password';
  $('#demo-password').type = show ? 'text' : 'password';
  $('#toggle-password').setAttribute('aria-pressed', String(show));
  $('#toggle-password').setAttribute('aria-label', show ? 'Hide demo password' : 'Show demo password');
});
$('#account-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const account = createDemoAccount(Object.fromEntries(new FormData(form)));
  if (!account) { $('#account-error').textContent = 'Enter a first name, last name, and valid email, and confirm the demo notice.'; return; }
  demo = { ...emptyDemo(), account };
  $('#account-error').textContent = '';
  location.hash = '/store/payment';
});
$('#account-form').addEventListener('input', () => { $('#account-error').textContent = ''; });
function runPaymentSimulation(outcome) {
  demo = simulatePayment(demo, state, outcome);
  refreshCheckout();
  if (demo.payment === 'succeeded') location.hash = '/store/welcome';
}
$('#simulate-success').addEventListener('click', () => runPaymentSimulation('succeeded'));
$('#simulate-decline').addEventListener('click', () => runPaymentSimulation('declined'));
$('#simulate-cancel').addEventListener('click', () => runPaymentSimulation('cancelled'));
$('#restart-demo').addEventListener('click', () => { resetDemo(); location.hash = '/store/account'; });

const previewCopy = {
  dashboard: {
    title: 'Your training dashboard',
    text: 'Your welcome email will explain how to sign in to your Thrive account and open your personalized training dashboard.',
    detail: 'Dashboard access and account sign-in will be developed later. This button is a preview only.'
  },
  booking: {
    title: 'Book your first session',
    text: 'This is where you will choose an available time for your first session with a Thrive coach.',
    detail: 'The booking service and calendar connection will be chosen later. No session is booked in this preview.'
  },
  training: {
    title: 'Start your training',
    text: 'This is where your first guided practice will begin, using the capabilities and level you selected.',
    detail: 'Training content and progress tracking will be developed later. Your selection: '
  },
  signin: {
    title: 'Sign in to Thrive',
    text: 'Existing clients will be able to sign in and return to their training program here.',
    detail: 'Real sign-in is not connected. Use “Fill demo details” to explore the account and payment journey.'
  },
  terms: {
    title: 'Terms of Service preview',
    text: 'This demonstration does not create an account, purchase a program, or enter you into a service agreement.',
    detail: 'Final service terms, pricing, cancellation conditions, and eligibility requirements will be provided before real registration opens.'
  },
  privacy: {
    title: 'Privacy notice preview',
    text: 'This demo uses the sample details only within this open page. It sends no registration, payment, subscription, or email request. The supplied password is a display sample.',
    detail: 'Only your program choices are kept in this tab’s session storage. Refreshing resets the demo account and payment. Final privacy and consent wording will be provided before registration opens.'
  }
};
function paragraph(parent, content, className = '') {
  const p = document.createElement('p'); p.textContent = content;
  if (className) p.className = className;
  parent.append(p); return p;
}
function showPreview(kind) {
  const body = $('#preview-dialog-body');
  body.replaceChildren();
  $('#preview-dialog-kicker').textContent = kind === 'email' ? 'EMAIL PREVIEW · NOT SENT' : ['terms', 'privacy'].includes(kind) ? 'DEMONSTRATION NOTICE' : 'COMING LATER';
  if (kind === 'email') {
    $('#preview-dialog-title').textContent = 'Welcome to Thrive';
    paragraph(body, 'To: ' + (demo.account?.email || 'your@email.com'), 'email-meta');
    paragraph(body, 'Hi ' + (demo.account?.firstName || 'there') + ', your ' + (state.goal === 'personal' ? 'Personal Life Advantage' : 'Unfair Advantage') + ' journey starts here.');
    paragraph(body, 'Your program: ' + summary(state).goal + (summary(state).path ? ' · ' + summary(state).path : '') + ' · ' + summary(state).training + '. Your selected capabilities: ' + summary(state).priorities + '.');
    const steps = document.createElement('ol');
    [
      ['Access your training dashboard', 'Sign in with the email you used to create your Thrive account. Your access link and sign-in instructions will be included here.'],
      ['Book your first session', 'Follow the booking link to choose an available session with your coach.'],
      ['Start training', 'Open your program and begin your first guided practice.']
    ].forEach(([title, text]) => {
      const item = document.createElement('li'); const strong = document.createElement('strong');
      strong.textContent = title; item.append(strong, document.createTextNode(text)); steps.append(item);
    });
    body.append(steps);
    paragraph(body, 'Preview only. No email has been sent. Access links, scheduling, and training will be connected later.', 'preview-detail');
  } else {
    const copy = previewCopy[kind];
    if (!copy) return;
    $('#preview-dialog-title').textContent = copy.title;
    paragraph(body, copy.text);
    paragraph(body, copy.detail + (kind === 'training' ? summary(state).priorities + '.' : ''), 'preview-detail');
  }
  $('#preview-dialog').showModal();
}
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => showPreview(button.dataset.preview)));
$('#close-preview').addEventListener('click', () => $('#preview-dialog').close());
$('#done-preview').addEventListener('click', () => $('#preview-dialog').close());

$('#year').textContent = new Date().getFullYear();
window.addEventListener('hashchange', () => renderRoute());
renderRoute(false);
