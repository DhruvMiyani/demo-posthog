import posthog from 'posthog-js';
const $=id=>document.getElementById(id);
const log=text=>{$('log').textContent=`${new Date().toLocaleTimeString()}  ${text}\n`+$('log').textContent;};
$('token').value=sessionStorage.getItem('posthog-demo-token')||'';
$('connect').onclick=()=>{
 const token=$('token').value.trim();
 if(!token.startsWith('phc_')){$('status').textContent='Enter a public project token beginning with phc_.';return;}
 try{posthog.init(token,{api_host:'https://us.i.posthog.com',autocapture:false,capture_pageview:false,capture_pageleave:false,disable_session_recording:true,capture_exceptions:false,person_profiles:'never',persistence:'memory',request_batching:false,loaded:()=>{$('trigger').disabled=false;$('status').textContent='SDK initialized · ready for a test';log('SDK initialized. Ingestion will be verified in PostHog.');}});sessionStorage.setItem('posthog-demo-token',token);$('connect').disabled=true;$('token').disabled=true;}catch{$('status').textContent='Initialization failed. Check the token and network.';}
};
$('trigger').onclick=()=>{
 const id=Date.now().toString(36).toUpperCase();
 try{throw new Error(`SignalLabDemo_${id}: simulated checkout failure`);}catch(error){error.name=`SignalLabTest_${id}`;posthog.captureException(error,{demo:true,environment:'demo',demo_run_id:id});log(`Exception queued: ${error.message}\nCheck PostHog to confirm ingestion; then check Capy run history.`);$('trigger').disabled=true;setTimeout(()=>$('trigger').disabled=false,5000);}
};
