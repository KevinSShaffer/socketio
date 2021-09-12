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

        context.fillStyle = 'white';
        context.font = nameText.font;
        context.fillRect(40, 40, canvas.getAttribute('width') - 80, nameText.fontSize * 1.5);

        context.fillStyle = 'black';
        context.fillText(nameText.text, nameText.x, 40 + nameText.fontSize);
    }

    main();
})();