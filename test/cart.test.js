import test from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal } from '../src/checkout/cart.js';

test('totals product prices and quantities', () => {
  assert.equal(cartTotal([{ price: 12, quantity: 2 }, { price: 6, quantity: 1 }]), 30);
});

test('an empty cart totals zero', () => {
  assert.equal(cartTotal([]), 0);
});

test('a free product remains zero', () => {
  assert.equal(cartTotal([{ price: 0, quantity: 1 }]), 0);
});
