let http = require("http");
let https = require("https");
// let fs = require("fs");
let unzipper = require("unzipper");
let querystring = require("querystring");

// client secret 52df204dd5ce986908b7424e5ab4cbd17166bd7e

//2 接收access code
function auth(req, res) {
    let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query);
    getToken(query.code, (info) => {
        // console.log(info);
        res.write(`<a href='http://localhost:3002/?token=${info.access_token}'>publish</a>`);
        res.end();
    });
}

function getToken(code, callback) {
    let req = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.1ba97bf0d0f6eb1d&client_secret=52df204dd5ce986908b7424e5ab4cbd17166bd7e`,
        method: "post",
        port: 443
    }, (res) => {
        let body = "";

        res.on('data', chunk => {
            body += chunk.toString();
        });

        res.on('end', chunk => {
            // console.log(body);
            let o = querystring.parse(body);
            callback(o);
        })
    });

    req.end();
}

function publish(req, res) {

    let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    getUser(query.token, info => {
        // console.log(info);
        req.pipe(unzipper.Extract({ path: '../server/public/' }));
        req.on('end', () => {
            res.end("Success");
        });

        req.on('error',(error)=>{
            console.log(error);
        })
    });
}


function getUser(token, callback) {
    let req = https.request({
        hostname: "api.github.com",
        path: `/user`,
        method: "get",
        port: 443,
        headers: {
            authorization: `token ${token}`,
            "User-Agent": "toy-publish"
        }
    }, (res) => {
        let body = "";

        res.on('data', chunk => {
            body += chunk.toString();
        });

        res.on('end', chunk => {
            // console.log(body);
            let o = querystring.parse(body);
            callback(o);
        })
    });

    req.end();
}


http.createServer(function (req, res) {

    if (req.url.match(/^\/auth\?/)) {
        return auth(req, res);
    } else if (req.url.match(/^\/publish\?/)) {
        return publish(req, res);
    }
}).listen(3001);