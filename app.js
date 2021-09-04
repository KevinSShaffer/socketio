const http = require('http');
const fs = require('fs');
const path = require('path');
const SocketIoServer = require('socket.io').Server

const port = 3000;
const hostname = '127.0.0.1';
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`request for ${req.url}`);

    let filePath = './static' + req.url;

    if (filePath === './static/') {
        filePath = './static/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log(`Error: ${err.code}`);

            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 - file not found');
            } else {
                res.writeHead(500);
                res.end(`System Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});

const io = new SocketIoServer(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});
