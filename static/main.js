import { characters, numbers, nonalphaPropers, isValidForProperName } from './modules/text.js';

const canvasPaddingInPixels = 10;
const socket = io();

let canvas = {};
let context = {};

let nameText = {
    x: 50, 
    y: 50,
    fontSize: 12,
    text: '',
    get position() { 
        return this.x + (.75 * this.fontSize * this.text.length); 
    }
};

function windowOnLoad(event) {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    resizeCanvas();
    
    canvas.addEventListener('mousedown', (event) => {
        const coordinates = { x: event.offsetX, y: event.offsetY };

        context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);

        socket.emit('mousedown', coordinates);
    });
}

function resizeCanvas() {
    canvas.setAttribute('width', window.innerWidth - (canvasPaddingInPixels * 2));
    canvas.setAttribute('height', window.innerWidth * 3 / 4 - (canvasPaddingInPixels * 2));
    canvas.setAttribute('padding', `${canvasPaddingInPixels}px`)
    context.font = `bold ${nameText.fontSize}px monospace`;
}

function onKeyDown(event) {
    const key = event.key;
    let character = false;

    if (isValidForProperName(key)) {
        character = key;
    }

    if (character) {
        nameText.text += character;
        context.fillText(key, nameText.position, nameText.y);
    }
}

window.onload = windowOnLoad;
window.onresize = resizeCanvas;
document.onkeydown = onKeyDown;

socket.on('mousedown', (coordinates) => {    
    context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);
});