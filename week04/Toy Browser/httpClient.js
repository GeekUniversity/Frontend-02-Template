const { ChunkedBodyParser } = require("./ChunkedBodyParser")
const { ResponseParser } = require("./ResponseParser")
const { HttpRequest } = require("./HttpRequest")
const { parseHTML} = require("./HTMLParser")

void async function () {
    let request = new HttpRequest({
        method: "POST",
        host: "127.0.0.1",
        port: "9099",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed",
        },
        body: {
            name: "cat"
        }
    });

    let response = await request.send();

    parseHTML(response.body);
}();

