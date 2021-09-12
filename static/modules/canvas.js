
export class Canvas {
    #canvas;
    #context;
    #uiElements = [];
    ui = {
        push: (element) => {
            this.#uiElements.push(element);
            
            if (element.onkeydown) {
                document.onkeydown = element.onkeydown;
            }
        },
    };

    constructor(elementId) {
        this.#canvas = document.getElementById(elementId);
        this.#context = this.#canvas.getContext('2d');
        this.padding = 10;
        window.onresize = this.resize;
        this.#canvas.onclick = this.onclick;
        this.#canvas.onmousedown = this.onmousedown;
        this.resize();
        this.backgroundColor = 'green';
    }

    resize = () => {
        // height = 3/4 width is 4:3 aspect ratio
        this.#canvas.width = window.innerWidth - (this.padding * 2);
        this.#canvas.height = window.innerWidth * 3 / 4 - (this.padding * 2);
        this.#canvas.padding = `${this.padding}px`;
    }

    onclick = (event) => {
        for (let i = this.#uiElements.length - 1; i >= 0; i--) {
            const element = this.#uiElements[i];

            if (element.isInside(event.clientY, event.clientX)) {
                element.onclick(event);

                break;
            }
        }
    };

    onmousedown = (event) => {
        // TODO: elements should be modal or modeless and if the top element is
        //  modal then it avoids the for loop and only checks if the click is 
        //  inside that modal.

        for (let i = this.#uiElements.length - 1; i >= 0; i--) {
            const element = this.#uiElements[i];

            if (element.isInside(event.clientY, event.clientX)) {
                element.onmousedown(event);

                // remove focus from top element
                this.#uiElements[this.#uiElements.length - 1].focus(false);

                // move clicked element to top
                this.#uiElements.splice(i, 1);
                this.#uiElements.push(element);

                // focus top element
                this.#uiElements[this.#uiElements.length - 1].focus(true);

                break;
            }
        }
    }

    render = () => {
        this.#context.fillStyle = this.backgroundColor;
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#uiElements.forEach(element => {
            element.render(this.#context);
        });
    }
}