// Isolated comparison build. The approved public/ website is never edited.
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(root, 'variants/personal-landing');
const output = resolve(root, 'artifacts/personal-landing-site');
await mkdir(output, { recursive: true });
await cp(resolve(root, 'public'), resolve(output, 'public'), { recursive: true });
const base = await readFile(resolve(root, 'public/index.html'), 'utf8');
const section = name => {
  const match = base.match(new RegExp('<section[^>]+data-screen="' + name + '"[\\s\\S]*?</section>'));
  assert(match, 'Missing approved section: ' + name); return match[0];
};
const icons = [
  ['focus', 'Focus', 'Give your full attention to what matters.'],
  ['calm', 'Calm', 'Find a more settled state.'],
  ['stress', 'Stress', 'Meet pressure with greater awareness.'],
  ['fatigue', 'Fatigue', 'Recognize when your energy shifts.'],
  ['reset', 'Reset & Recovery', 'Make space to reset and recover.']
];
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
let html = await readFile(resolve(source, 'landing.html'), 'utf8');
html = html.replace('{{recognition}}', section('personal-recognition').match(/<ul class="check-list">[\s\S]*?<\/ul>/)[0]);
html = html.replace('{{capabilities}}', icons.map(([key, title, copy]) => `<div>${icon(key)}<h3>${title}</h3><p>${copy}</p></div>`).join(''));
const audiences = [['professionals','Professionals &amp; Executives'],['travelers','Frequent Travelers'],['students','Students'],['everyday','Everyday Life']];
html = html.replace('{{audiences}}', audiences.map(([key, title]) => {
  const content = section('personal-' + key);
  const photo = content.match(/<img[^>]+>/)[0].replace('class="scene"', '');
  const description = content.match(/<h1[\s\S]*?<\/h1>(<p>[\s\S]*?<\/p>)/)[1];
  const benefits = content.match(/<ul class="check-list">[\s\S]*?<\/ul>/)[0];
  return `<article class="lp-audience" data-path="${key}">${photo}<div class="lp-audience-copy"><h3>${title}</h3>${description}<details><summary>Explore the benefits</summary>${benefits}</details><button type="button" data-lp-path="${key}">Choose ${title} <span aria-hidden="true">↗</span></button></div></article>`;
}).join(''));
html = html.replace('{{priorities}}', [...icons, ['help', 'Help me choose', '']].map(([key,title]) => `<label>${icon(key)}<input type="checkbox" name="landingPriority" value="${key}" aria-label="${title}"><span>${title}</span></label>`).join(''));
assert(!html.includes('{{'), 'Unfilled template');
let index = base.replace('<main id="main">', '<main id="main">\n' + html).replace('</head>', '<link rel="stylesheet" href="landing.css?v=1.0.0"></head>')
  .replace('href="assets/reference/hero-video-finish.webp" as="image"', 'href="assets/reference/life.webp" as="image"')
  .replace('src="script.js?v=3.2.0"', 'src="script.js?v=landing-1.0.0"');
let script = await readFile(resolve(root, 'public/script.js'), 'utf8');
function replaceOnce(old, next) { assert(script.includes(old), 'Base integration changed: ' + old); script = script.replace(old, next); }
script = "import { mountLanding } from './landing.js?v=1.0.0';\n" + script;
replaceOnce("'/': 'home',", "'/': 'personal-landing', '/personal/landing': 'personal-landing',");
replaceOnce("new Set(['home', 'sports', 'welcome'])", "new Set(['home', 'sports', 'welcome', 'personal-landing'])");
replaceOnce("const storageKey = 'thrive-program-v3';", "const storageKey = 'thrive-personal-landing-v1';");
replaceOnce("let lastScreen = 'home';", "state = cleanState({...state, goal: 'personal'});\nlet lastScreen = 'personal-landing';\nlet landing;");
replaceOnce("let route = location.hash.slice(1) || '/';", "let route = location.hash.slice(1) || '/';\n  const returnToProgram = ['/build/program', '/build/priorities', '/build/training'].includes(route);\n  if (returnToProgram) { route = '/'; history.replaceState(null, '', '#/'); }\n  if (route === '/' || route === '/personal/landing') selectPersonalPath(state.path);");
replaceOnce("document.body.classList.toggle('builder-mode', builderScreens.has(current));", "document.body.classList.toggle('builder-mode', builderScreens.has(current));\n  document.body.classList.toggle('landing-mode', current === 'personal-landing');");
replaceOnce("$('.main-nav').hidden = builderScreens.has(current);", "$('.main-nav').hidden = builderScreens.has(current);\n  const aboutLink = $('.main-nav [data-nav=about]');\n  aboutLink.href = current === 'personal-landing' ? '#lp-benefits' : '#/about';\n  if (current === 'personal-landing') aboutLink.dataset.lpScroll = 'lp-benefits'; else delete aboutLink.dataset.lpScroll;");
replaceOnce("syncControls(); refreshSummary(); refreshCheckout();", "syncControls(); refreshSummary(); refreshCheckout(); landing?.refresh();");
replaceOnce("lastScreen = current;", "lastScreen = current;\n  if (returnToProgram) landing.scrollToProgram();");
replaceOnce("renderRoute(false);", "landing = mountLanding({ getState: () => state, setState: next => { state = next; invalidateDemoPayment(); saveState(); syncControls(); refreshSummary(); refreshCheckout(); }, checkout: () => { location.hash = '/store/account'; } });\nrenderRoute(false);");
await writeFile(resolve(output, 'public/index.html'), index);
await writeFile(resolve(output, 'public/script.js'), script);
for (const name of ['landing.css','landing.js']) await cp(resolve(source, name), resolve(output,'public',name));
const config = JSON.parse(await readFile(resolve(root,'firebase.json'),'utf8'));
await writeFile(resolve(output, 'firebase.json'), JSON.stringify(config,null,2));
const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate IDs in comparison build');
console.log('Personal Life landing comparison built at ' + output);
