import crypto from 'node:crypto'

export default function(req, res, data) {
    switch(req.url) {
        case '/data/visit':
            data.live++
            data.visits++
            if(data.peak < data.live) data.peak = data.live
            res.end('OK')
            break;
        case '/data/create-id':
            res.end(crypto.randomUUID())
            break;
        case '/data/keep-alive':
            res.end()
            break;
        case '/data/destroy':
            removeVisit(req, data)
            res.end()
        break;
        case '/data/data':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(data))
            break;
        default:
            res.writeHead(404)
            res.end('404')
    }
}

function removeVisit(req, data) {
    data.live = data.live - 1
}