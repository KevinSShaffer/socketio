
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
        this.#canvas.onclick
        this.resize();
    }

    resize = () => {
        this.#canvas.setAttribute('width', window.innerWidth - (this.padding * 2));
        this.#canvas.setAttribute('height', window.innerWidth * 3 / 4 - (this.padding * 2));
        this.#canvas.setAttribute('padding', `${this.padding}px`);
    }

    render() {
        this.#context.fillStyle = 'green';
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#uiElements.forEach(element => {
            element.render(this.#context);
        });
    }
}