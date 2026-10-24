import { cleanState, togglePriority, summary } from './state.mjs?v=3.2.0';

export function mountLanding({ getState, setState, checkout }) {
  const root = document.querySelector('[data-screen="personal-landing"]');
  const form = document.querySelector('#lp-form');
  const error = document.querySelector('#lp-error');
  const path = document.querySelector('#lp-path');
  function scrollToSection(id) {
    const target = document.getElementById(id);
    const heading = target?.querySelector('h2');
    heading?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-lp-scroll]');
    if (link) { event.preventDefault(); scrollToSection(link.dataset.lpScroll); }
  });
  function refresh() {
    const state = getState();
    path.value = state.path;
    root.querySelectorAll('[name="landingPriority"]').forEach(input => { input.checked = state.priorities.includes(input.value); });
    root.querySelectorAll('[name="landingLevel"]').forEach(input => { input.checked = state.training === input.value; });
    const current = summary(state);
    document.querySelector('#lp-summary-path').textContent = current.path || 'Choose your path';
    document.querySelector('#lp-summary-priorities').textContent = current.priorities || 'Choose your capabilities';
    document.querySelector('#lp-summary-level').textContent = current.training || 'Choose your level';
  }
  function update(next) { setState(cleanState({ ...next, goal: 'personal' })); error.textContent = ''; refresh(); }
  path.addEventListener('change', () => update({ ...getState(), path: path.value }));
  root.querySelectorAll('[name="landingPriority"]').forEach(input => input.addEventListener('change', () => update(togglePriority(getState(), input.value, input.checked))));
  root.querySelectorAll('[name="landingLevel"]').forEach(input => input.addEventListener('change', () => update({ ...getState(), training: input.value })));
  root.querySelectorAll('[data-lp-path]').forEach(button => button.addEventListener('click', () => {
    update({ ...getState(), path: button.dataset.lpPath }); scrollToSection('lp-program');
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const state = getState();
    if (!state.path) { error.textContent = 'Choose your path to continue.'; path.focus(); return; }
    if (!state.priorities.length) { error.textContent = 'Choose a capability, or select “Help me choose”.'; root.querySelector('[name="landingPriority"]').focus(); return; }
    if (!state.training) { error.textContent = 'Choose Independent or Pro to continue.'; root.querySelector('[name="landingLevel"]').focus(); return; }
    error.textContent = ''; checkout();
  });
  return { refresh, scrollToProgram: () => scrollToSection('lp-program') };
}
