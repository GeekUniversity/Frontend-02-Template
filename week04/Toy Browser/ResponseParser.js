const { ChunkedBodyParser } = require("./ChunkedBodyParser")
const { BodyParser } = require("./BodyParser")

class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.currentStatus = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
        this.content="";
    }

    receive(strVal) {
        for (let i = 0; i < strVal.length; i++) {
            this.receiveChar(strVal.charAt(i));
        }
    }

    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }

    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            content: JSON.stringify(this.content),
            body: this.bodyParser.content.join('')
        }
    }

    receiveChar(chr) {
        if (this.currentStatus === this.WAITING_STATUS_LINE) {
            if (chr === "\r") {
                this.currentStatus = this.WAITING_STATUS_LINE_END;
            } else {
                this.statusLine += chr;
            }
        } else if (this.currentStatus === this.WAITING_STATUS_LINE_END) {
            if (chr === '\n') {
                this.currentStatus = this.WAITING_HEADER_NAME;
            }
        } else if (this.currentStatus === this.WAITING_HEADER_NAME) {
            if (chr === ":") {
                this.currentStatus = this.WAITING_HEADER_SPACE;
            } else if (chr === '\r') {
                this.currentStatus = this.WAITING_HEADER_BLOCK_END;
            } else {
                this.headerName += chr;
            }
        } else if (this.currentStatus === this.WAITING_HEADER_SPACE) {
            if (chr === ' ') {
                this.currentStatus = this.WAITING_HEADER_VALUE;
            }
        } else if (this.currentStatus === this.WAITING_HEADER_VALUE) {
            if (chr === '\r') {
                this.currentStatus = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            } else {
                this.headerValue += chr;
            }
        } else if (this.currentStatus === this.WAITING_HEADER_LINE_END) {
            if (chr === '\n') {
                this.currentStatus = this.WAITING_HEADER_NAME;
            }
        } else if (this.currentStatus === this.WAITING_HEADER_BLOCK_END) {
            if (chr === '\n') {
                this.currentStatus = this.WAITING_BODY;

                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new ChunkedBodyParser();
                }
            }
        } else if (this.currentStatus == this.WAITING_BODY) {
            // if (!this.bodyParser.isFinished) {
                this.content+=chr;
                this.bodyParser.receiveChar(chr);
            // }
        }
    }
}

module.exports = { ResponseParser }