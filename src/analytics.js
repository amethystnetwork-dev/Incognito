import crypto from "node:crypto";
import bodyParser from "body-parser";
import { METHODS } from "node:http";

function shouldRoute(req, path) {
    return req.originalUrl.endsWith("/") && !path.endsWith("/")
        ? req.originalUrl.slice(0, req.originalUrl.length - 1)
        : req.originalUrl
    === path;
}

function mnt(app, method, path, handler) {
    app.use(path, (req, res, next) => {
        if(!req.method === method.toUpperCase()) return next();
        if(shouldRoute(req, path)) {
            try {
                handler(req, res, next);
            } catch(err) {
                next(err);
            }
        } else next();
    });
};

const visitors = new Map();
let visits = 0;
let peak = 0;

export default function(app) {
    for(const method of METHODS) {
        app[method] = (path, handler) => mnt(app, method, path, handler);
    };
    app.use("/data", bodyParser.text());

    app.GET("/data/data", (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({
            live: visitors.size,
            peak,
            visits
        }));
    });

    app.GET("/data/debug", (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(Object.fromEntries(visitors)));
    });

    app.GET("/data/create-id", (req, res) => {
        const id = crypto.randomUUID();
        visitors.set(id, {
            ut: Date.now(),
            creation: Date.now()
        });
        res.end(id);
    });

    app.POST("/data/visit", (req, res) => {
        visits++;
        res.end("OK");
    });

    app.POST("/data/check-id", (req, res) => {
        res.end(visitors.has(req.body).toString());
    });

    app.POST("/data/keep-alive", (req, res) => {
        if(!visitors.has(req.body)) return res.end("Invalid ID");
        if(peak < visitors.size) peak = visitors.size;
        visitors.set(req.body, {
            ut: Date.now(),
            ...visitors.get(req.body)
        });
        res.end("OK");
    });

    app.POST("/data/destroy", (req, res) => {
        if(!visitors.has(req.body)) return res.end("Invalid ID");
        visitors.delete(req.body);
        res.end("Deleted");
    });
};

setInterval(() => {
    const now = Date.now();
    for(const [uuid, data] of [...visitors]) {
        if(now - data.ut > 60000) {
            visitors.delete(uuid);
        }
    }
}, 60000);