export class Listener {
    constructor(element, recognizer) {
        // this.element = element;
        // this.recognizer = recognizer;
        let contexts = new Map();
        let isListeningMouse = false;

        element.addEventListener("mousedown", (event) => {
            let ctx = Object.create(null);

            contexts.set("mouse" + (1 << event.button), ctx);

            recognizer.start(event, ctx);

            let mouseMove = (event) => {
                let button = 1;
                while (button <= event.buttons) {
                    if (button & event.buttons) {

                        //order of buttons & button property is not same
                        let key;
                        if (button === 2)
                            key = 4;
                        else if (button === 4)
                            key = 2;
                        else
                            key = button;
                        let ctx = contexts.get("mouse" + key);
                        recognizer.move(event, ctx);
                    }
                    button = button << 1;
                }
            }

            let mouseUp = (event) => {

                console.log("mouse up");
                let ctx = contexts.get("mouse" + (1 << event.button));
                recognizer.end(event, ctx);
                contexts.delete("mouse" + (1 << event.button));

                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                    isListeningMouse = false;
                }
            }

            if (!isListeningMouse) {
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
                isListeningMouse = true;
            }
        })

        element.addEventListener("touchstart", (event) => {
            for (let touch of event.changedTouches) {
                let ctx = Object.create(null);
                contexts.set(touch.identifier, ctx);
                recognizer.start(touch, ctx);
            }
        })

        element.addEventListener("touchend", (event) => {

            console.log("touch end")
            for (let touch of event.changedTouches) {
                let ctx = contexts.get(touch.identifier);
                recognizer.end(touch, ctx);
                contexts.delete(ctx.identifier);
            }
        })

        element.addEventListener("touchmove", (event) => {
            for (let touch of event.changedTouches) {
                let ctx = contexts.get(touch.identifier);
                recognizer.move(touch, ctx);
            }
        })

        element.addEventListener("touchcancel", (event) => {
            for (let touch of event.changedTouches) {
                let ctx = contexts.get(touch.identifier);
                recognizer.cancel(touch, ctx);
                contexts.delete(ctx.identifier);
            }
        })
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    start(point, ctx) {

        ctx.startX = point.clientX, ctx.startY = point.clientY;
        ctx.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];

        ctx.isTap = true;
        ctx.isPan = false;
        ctx.isPress = false;

        ctx.handler = setTimeout(() => {
            ctx.isTap = false;
            ctx.isPan = false;
            ctx.isPress = true;
            ctx.handler = null;
            // console.log("press");
            this.dispatcher.dispatch("press", {});
        }, 500);
    }

    move(point, ctx) {

        let dx = point.clientX - ctx.startX, dy = point.clientY - ctx.startY;

        if (!ctx.isPan && (dx ** 2 + dy ** 2 > 100)) {
            ctx.isTap = false;
            ctx.isPan = true;
            ctx.isPress = false;
            ctx.isVertical = Math.abs(dx) < Math.abs(dy);
            // console.log("panstart");
            this.dispatcher.dispatch("panstart", {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: ctx.isVertical
            });
            clearTimeout(ctx.handler);
        }

        if (ctx.isPan) {
            // console.log("pan", point);
            this.dispatcher.dispatch("pan", {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: ctx.isVertical
            });
        }

        ctx.points = ctx.points.filter(point => Date.now() - point.t < 500);
        ctx.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
    }

    end(point, ctx) {
        if (ctx.isTap) {
            console.log("tap");
            this.dispatcher.dispatch("tap", {});
            clearTimeout(ctx.handler);
        }


        if (ctx.isPress) {
            // console.log("pressend");
            this.dispatcher.dispatch("pressend", {});
        }

        ctx.points = ctx.points.filter(point => Date.now() - point.t < 500);

        let v = 0;
        if (ctx.points.length) {
            let d = Math.sqrt((point.clientX - ctx.points[0].x) ** 2 + (point.clientY - ctx.points[0].y) ** 2);
            v = d / (Date.now() - ctx.points[0].t);
        }

        if (v > 1.5) {
            ctx.isFlick = true;
            this.dispatcher.dispatch("flick", {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: ctx.isVertical,
                isFlick: ctx.isFlick,
                velocity: v
            });
        }
        else {
            ctx.isFlick = false;
        }

        if (ctx.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: ctx.isVertical,
                isFlick: ctx.isFlick
            });
        }
    }

    cancel(point, ctx) {
        clearTimeout(ctx.handler);
        // console.log("cancel", point);
        this.dispatcher.dispatch("cancel", {});
    }
}

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }

    dispatch(type, properties) {
        let event = new Event(type);
        
        for (let name in properties) {
            event.properties.set(name, properties[name]);
        }
        this.element.dispatchEvent(event);
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}