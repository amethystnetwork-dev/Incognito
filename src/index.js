import e from"@tomphttp/bare-server-node";import{uvPath as o}from"@titaniumnetwork-dev/ultraviolet";import{fileURLToPath as r}from"node:url";import{createServer as t}from"node:https";import{createServer as s}from"node:http";import{readFileSync as n,existsSync as p}from"node:fs";import{hostname as i}from"node:os";import l from"serve-static";import c from"connect";console.log("Incognito\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nYou should have received a copy of the GNU General Public License\nalong with this program. If not, see <https://www.gnu.org/licenses/>.\n");const a=c(),u=e("/bare/");var m,d=process.env.PORT;const h=p("../ssl/key.pem")&&p("../ssl/cert.pem");h?(m=t({key:n("../ssl/key.pem"),cert:n("../ssl/cert.pem")}),d=d||443):(m=s(),d=d||8080),a.use(((e,o,r)=>{u.shouldRoute(e)?u.routeRequest(e,o):r()})),a.use(l(r(new URL("../static/",import.meta.url)))),a.use("/uv",l(o)),a.use(((e,o)=>{o.writeHead(500,null,{"Content-Type":"text/plain"}),o.end("Error")})),m.on("request",a),m.on("upgrade",((e,o,r)=>{u.shouldRoute(e,o,r)?u.routeUpgrade(e,o,r):o.end()})),m.on("listening",(()=>{const e=m.address();console.log(`Server running on port ${e.port}`),console.log(""),console.log("You can now view it in your browser."),console.log(`Local: http${h?"s":""}://${"IPv6"===e.family?`[${e.address}]`:e.address}${80===e.port||h&&443===e.port?"":":"+e.port}`),console.log(`Local: http${h?"s":""}://localhost${80===e.port||h&&443===e.port?"":":"+e.port}`);try{console.log(`On Your Network: http${h?"s":""}://${i()}${80===e.port||h&&443===e.port?"":":"+e.port}`)}catch(e){}process.env.REPL_SLUG&&process.env.REPL_OWNER&&console.log(`Replit: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`)})),m.listen({port:d});
