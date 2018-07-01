self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('page-static-v1').then(cache => {
			return cache.addAll([
				'src/index.css',
				'src/index.js',
				'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
			])
		})
	);
})

self.addEventListener('fetch', (event) => {
	
})