import posthog from 'posthog-js';
import { cartTotal } from './src/checkout/cart.js';
let items = [];
const release = 'checkout-v2';
const $=id=>document.getElementById(id);
const log=text=>{$('log').textContent=`${new Date().toLocaleTimeString()}  ${text}\n`+$('log').textContent;};
$('token').value=sessionStorage.getItem('posthog-demo-token')||'';
$('connect').onclick=()=>{
 const token=$('token').value.trim();
 if(!token.startsWith('phc_')){$('status').textContent='Enter a public project token beginning with phc_.';return;}
 try{posthog.init(token,{api_host:'https://us.i.posthog.com',autocapture:false,capture_pageview:false,capture_pageleave:false,disable_session_recording:true,capture_exceptions:false,person_profiles:'never',persistence:'memory',request_batching:false,loaded:()=>{$('trigger').disabled=false;$('status').textContent='SDK initialized · ready for a test';log('SDK initialized. Ingestion will be verified in PostHog.');}});sessionStorage.setItem('posthog-demo-token',token);$('connect').disabled=true;$('token').disabled=true;}catch{$('status').textContent='Initialization failed. Check the token and network.';}
};
const updateCart = () => { $('cart-summary').textContent = items.length ? `${items.length} demo item(s) · $12 each` : 'Cart is empty.'; $('checkout-result').textContent = ''; };
$('add-item').onclick = () => { items.push({ price: 12, quantity: 1 }); updateCart(); };
$('empty-cart').onclick = () => { items = []; updateCart(); };
$('trigger').onclick = () => {
 try {
  const total = cartTotal(items);
  $('checkout-result').textContent = `Total: $${total.toFixed(2)}`;
  log(`Checkout calculated: $${total.toFixed(2)}`);
 } catch (error) {
  $('checkout-result').textContent = 'Checkout failed. Error submitted to PostHog.';
  posthog.captureException(error, { demo: true, environment: 'demo', release, source_file: 'src/checkout/cart.js', cart_item_count: items.length });
  log(`${error.name}: ${error.message} · ${release}\nCheck PostHog, then Capy run history.`);
 }
};
