import { isValidForProperName } from './text.js';

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

    isInside = (x, y) => y > this.y && y < this.y + this.height &&
    x > this.x && x < this.x + this.width;

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

export class Textbox {
    get #font() {
        return `bold ${this.fontSize}px monospace`;
    }

    constructor(x, y, maxCharacters, fontSize) {
        this.x = x;
        this.y = y;
        this.maxCharacters = maxCharacters;
        this.fontSize = fontSize;
        this.text = '';
        this.textboxColor = 'white';
        this.textboxBorderColor = 'black';
        this.textColor = 'black';
        this.formBorder = 3;
        this.textboxBorder = 1;
    }

    onkeydown(event) {
        const key = event.key;
        let character = false;
    
        if (isValidForProperName(key)) {
            character = key;
        } else if (key === 'Backspace') {
            this.text = this.text.slice(0, -1);
        }
    
        if (character) {
            this.text += character;
        }
    }

    render(context) {
        context.fillStyle = this.textboxColor;
        context.fillRect(this.x, this.y, this.fontSize * .75 * this.maxCharacters, this.fontSize * 1.5);
        context.strokeStyle = this.textboxBorderColor;
        context.lineWidth = this.textboxBorder;
        context.strokeRect(this.x, this.y, this.fontSize * .75 * this.maxCharacters, this.fontSize * 1.5);

        context.font = this.#font;
        context.fillStyle = this.textColor;
        context.fillText(this.text, this.x + this.textboxBorder + this.fontSize / 4, this.y + this.fontSize * 1.1);
    }
}