let http = require("http");
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process")
let querystring = require("querystring");

/* 
  1. 打开github 验证，windows上是start
*/
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.1ba97bf0d0f6eb1d`, (err, stdout, stderr) => {
    console.log("error");
});

/*
 3 创建server，接收token
 */
http.createServer(function (req, res) {

    let query = querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);

}).listen(3002);

function publish(token) {

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    fs.stat("./sample", (error, states) => {
        let request = http.request({
            // hostname: "47.92.151.210",
            hostname: "127.0.0.1",
            port: "3001",
            method: "POST",
            path: "/publish?token=" + token,
            headers: {
                "Content-Type": "application/octet-stream"
                // "Content-Length": states.size
            }
        }, resp => {
            console.log(resp);
        });

        console.log(JSON.stringify(states));

        archive.directory("./sample/", false);

        archive.finalize();

        archive.pipe(request);

        // request.end();
    });

}
