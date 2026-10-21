import assert from 'node:assert/strict';
import { emptyDemo, createDemoAccount, simulatePayment, resolveCheckoutRoute, programKey } from '../public/checkout.mjs';

const program = { goal: 'golf', priorities: ['focus', 'calm'], training: 'pro' };
const fields = { firstName: ' Alex ', lastName: 'Morgan', email: 'alex@example.com', demoConsent: 'on', password: 'never-store-this', phone: 'not-needed' };
const account = createDemoAccount(fields);
assert.deepEqual(account, { firstName: 'Alex', lastName: 'Morgan', email: 'alex@example.com' });
assert.equal(createDemoAccount({ ...fields, firstName: '  ' }), null);
assert.equal(createDemoAccount({ ...fields, email: 'invalid' }), null);
assert.equal(createDemoAccount({ ...fields, demoConsent: '' }), null);

let demo = emptyDemo();
assert.equal(resolveCheckoutRoute('/store/payment', program, demo), '/store/account');
assert.equal(resolveCheckoutRoute('/store/welcome', program, demo), '/store/account');
assert.equal(resolveCheckoutRoute('/store/account', { ...program, priorities: [] }, demo), '/build/priorities');
assert.equal(resolveCheckoutRoute('/store/account', { ...program, training: '' }, demo), '/build/training');
assert.equal(resolveCheckoutRoute('/store/account', { ...program, goal: 'personal' }, demo), '/build/program');
assert.deepEqual(simulatePayment(demo, program, 'succeeded'), demo, 'Cannot skip demo account');
demo = { ...demo, account };
assert.equal(resolveCheckoutRoute('/store/welcome', program, demo), '/store/payment');
for (const outcome of ['declined', 'cancelled']) {
  demo = simulatePayment(demo, program, outcome);
  assert.equal(demo.payment, outcome);
  assert.equal(demo.paidProgram, null);
  assert.equal(resolveCheckoutRoute('/store/welcome', program, demo), '/store/payment');
}
demo = simulatePayment(demo, program, 'succeeded');
assert.equal(resolveCheckoutRoute('/store/welcome', program, demo), '/store/welcome');
assert.deepEqual(simulatePayment(demo, program, 'succeeded'), demo, 'Repeated simulation has no extra effect');
assert.equal(resolveCheckoutRoute('/store/welcome', { ...program, training: 'independent' }, demo), '/store/payment', 'Changed program cannot reuse completion');
assert.equal(resolveCheckoutRoute('/store/welcome', program, emptyDemo()), '/store/account', 'Refresh resets demonstration');
assert.equal(programKey(program), programKey({ ...program, priorities: ['calm', 'focus'] }));
assert.deepEqual(simulatePayment(demo, program, 'paid=true'), demo, 'Unknown status is ignored');
assert.deepEqual(simulatePayment(demo, { ...program, goal: 'personal' }, 'succeeded'), demo);
console.log('PASS: account validation; no password retention; checkout guards; decline/cancel/retry; success gate; program change invalidation; refresh reset.');
