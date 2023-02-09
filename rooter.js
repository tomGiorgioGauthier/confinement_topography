const host = 'localhost';
const port = 8000;
const http = require("http");
const fs = require('fs');

const requestListener = function(req, res) {
    console.log(req.method);
    // const chunks = [];
    let body = '';

    if (req.method === 'POST') {
        req.on('data', data => {
            console.log('data raw ' + data);
            body += data;
        });
        req.on('end', () => {
            // const data = Buffer.concat(chunks);
            body = body.split('&');
            console.log('Data: ', body);
        });
    }
    fs.promises.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
};

const server = http.createServer(requestListener);
// server.setEncoding('utf8');
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});