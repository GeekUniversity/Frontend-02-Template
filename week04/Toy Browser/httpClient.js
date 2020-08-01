const { ChunkedBodyParser } = require("./ChunkedBodyParser");
const { ResponseParser } = require("./ResponseParser");
const { HttpRequest } = require("./HttpRequest");
const { parseHTML } = require("./HTMLParser");
const images = require("images");
const render = require("./render")

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

    let dom = parseHTML(response.body);

    //绘制图片
    let viewPort = images(800,600);

    render(viewPort,dom[0]);

    viewPort.save("viewport.jpg");
}();

