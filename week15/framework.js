export function createElement(type, attributes, ...children) {

    let element;

    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;

    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    let processChildren = (children) => {
        for (let child of children) {
            if (typeof child === "object" && (child instanceof Array)) {
                processChildren(child);
            } else {
                if (typeof child === "string") {
                    element.appendChild(new TextWrapper(child));
                } else {
                    element.appendChild(child);
                }
            }
        }
    };

    processChildren(children);
    return element;
}

export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attributes");

export class Component {
    constructor(type) {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    render() {
        return this.root;
    }
    setAttribute(name, value) {
        // console.log(name + " " + value);
        this[ATTRIBUTE][name] = value;
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root)
    }
    triggerEvent(type, args) {
        type = "on" + type.replace(/^[\s\S]/, s => s.toUpperCase());
        if (this[ATTRIBUTE][type]) {
            this[ATTRIBUTE][type](new CustomEvent(type, { detail: args }));
        }
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        // console.log(name + " " + value);
        this.root.setAttribute(name,value);
    }
}

class TextWrapper extends Component {
    constructor(text) {
        super();
        this.root = document.createTextNode(text);
    }
}