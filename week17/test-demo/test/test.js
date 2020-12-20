var assert = require('assert');
import {add,mul} from "../add"

describe("test case : add function testing", () => {
    it('1+2 should be 3', function () {
        assert.equal(add(1, 2), 3);
    });

    it('5+2 should be 7', function () {
        assert.equal(add(5, 2), 7);
    });

    it('5*2 should be 10', function () {
        assert.equal(mul(5, 2), 10);
    });
})
