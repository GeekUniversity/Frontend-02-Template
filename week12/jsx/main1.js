function createElement(type, attributes, ...children) {

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



class Div {
    constructor() {
        this.root = document.createElement("div");
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    };
    appendChild(child) {
        // this.root.appendChild(child);
        child.mountTo(this.root);
    };
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
}

let a = <Div id="a">
    <span>a</span>
    <span>b</span>
    <span>c</span>
</Div>

// document.body.appendChild(a);

a.mountTo(document.body)

