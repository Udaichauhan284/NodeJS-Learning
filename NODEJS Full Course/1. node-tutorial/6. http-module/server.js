const http = require('http');

const server = http.createServer((req, res) => {
    console.log("This is req: ", req);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("Hello node js from http module");
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on : ${PORT}`);
});