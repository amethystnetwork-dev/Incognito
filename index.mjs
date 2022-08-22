import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

const port = process.env.PORT || 8080;

const bare =  new Server('/bare/', '');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
	if(bare.route_upgrade(req, socket, head))return;
	socket.end();
});

server.listen(port);

console.log("Server running on port " + port)