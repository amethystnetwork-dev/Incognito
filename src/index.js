import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { gamesPath } from "@amethystnetwork-dev/incognito-gfiles";

import { fileURLToPath } from "node:url";
import { createServer as createHttpsServer } from "node:https";
import { createServer as createHttpServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { hostname } from "node:os";

import serveStatic from "serve-static";
import serveIndex from "serve-index";
import connect from "connect";
import analytics from "./analytics.js";

// The following message MAY NOT be removed
console.log("Incognito\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nYou should have received a copy of the GNU General Public License\nalong with this program. If not, see <https://www.gnu.org/licenses/>.\n");

const app = connect();
const bare = createBareServer("/bare/");
const ssl = existsSync("../ssl/key.pem") && existsSync("../ssl/cert.pem");
const PORT = process.env.PORT || ssl ? 443 : 8080;
const server = ssl ? createHttpsServer({
  key: readFileSync("../ssl/key.pem"),
  cert: readFileSync("../ssl/cert.pem")
}) : createHttpServer();

app.use((req, res, next) => {
  if(bare.shouldRoute(req)) bare.routeRequest(req, res); else next();
});

app.use(serveStatic(fileURLToPath(new URL("../static/", import.meta.url))));
app.use("/source", serveStatic(gamesPath));
app.use("/source", serveIndex(gamesPath, { icons: true }));

app.use("/uv/", serveStatic(uvPath));
analytics(app);

server.on("request", app);
server.on("upgrade", (req, socket, head) => {
  if(bare.shouldRoute(req, socket, head)) bare.routeUpgrade(req, socket, head); else socket.end();
});

server.on("listening", () => {
  const addr = server.address();
  const formatURLWithPort = (hostname, addr) => `http${ssl ? "s" : ""}://${hostname}${(addr.port === 80 || ssl && addr.port === 443) ? "" : ":" + addr.port}`;

  console.log(`Server running on port ${addr.port}`)
  console.log("");
  console.log("You can now view it in your browser.")
  /* Code for listing IPS from website-aio */
  console.log(`Local: ${formatURLWithPort(addr.family === "IPv6" ? `[${addr.address}]` : addr.address, addr)}`);
  console.log(`Local: ${formatURLWithPort("localhost", addr)}`);
  try { console.log(`On Your Network: ${formatURLWithPort(hostname(), addr)}`); } catch (err) {/* Can't find LAN interface */};
});

server.listen({ port: PORT })