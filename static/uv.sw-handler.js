importScripts('/lcl/index.js');
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts(__uv$config.sw || '/uv/uv.sw.js');

Object.defineProperty(self, "crossOriginIsolated", { value: true }); // firefox fix

const sw = new UVServiceWorker();

self.addEventListener('fetch', event => {
	if(event.request.url.startsWith(location.origin + __uv$config.prefix)) return event.respondWith(sw.fetch(event));
});