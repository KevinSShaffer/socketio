import { isValidForProperName } from './text.js';

const windowBorderColor = 'darkgrey';
const windowColor = 'lightgrey';
const textboxColor = 'white';
const textboxBorderColor = 'black';
const formBorder = 3;
const textboxBorder = 1;
const nameText = {
    x: 50, 
    y: 50,
    fontSize: 12,
    text: '',
    get font() {
        return `bold ${this.fontSize}px monospace`;
    },
    get position() { 
        return this.x + (.75 * this.fontSize * this.text.length); 
    }
};

export class UsernameModal { 
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    onkeydown(event) {
        const key = event.key;
        let character = false;
    
        if (isValidForProperName(key)) {
            character = key;
        } else if (key === 'Backspace') {
            nameText.text = nameText.text.slice(0, -1);
        }
    
        if (character) {
            nameText.text += character;
            context.fillText(key, nameText.position, nameText.y);
        }
    };

    render(context) {
        context.save();
        context.fillStyle = 'lightgrey';
        context.fillRect(80, 80, 300, 200);
        context.strokeStyle = 'darkgrey';
        context.lineJoin = 'bevel';
        context.lineWidth = formBorder;
        context.strokeRect(80, 80, 300, 200);

        context.fillStyle = 'white';
        context.fillRect(95, 100, nameText.fontSize * .75 * 30, nameText.fontSize * 1.5);
        context.strokeStyle = 'black';
        context.lineWidth = textboxBorder;
        context.strokeRect(95, 100, nameText.fontSize * .75 * 30, nameText.fontSize * 1.5);
        context.restore();

        nameText.x = 95 + textboxBorder + 3;
        nameText.y = 100 + textboxBorder + nameText.fontSize * 1.5 - textboxBorder * 2 - 3;
        context.font = nameText.font;
        context.fillStyle = 'black';
        context.fillText(nameText.text, nameText.x, nameText.y);
    }
}