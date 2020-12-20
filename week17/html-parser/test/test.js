var assert = require('assert');
import { parseHTML } from "../src/HTMLParser"

describe("---parse html---", () => {

    let html = "<a>abc</a>";
    it(html, function () {
        let tree = parseHTML(html);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html11 = "<a/>";
    it(html11, function () {
        let tree = parseHTML(html11);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html12 = "<a class=\"t1\"/>";
    it(html12, function () {
        let tree = parseHTML(html12);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html121 = "<a class />";
    it(html121, function () {
        let tree = parseHTML(html121);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html1211 = "<a class =  124>11111</a>";
    it(html1211, function () {
        let tree = parseHTML(html1211);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html13 = "<a id=\"123\" class=\"cls1 cls2\" >abc</a>";
    it(html13, function () {
        let tree = parseHTML(html13);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html14 = "<a id='123' class='abc' >abc</a>";
    it(html14, function () {
        let tree = parseHTML(html14);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html15 = "<a style=\"font-size:10px\">abc</a>";
    it(html15, function () {
        let tree = parseHTML(html15);
        assert.equal(tree.children[0].tagName, "a");
    });

    let html16 = "123";
    it(html16, function () {
        let tree = parseHTML(html16);
        // console.log(tree);
        assert.equal(tree.children[0].type, "text");
    });

    let html17 = "<html><head><style> #container,div#mydiv {font-size:10px;}  div.cls1 {font-size:10px;} div div.cls2~p#p2 {   background-color:red;    }    a:hover {  background-color: yellow; }  p\[id = \"p11\"] {" +
        " background-color:yellowgreen;  }  </style > </head >    <body>  <div id=\"container\" style=\"font-size:12px;\"> <div id=\"mydiv\" class=\"cls1 cls2\">" +
        " <p id='p11' tt=12>div->div->p</p>  </div> <p id=\"p1\">p1</p> <p id=\"p2\">p2</p>  <p id=\"p3\">p3</p> <a href=\"www.abc.om\" id=\"a1\">链接</a>  </div>" +
        " <div class='btndive'> <input type=\"button\" value=\"IsMatch\" onclick=\"isMatch()\" /> </div> </body></html > ";
    
    it(html17, function () {
        let tree = parseHTML(html17);
        console.log(tree)
    });
})
