import assert from 'node:assert/strict';
import { emptyDemo, createDemoAccount, simulatePayment, resolveCheckoutRoute, programKey } from '../public/checkout.mjs';
import { cleanState, summary, personalPaths, requestBody } from '../public/state.mjs';
import { programOffer, personalPhotos } from '../public/programs.mjs';
import { stat } from 'node:fs/promises';

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
assert.equal(resolveCheckoutRoute('/store/account', { ...program, goal: 'personal' }, demo), '/personal/paths');
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
assert.deepEqual(simulatePayment(demo, { ...program, goal: 'sports' }, 'succeeded'), demo);
const offers = new Set([programOffer(program).key]);
for (const [path, label] of Object.entries(personalPaths)) {
  for (const training of ['independent','pro']) {
    const personal = cleanState({ ...program, goal:'personal', path, training });
    assert.equal(cleanState(JSON.parse(JSON.stringify(personal))).path, path, 'Saved selections retain path');
    assert.equal(summary(personal).path, label);
    const offer = programOffer(personal);
    assert(!offers.has(offer.key), 'Each path and level has a distinct offer');
    offers.add(offer.key);
    assert.equal(offer.stripePriceId, null, 'No invented live Stripe price');
    assert.equal(offer.name, 'Personal Life Advantage');
    assert.equal(resolveCheckoutRoute('/store/payment', personal, emptyDemo()), '/store/account');
    assert.equal(resolveCheckoutRoute('/store/welcome', personal, demo), '/store/payment', 'Golf completion cannot unlock Personal Life');
    const paid = simulatePayment({...emptyDemo(),account}, personal, 'succeeded');
    assert.equal(resolveCheckoutRoute('/store/welcome', personal, paid), '/store/welcome');
    const otherPath = path === 'students' ? 'everyday' : 'students';
    assert.equal(resolveCheckoutRoute('/store/welcome', {...personal,path:otherPath}, paid), '/store/payment');
    assert.equal(resolveCheckoutRoute('/store/welcome', {...personal,priorities:['reset']}, paid), '/store/payment');
    assert.equal(resolveCheckoutRoute('/store/welcome', program, paid), '/store/payment', 'Personal completion cannot unlock Golf');
    for (const outcome of ['declined','cancelled']) {
      const failed = simulatePayment({...emptyDemo(),account}, personal, outcome);
      assert.equal(resolveCheckoutRoute('/store/welcome', personal, failed), '/store/payment');
      assert.equal(resolveCheckoutRoute('/store/welcome', personal, simulatePayment(failed, personal, 'succeeded')), '/store/welcome');
    }
  }
  await stat('public/' + personalPhotos[path].src);
}
assert.equal(cleanState({goal:'personal',path:'<script>'}).path, '');
assert.equal(programOffer({...program,goal:'personal',path:'unknown'}), null);
assert.equal(programOffer({...program,goal:'sports'}), null);
const personalRequest = requestBody({name:'A',email:'a@example.com',phone:'',interest:'personal',referral:'',message:''},{...program,goal:'personal',path:'travelers'});
assert(personalRequest.includes('Personal Life path: Frequent Traveler'));
console.log('PASS: Golf and all four Personal paths at both levels; distinct offers; account validation; no password retention; checkout guards; decline/cancel/retry; success gate; path/goal/priority changes invalidate completion; refresh reset.');
