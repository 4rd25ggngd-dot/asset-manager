const C='asset-manager-stable-v6';
const STATIC=['./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(STATIC)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(a=>Promise.all(a.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
if(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html'))e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));
else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
