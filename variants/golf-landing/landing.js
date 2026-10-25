import { cleanState, togglePriority, summary } from './state.mjs?v=3.2.0';

export function mountLanding({ getState, setState, checkout }) {
  const root = document.querySelector('[data-screen="golf-landing"]');
  const error = document.querySelector('#lp-error');
  function scrollToSection(id) {
    const target = document.getElementById(id);
    target?.querySelector('h2')?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-lp-scroll]');
    if (link) { event.preventDefault(); scrollToSection(link.dataset.lpScroll); }
  });
  function refresh() {
    const state = getState();
    root.querySelectorAll('[name="landingPriority"]').forEach(input => { input.checked = state.priorities.includes(input.value); });
    root.querySelectorAll('[name="landingLevel"]').forEach(input => { input.checked = state.training === input.value; });
    const current = summary(state);
    document.querySelector('#lp-summary-priorities').textContent = current.priorities || 'Choose your capabilities';
    document.querySelector('#lp-summary-level').textContent = current.training || 'Choose your level';
  }
  function update(next) { setState(cleanState({ ...next, goal: 'golf' })); error.textContent = ''; refresh(); }
  root.querySelectorAll('[name="landingPriority"]').forEach(input => input.addEventListener('change', () => update(togglePriority(getState(), input.value, input.checked))));
  root.querySelectorAll('[name="landingLevel"]').forEach(input => input.addEventListener('change', () => update({ ...getState(), training: input.value })));
  document.querySelector('#lp-form').addEventListener('submit', event => {
    event.preventDefault();
    const state = getState();
    if (!state.priorities.length) { error.textContent = 'Choose a capability, or select “Help me choose”.'; root.querySelector('[name="landingPriority"]').focus(); return; }
    if (!state.training) { error.textContent = 'Choose Independent or Pro to continue.'; root.querySelector('[name="landingLevel"]').focus(); return; }
    error.textContent = ''; checkout();
  });
  return { refresh, scrollToProgram: () => scrollToSection('lp-program') };
}
