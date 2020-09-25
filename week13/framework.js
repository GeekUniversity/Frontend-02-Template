export function createElement(type, attributes, ...children) {

    let element;

    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;

    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    for (let child of children) {
        if (typeof child === "string") {
            element.appendChild(new TextWrapper(child));
        } else {
            element.appendChild(child);
        }
    }

    return element;
}

export class Component {
    constructor(type) {
        // this.root = this.render();
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
}

class TextWrapper extends Component {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
}