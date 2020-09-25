// import { linear } from "./ease.js";

const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");
const STATE_INIT = Symbol("init");
const STATE_START = Symbol("start");
const STATE_PAUSE = Symbol("pause");

export class Timeline {
    constructor() {
        this.state = STATE_INIT;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start() {
        if (this.state !== STATE_INIT) {
            return;
        }

        this.state = STATE_START;

        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {

            let now = Date.now();

            for (let animation of this[ANIMATIONS]) {

                let t;
                if (this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                } else {
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
                }

                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }

                if (t > 0)
                    animation.receive(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }

        this[TICK]();
    }
    // get rate(){

    // }
    // set rate(){

    // }
    pause() {
        if (this.state !== STATE_START) {
            return;
        }
        this.state = STATE_PAUSE;

        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume() {
        if (this.state !== STATE_PAUSE) {
            return;
        }
        this.state = STATE_START;

        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }
    reset() {
        this.pause();
        this.state = STATE_INIT;
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_START] = 0;
        this[TICK_HANDLER] = null;
    }
    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = (timingFunction || (v => v));
        this.template = (template || (v => v));
    }
    receive(time) {
        let range = (this.endValue - this.startValue);
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }

    start() {

    }
    stop() {

    }
    pause() {

    }
    resume() {

    }
}
