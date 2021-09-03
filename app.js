const http = require('http');

const port = 3000;
const hostName = '127.0.0.1';

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
}).listen(port, hostName, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});