let staticCacheName = 'page-static-v3';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				'src/index.css',
				'src/index.js',
				'https://free.currencyconverterapi.com/api/v5/currencies',
				'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
			])
		})
	);
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(res => {
			if(res) return res;
			return fetch(event.request)
		})
	)
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheNAme => {
					return cacheNAme.startsWith('page-') && cacheName != staticCacheName;
				}).map(cacheName => {
					return caches.delete(cacheName)
				})
			);
		})
	);
})


// self.addEventListener('message', event => {
// 	if(event.data.action === 'skipWaiting') {
// 		self.skipWaiting();
// 	}
// })