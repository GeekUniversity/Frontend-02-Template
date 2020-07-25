const http = require('http');
const { Buffer } = require('buffer');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk.toString());
    }).on('end', () => {
        console.log(body);
        // body=Buffer.concat(stringToUint8Array(body.toString()));
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(
            `<html maaa=a attB="b">
<head>
<style>
body div #myid{
width:100px;
background-color:#ff5000;
}
</style>
</head>
<body>
<div>
<img id="myld" attr="123"/>
<img/>
</div>
<div attr="value">hello world</div>
</body>
</html>`);
    })
}).listen(9099);

console.log("server started");
