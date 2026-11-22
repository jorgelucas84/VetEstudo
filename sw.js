const CACHE='vetestudo-03df21a83c';
const FILES=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "bank/anat-estrutural.json", "bank/anat-sistemica.json", "bank/anatpat.json", "bank/anestesio.json", "bank/aves-suinos.json", "bank/bioquimica.json", "bank/cir-comp.json", "bank/cir-prod.json", "bank/citogen.json", "bank/clin-eq-rum.json", "bank/clin-peq.json", "bank/clin-repro.json", "bank/deontologia.json", "bank/dip.json", "bank/ecozoo.json", "bank/farmaco.json", "bank/fisiologia.json", "bank/gestao.json", "bank/histologia.json", "bank/imagem.json", "bank/inspecao.json", "bank/medprev.json", "bank/microbiologia.json", "bank/neuro.json", "bank/nutricao.json", "bank/parasitologia.json", "bank/patclin.json", "bank/prod1.json", "bank/prod2.json", "bank/qualidade.json", "bank/saude-col.json", "bank/semiologia.json", "bank/silvestres.json", "bank/tpoa-carnes.json", "bank/tpoa-ovos.json"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))}
  else if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.open(CACHE+'-fonts').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}))))}
});