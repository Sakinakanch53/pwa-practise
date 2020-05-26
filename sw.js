const filesToCache = [
    'index.html',
    '404.html',
    'style.css',
    'girl.png'
];

const staticCache = 'our-first-cache';

self.addEventListener('install', event => {
    console.log('attempting to install service worker and cache static assets')
    event.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    );
})

self.addEventListener('fetch', event => {
    console.log('fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('found', event.request.url, 'in cache');
                return response;
            }
            console.log('network request for', event.request.url);
            return fetch(event.request)
                .then(response => {
                    return caches.open(staticCache)
                        .then(cache => {
                            cache.put(event.request.url, response.clone());
                            return response;
                        })
                })


        })
        .catch(err => {
            console.error(err);
            return cache.match('offline.html');
        })
    )
})


/*(function() {
    self.addEventListener('install', event => {
        console.log('service worker installed');
        self.skipWaiting();
    })

    self.addEventListener('activate', event => {
        console.log('service worker activating');
        self.skipWaiting();
    })
/*
    self.addEventListener('fetch', event => {
        console.log('service worker fetched');
        self.skipWaiting();
    })
})()*/