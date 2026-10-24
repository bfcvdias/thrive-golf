import { cleanState, goals, levels, personalPaths } from './state.mjs?v=3.2.0';

// Concept catalog keys only. These are not Stripe Product or Price IDs.
// Real prices must be resolved on a trusted server before enabling payments.
export function programOffer(input) {
  const state = cleanState(input);
  if (!state.training || !['golf', 'personal'].includes(state.goal)) return null;
  if (state.goal === 'personal' && !state.path) return null;
  return {
    key: ['thrive', state.goal, state.path, state.training].filter(Boolean).join('-'),
    name: goals[state.goal],
    path: personalPaths[state.path] || '',
    level: levels[state.training],
    stripePriceId: null,
    priceLabel: 'To be confirmed'
  };
}

export const personalPhotos = {
  professionals: { src: 'assets/personal/professionals.webp', position: '17% center', alt: 'Professional looking over the city from an office' },
  travelers: { src: 'assets/personal/travelers.webp', position: '23% center', alt: 'Traveler working quietly at an airport' },
  students: { src: 'assets/personal/students.webp', position: '80% center', alt: 'Student concentrating on his studies' },
  everyday: { src: 'assets/personal/everyday.webp', position: '80% center', alt: 'A quiet moment outdoors with a dog' }
};
