import { cleanState } from './state.mjs?v=3.1.1';

// This module is a local demonstration, never an authentication/payment authority.
// No customer details or payment status are persisted or transmitted.
export const emptyDemo = () => ({ account: null, payment: 'idle', paidProgram: null });
export function programKey(input) {
  const state = cleanState(input);
  return JSON.stringify([state.goal, [...state.priorities].sort(), state.training]);
}
export function createDemoAccount(fields) {
  const firstName = String(fields.firstName || '').trim().slice(0, 60);
  const lastName = String(fields.lastName || '').trim().slice(0, 60);
  const email = String(fields.email || '').trim().slice(0, 254);
  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !fields.demoConsent) return null;
  // Passwords are intentionally absent from this model.
  return { firstName, lastName, email };
}
export function simulatePayment(demo, input, outcome) {
  const state = cleanState(input);
  if (!demo.account || state.goal !== 'golf' || !state.priorities.length || !state.training) return demo;
  if (!['succeeded', 'declined', 'cancelled'].includes(outcome)) return demo;
  return { ...demo, payment: outcome, paidProgram: outcome === 'succeeded' ? programKey(state) : null };
}
export function resolveCheckoutRoute(route, input, demo) {
  if (!['/store/account', '/store/payment', '/store/welcome'].includes(route)) return route;
  const state = cleanState(input);
  if (!state.priorities.length) return '/build/priorities';
  if (!state.training) return '/build/training';
  if (state.goal !== 'golf') return '/build/program';
  if (route !== '/store/account' && !demo.account) return '/store/account';
  if (route === '/store/welcome' && (demo.payment !== 'succeeded' || demo.paidProgram !== programKey(state))) return '/store/payment';
  return route;
}
