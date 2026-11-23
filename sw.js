/*
 * Service worker de Vesalio: permite usar la app sin conexión.
 *
 * Estrategia "primero la red": si hay internet se descarga siempre la versión más nueva
 * (y se guarda en caché); si no hay, se usa lo guardado. Así nunca se queda pegada una versión vieja.
 *
 * IMPORTANTE: al agregar un archivo nuevo (por ejemplo, una lámina), súmalo a ARCHIVOS
 * y sube el número de VERSION.
 */
var VERSION = 'vesalio-v1';

var ARCHIVOS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/estilos.css',
  'js/app.js',
  'js/sistemas/oseo.js',
  'js/laminas/humero.js',
  'js/laminas/femur.js',
  'js/laminas/costilla.js',
  'js/laminas/escapula.js',
  'js/laminas/coxal.js',
  'js/laminas/tibia.js',
  'js/laminas/antebrazo.js',
  'js/laminas/clavicula.js',
  'js/laminas/esternon.js',
  'js/laminas/fibula.js',
  'js/laminas/patela.js',
  'js/laminas/vertebras.js',
  'js/laminas/sacro.js',
  'js/laminas/mano.js',
  'js/laminas/pie.js',
  'js/laminas/craneo.js',
  'js/laminas/hioides.js',
  'iconos/favicon.svg',
  'iconos/icono-192.png',
  'iconos/icono-512.png',
  'iconos/icono-maskable-512.png',
  'iconos/apple-touch-icon.png'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(VERSION)
      .then(function (cache) { return cache.addAll(ARCHIVOS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys()
      .then(function (claves) {
        return Promise.all(claves.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  ev.respondWith(
    fetch(req)
      .then(function (resp) {
        if (resp && resp.ok) {
          var copia = resp.clone();
          caches.open(VERSION).then(function (cache) { cache.put(req, copia); });
        }
        return resp;
      })
      .catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (guardada) {
          if (guardada) return guardada;
          // Sin conexión y sin copia: si se pedía una página, mostrar la app
          if (req.mode === 'navigate') return caches.match('index.html');
          return Response.error();
        });
      })
  );
});
