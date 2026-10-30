// Network-first service worker: online visits get the latest files (revalidated with ETags),
// the cache is only an offline fallback. Photos are cache-first: they never change at a given name.
// Other apps share this address (stanleywoosweeleong.github.io) and its Cache Storage,
// so this worker only touches caches whose names start with 'croppest'.
const CACHE = 'croppest-v1';
const IMG = 'croppest-img';
const MINE = k => k.startsWith('croppest');
const SHELL = [
  './',
  './index.html',
  './i18n.js',
  './data.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'no-cache' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => MINE(k) && k !== CACHE && k !== IMG).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function save(e, cache, key, res) {
  if (res.ok || res.type === 'opaque') {
    const copy = res.clone();
    e.waitUntil(caches.open(cache).then(c => c.put(key, copy)).catch(() => {}));
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fonts and photos never change at a given URL: cache first.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(e, CACHE, req, res))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/img/')) {
    e.respondWith(caches.open(IMG).then(c => c.match(req.url)).then(hit => hit || fetch(req).then(res => save(e, IMG, req.url, res))));
    return;
  }

  const clean = new URL(req.url); clean.search = ''; clean.hash = '';
  const key = req.mode === 'navigate' ? new URL('./index.html', self.registration.scope).href : clean.href;
  e.respondWith(
    fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then(res => save(e, CACHE, key, res))
      .catch(() => caches.open(CACHE).then(c => c.match(key, { ignoreSearch: true }).then(hit => hit || c.match(new URL('./index.html', self.registration.scope).href))))
  );
});
