// import {BodyParser} from './BodyParser'
const { BodyParser } = require("./BodyParser");

class ChunkedBodyParser extends BodyParser {
    constructor() {
        super();
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_TRUNK_LINE = 3;
        this.WAITING_TRUNK_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this._isFinished = false;
        this.currentStatus = this.WAITING_LENGTH;
    }

    get isFinished() {
        return this._isFinished;
    }

    receiveChar(chr) {
        if (this.currentStatus === this.WAITING_LENGTH) {
            if (chr === '\r') {
                if (this.length === 0) {
                    this._isFinished = true;
                }
                this.currentStatus = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(chr, 16);
            }
        } else if (this.currentStatus == this.WAITING_LENGTH_LINE_END) {
            if (chr === '\n' && !this._isFinished) {
                this.currentStatus = this.READING_TRUNK;
            }
        } else if (this.currentStatus === this.READING_TRUNK) {
            this.content.push(chr);
            this.length--;
            //只读这么多长度的数据，多余的不读
            if (this.length === 0) {
                this.currentStatus = this.WAITING_TRUNK_LINE;
            }
        } else if (this.currentStatus === this.WAITING_TRUNK_LINE) {
            if (chr === '\r') {
                this.currentStatus = this.WAITING_TRUNK_LINE_END
            }
        } else if (this.currentStatus === this.WAITING_TRUNK_LINE_END) {
            if (chr === '\n') {
                this.currentStatus = this.WAITING_LENGTH;
            }
        }
    }
}

// export {ChunkedBodyParser} ES6
module.exports = { ChunkedBodyParser }