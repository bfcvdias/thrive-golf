// A separate comparison build. Never writes to the approved public/ directory.
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(root, 'variants/golf-landing');
const output = resolve(root, 'artifacts/golf-landing-site');
await mkdir(output, { recursive: true });
await cp(resolve(root, 'public'), resolve(output, 'public'), { recursive: true });
const base = await readFile(resolve(root, 'public/index.html'), 'utf8');
function section(name) {
  const match = base.match(new RegExp('<section[^>]+data-screen="' + name + '"[\\s\\S]*?</section>'));
  assert(match, 'Missing approved section: ' + name); return match[0];
}
const icons = [
  ['focus', 'Focus', 'Give your attention to the shot in front of you.'],
  ['calm', 'Calm', 'Practice finding a more settled state.'],
  ['stress', 'Stress', 'Recognize how you respond to pressure.'],
  ['fatigue', 'Fatigue', 'Notice changes in your mental energy.'],
  ['reset', 'Reset & Recovery', 'Reset after a shot and prepare for the next.']
];
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
let html = await readFile(resolve(source, 'landing.html'), 'utf8');
html = html.replace('{{recognition}}', section('golf').match(/<ul class="check-list">[\s\S]*?<\/ul>/)[0]);
html = html.replace('{{learning}}', section('learn').match(/<ul class="check-list">[\s\S]*?<\/ul>/)[0]);
html = html.replace('{{capabilities}}', icons.map(([key,title,copy]) => `<div>${icon(key)}<h3>${title}</h3><p>${copy}</p></div>`).join(''));
html = html.replace('{{priorities}}', [...icons,['help','Help me choose','']].map(([key,title]) => `<label>${icon(key)}<input type="checkbox" name="landingPriority" value="${key}" aria-label="${title}"><span>${title}</span></label>`).join(''));
assert(!html.includes('{{'), 'Unfilled template');
const index = base.replace('<main id="main">','<main id="main">\n' + html)
  .replace('</head>','<link rel="stylesheet" href="landing.css?v=golf-1.0.0"></head>')
  .replace('src="script.js?v=3.2.0"','src="script.js?v=golf-landing-1.0.0"');
let script = await readFile(resolve(root,'public/script.js'),'utf8');
function replaceOnce(old, next) { assert(script.includes(old), 'Base integration changed: ' + old); script = script.replace(old, next); }
script = "import { mountLanding } from './landing.js?v=golf-1.0.0';\n" + script;
replaceOnce("'/': 'home',", "'/': 'golf-landing', '/golf/landing': 'golf-landing',");
replaceOnce("new Set(['home', 'sports', 'welcome'])", "new Set(['home', 'sports', 'welcome', 'golf-landing'])");
replaceOnce("const storageKey = 'thrive-program-v3';", "const storageKey = 'thrive-golf-landing-v1';");
replaceOnce("let lastScreen = 'home';", "state = cleanState({...state, goal: 'golf'});\nlet lastScreen = 'golf-landing';\nlet landing;");
replaceOnce("let route = location.hash.slice(1) || '/';", "let route = location.hash.slice(1) || '/';\n  let returnToProgram = ['/build/program', '/build/priorities', '/build/training'].includes(route);\n  if (returnToProgram) { route = '/'; history.replaceState(null, '', '#/'); }\n  if (route === '/' || route === '/golf/landing') {\n    if (state.goal !== 'golf') invalidateDemoPayment();\n    state = cleanState({...state, goal:'golf'}); saveState();\n  }");
// A fresh direct checkout URL with no choices must return to the inline builder too.
replaceOnce("const current = routeTable[route];", "if (['/build/program','/build/priorities','/build/training'].includes(route)) { route = '/'; returnToProgram = true; history.replaceState(null,'','#/'); }\n  const current = routeTable[route];");
replaceOnce("document.body.classList.toggle('builder-mode', builderScreens.has(current));", "document.body.classList.toggle('builder-mode', builderScreens.has(current));\n  document.body.classList.toggle('landing-mode', current === 'golf-landing');");
replaceOnce("$('.main-nav').hidden = builderScreens.has(current);", "$('.main-nav').hidden = builderScreens.has(current);\n  const aboutLink = $('.main-nav [data-nav=about]');\n  aboutLink.href = current === 'golf-landing' ? '#lp-benefits' : '#/about';\n  if (current === 'golf-landing') aboutLink.dataset.lpScroll = 'lp-benefits'; else delete aboutLink.dataset.lpScroll;");
replaceOnce("syncControls(); refreshSummary(); refreshCheckout();", "syncControls(); refreshSummary(); refreshCheckout(); landing?.refresh();");
replaceOnce("lastScreen = current;", "lastScreen = current;\n  if (returnToProgram) landing.scrollToProgram();");
replaceOnce("renderRoute(false);", "landing = mountLanding({ getState: () => state, setState: next => { state = next; invalidateDemoPayment(); saveState(); syncControls(); refreshSummary(); refreshCheckout(); }, checkout: () => { location.hash = '/store/account'; } });\nrenderRoute(false);");
await writeFile(resolve(output,'public/index.html'),index);
await writeFile(resolve(output,'public/script.js'),script);
const sharedCss = await readFile(resolve(root,'variants/personal-landing/landing.css'),'utf8');
await writeFile(resolve(output,'public/landing.css'),sharedCss + '\n' + await readFile(resolve(source,'golf.css'),'utf8'));
await cp(resolve(source,'landing.js'),resolve(output,'public/landing.js'));
const config = JSON.parse(await readFile(resolve(root,'firebase.json'),'utf8'));
await writeFile(resolve(output,'firebase.json'),JSON.stringify(config,null,2));
const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate IDs in comparison build');
assert(!html.includes('assets/reference/hero.webp'),'Rejected swing photo must not be used');
assert(!html.includes('assets/reference/recognition.webp'),'Rejected putter photo must not be used');
console.log('Golf landing comparison built at ' + output);
