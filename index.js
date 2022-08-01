<<<<<<< HEAD
import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

const bare = createBareServer('/bare/');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();

server.on('request', (req, res) => {
	if (bare.shouldRoute(req)) {
		bare.routeRequest(req, res);
	} else {
		serve.serve(req, res);
	}
});

server.on('upgrade', (req, socket, head) => {
	if (bare.shouldRoute(req)) {
		bare.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.listen(process.env.PORT || 8080);
=======
(async() => {
  await import('./index.mjs');
})();
>>>>>>> parent of acd2908 (fix multiple indexes, type:module)
