import { Timeline, Animation } from "./animation.js";

let t1 = new Timeline();
let animation = new Animation(document.getElementById("div1").style, "transform", 0, 500, 5000, 0, null, v => `translateX(${v}px)`);

// console.log("aaaa");
t1.add(animation);

document.getElementById("pause").addEventListener("click",()=>{
    t1.pause();
});

document.getElementById("start").addEventListener("click",()=>{
    t1.start();
})

document.getElementById("resume").addEventListener("click",()=>{
    t1.resume();
})

// function onStart(){
//     t1.start();
// }

// function onPause(){
//     t1.pause();
