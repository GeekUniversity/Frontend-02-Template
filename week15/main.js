import { Carousel } from "./Carousel.js"
import { createElement } from "./framework.js"
import { Timeline, Animation } from "./animation"
import { Button } from "./Button.js"
import { List } from "./List.js"

let imgList = [{
    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    url: "https://www.baidu.com",
    title: "1"
},
{
    img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    url: "https://www.baidu.com",
    title: "2"
},
{
    img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    url: "https://www.baidu.com",
    title: "3"
},
{
    img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    url: "www.baidu.com",
    title: "4"
}
];

// let a = <Carousel src={imgList} onChange={event => console.log(event.detail.position)} />;
// a.mountTo(document.body);

/*
Button
let b = <Button>button</Button>
b.mountTo(document.body)
*/

//List
let list = <List data={imgList}>{
    (record) =>
        <div>
            <img src={record.img} />
            <a href={record.url}>{record.title}</a>
        </div>
}
</List>

list.mountTo(document.body);