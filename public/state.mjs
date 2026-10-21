export const goals = { golf: 'Golf Performance', personal: 'Personal Life Advantage', sports: 'Sports Performance' };
export const priorities = { focus: 'Focus', calm: 'Calm', stress: 'Pressure / Stress', fatigue: 'Fatigue', reset: 'Reset & Recovery', help: "I'm not sure — help me choose" };
export const levels = { independent: 'Independent', pro: 'Pro' };
export function cleanState(input) {
  const value = input && typeof input === 'object' ? input : {};
  let selected = Array.isArray(value.priorities) ? [...new Set(value.priorities)].filter(key => Object.hasOwn(priorities, key)) : [];
  if (selected.includes('help')) selected = ['help'];
  return { goal: Object.hasOwn(goals, value.goal) ? value.goal : 'golf', priorities: selected, training: Object.hasOwn(levels, value.training) ? value.training : '' };
}
export function togglePriority(input, key, checked) {
  const state = cleanState(input);
  if (!Object.hasOwn(priorities, key)) return state;
  if (key === 'help' && checked) state.priorities = ['help'];
  else if (checked) state.priorities = [...new Set([...state.priorities.filter(item => item !== 'help'), key])];
  else state.priorities = state.priorities.filter(item => item !== key);
  return state;
}
export function summary(input) {
  const state = cleanState(input);
  return { goal: goals[state.goal], priorities: state.priorities.map(key => priorities[key]).join(', '), training: levels[state.training] || '' };
}
export function requestBody(fields, input) {
  const selected = summary(input);
  const interest = goals[fields.interest] || 'General Information';
  return [`Hello Thrive,`, '', 'I would like more information about Performance Mind Training.', '', `Name: ${fields.name.trim()}`, `Email: ${fields.email.trim()}`, `Phone: ${fields.phone.trim() || 'Not provided'}`, `Interested in: ${interest}`, `Training priorities: ${selected.priorities || 'To discuss'}`, `Training level: ${selected.training || 'To discuss'}`, `Referred by: ${fields.referral.trim() || 'Not provided'}`, '', fields.message.trim()].join('\n');
}
