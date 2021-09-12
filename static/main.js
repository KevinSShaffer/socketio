import { isValidForProperName } from './modules/text.js';

const canvasPaddingInPixels = 10;
const socket = io();
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let lastAnimationFrameId = 0;

let nameText = {
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

function windowOnLoad(event) {
    resizeCanvas();
    
    canvas.addEventListener('mousedown', (event) => {
        const coordinates = { x: event.offsetX, y: event.offsetY };
    });
}

function resizeCanvas() {
    canvas.setAttribute('width', window.innerWidth - (canvasPaddingInPixels * 2));
    canvas.setAttribute('height', window.innerWidth * 3 / 4 - (canvasPaddingInPixels * 2));
    canvas.setAttribute('padding', `${canvasPaddingInPixels}px`);
}

function onKeyDown(event) {
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
}

window.onload = windowOnLoad;
window.onresize = resizeCanvas;
document.onkeydown = onKeyDown;

;(function () {
    function  main() {
        lastAnimationFrameId = window.requestAnimationFrame(main);

        context.fillStyle = 'green';
        context.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));

        const border = 3;
        const textboxBorder = 1;
        context.fillStyle = 'darkgrey';
        context.fillRect(80, 80, 300, 200);
        context.fillStyle = 'lightgrey';
        context.fillRect(80 + border, 80 + border, 300 - border * 2, 200 - border * 2);
        context.save();
        context.strokeStyle = 'black';
        context.lineJoin = 'bevel';
        context.lineWidth = textboxBorder;
        context.strokeRect(95, 100, nameText.fontSize * .75 * 30, nameText.fontSize * 1.5);
        context.restore();
        context.fillStyle = 'white';
        context.fillRect(95 + textboxBorder, 
            100 + textboxBorder, 
            nameText.fontSize * .75 * 30 - textboxBorder * 2, 
            nameText.fontSize * 1.5 - textboxBorder * 2);

        nameText.x = 95 + textboxBorder + 3;
        nameText.y = 100 + textboxBorder + nameText.fontSize * 1.5 - textboxBorder * 2 - 3;
        context.font = nameText.font;
        context.fillStyle = 'black';
        context.fillText(nameText.text, nameText.x, nameText.y);
    }

    main();
})();