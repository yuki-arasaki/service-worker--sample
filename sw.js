const CACHE_NAME = 'sw-v1';
const CACHE_ARR = [
    '/',
    'main.css'
]

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache')
            cache.addAll(CACHE_ARR)
        })
    )
})

self.addEventListener('activate', (event) => {
    console.log('activate')
    event.waitUntil(
        caches.keys()
        .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log('removed old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                console.log(response)
                return response;
            }
            return fetch(event.request)
        })
    )
})