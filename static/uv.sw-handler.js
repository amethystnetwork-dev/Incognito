importScripts('./uv/uv.sw.js');

const sw = new UVServiceWorker();

sw.on('request', event => {

})

self.addEventListener('fetch', event => {
    event.respondWith(
        sw.fetch(event)
    )
});