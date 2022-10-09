import createServer from '@tomphttp/bare-server-node';
import { fileURLToPath } from "url";
import http from 'http';
import serveStatic from "serve-static";
import analytics from './analytics.js'

// The following message MAY NOT be removed
console.log("Incognito\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nYou should have received a copy of the GNU General Public License\nalong with this program. If not, see <https://www.gnu.org/licenses/>.\n")

const port = process.env.PORT || 8080;
var data = { live: 0, peak: 0, visits: 0 }
const bare = createServer('/bare/');
const serve = serveStatic(fileURLToPath(new URL("./static/", import.meta.url)), { fallthrough: false });
const server = http.createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    if(req.url.startsWith('/data')) {
     analytics(req, res, data)
    } else {
    serve(req, res, (err) => {
      res.writeHead(err?.statusCode || 500, null, {
        "Content-Type": "text/plain",
      });
      res.end(err?.stack);
    });
  }}
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req, socket, head)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});


server.listen({ port: port, });

console.log("Server running on port " + port)