import { isValidForProperName } from './text.js';

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

    onkeydown = (event) => {
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

    onclick = (event) => {
    };

    onmousedown = (event) => {
    };

    isInside = (x, y) => y >= this.y && y <= this.y + this.height &&
        x >= this.x && x <= this.x + this.width;

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