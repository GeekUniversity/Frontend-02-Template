const net = require("net");
const { runInThisContext } = require("vm");
const { ResponseParser } = require("./ResponseParser")

class HttpRequest {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host || "127.0.0.1";
        this.port = options.port || "80";
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};

        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        };

        this.headers["Content-Type"] = this.headers["Content-Type"] + ";charset=utf-8";

        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
    };

    send(connection) {
        return new Promise((resolve, reject) => {

            const parser = new ResponseParser;

            if (!connection) {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                });
            }

            // console.log('-------http request beign--------\r\n' + this.toString() + '\r\n-------http request end--------');


            connection.write(this.toString());

            connection.on('data', (data) => {
                parser.receive(data.toString());
                if (parser.isFinished) {
                    // console.log(JSON.stringify(parser.content));
                    resolve(parser.response);
                    connection.end();
                }
            }).on('error', (err) => {
                console.log(err);
                reject(err);
                connection.end();
            });
        });
    }
}

module.exports = { HttpRequest }