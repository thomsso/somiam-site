import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import Stripe from 'stripe';
process.env.STRIPE_SECRET_KEY = 'sk_test_unit_only';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_unit_only';
process.env.INVITE_SECRET = 'unit_invite_only';
const { default: handler } = await import('../api/webhook.js');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
async function deliver(status, { code = 'abc123def456', throws = false, invalidSignature = false, inviteStatus = 409 } = {}) {
  const payload = JSON.stringify({ type: 'checkout.session.completed', created: 1792069200, data: { object: {
    id: 'cs_test_affiliate', created: 1792065600, mode: 'subscription', customer_details: { email: 'test@example.invalid' }, metadata: { affiliate_code: code, restaurant_name: 'Test' }
  } } });
  const req = Readable.from([Buffer.from(payload)]);
  req.method = 'POST';
  req.headers = { 'stripe-signature': invalidSignature ? 'bad' : stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET }) };
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    if (url.endsWith('invite-restaurateur')) return new Response('{}', {status:inviteStatus});
    if (throws) throw new Error('Network timeout');
    return new Response('{}', {status});
  };
  const res = { status(n) {this.code=n;return this;}, json(value) {this.body=value;return this;}, setHeader() {}, end() {} };
  try { await handler(req, res); } finally { globalThis.fetch = originalFetch; }
  return {res,calls};
}
test('attribution failure requests a Stripe retry', async () => { assert.equal((await deliver(500)).res.code,503); });
test('network timeout requests a retry', async () => { assert.equal((await deliver(200,{throws:true})).res.code,503); });
test('inactive partner is terminal without a commission', async () => { assert.equal((await deliver(404)).res.code,200); });
test('attribution starts at signed completion event, not earlier session creation', async () => {
 const {res,calls}=await deliver(200);assert.equal(res.code,200);assert.equal(calls[1].body.checkoutSessionId,'cs_test_affiliate');assert.equal(calls[1].body.occurredAt,new Date(1792069200000).toISOString());
});
test('invalid referral does not call attribution', async () => { assert.equal((await deliver(200,{code:'<script>'})).calls.length,1); });
test('invalid signature cannot register a prospect', async () => {const {res,calls}=await deliver(200,{invalidSignature:true});assert.equal(res.code,400);assert.equal(calls.length,0);});

test('invitation failure is retried before attribution', async () => {const {res,calls}=await deliver(200,{inviteStatus:500});assert.equal(res.code,503);assert.equal(calls.length,1);});
