import { Textbox } from './controls.js';

export class UsernameModal {
    #controls = [];

    // constructor could take an "options" object that includes anchors and relative positioning
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.textbox = new Textbox(x + 15, y + 20, 30, 12);
        this.#controls.push(this.textbox);
        this.unfocusedBorderColor = 'darkgrey';
        this.focusedBorderColor = '#5D6D7E';
        this.windowBorderColor = this.unfocusedBorderColor;
        this.windowColor = 'lightgrey';
        this.formBorder = 3;
    }

    focus(isFocused) {
        if (isFocused) {
            this.windowBorderColor = this.focusedBorderColor;
        } else {
            this.windowBorderColor = this.unfocusedBorderColor;
        }
    }

    onkeydown = (event) => {
        this.textbox.onkeydown(event);
    };

    onclick = (event) => {
    };

    onmousedown = (event) => {
    };

    isInside = (x, y) => y >= this.y && y <= this.y + this.height &&
        x >= this.x && x <= this.x + this.width;

    render(context) {
        context.fillStyle = this.windowColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = this.windowBorderColor;
        context.lineJoin = 'bevel';
        context.lineWidth = this.formBorder;
        context.strokeRect(this.x, this.y, this.width, this.height);

        this.textbox.render(context);
    }
}