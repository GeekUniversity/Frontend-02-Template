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
*#container{
    width:500px;
    height:300px;
    display:flex;
    background-color:rgb(255,255,255)
}
#container #myid{
    width:200px;
    height:100px;
    background-color:rgb(255,0,0)
}
#container .c1{
    flex:1;
    background-color:rgb(0,255,0)
}
</style>
</head>
<body>
<div id="container">
    <div id="myid"/>
    <div class="c1"/>
</div>
</body>
</html>`);
    })
}).listen(9099);

console.log("server started");
