import { keyDown } from './modules/handlers.js';

const canvasPaddingInPixels = 10;
const fontSize = 12
const socket = io();

let canvas = {};
let context = {};

let textPosition = { x: 50, y: 50 };

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
    context.font = `bold ${fontSize}px monospace`;
}

function onKeyDown(event) {
    const keyName = event.key;

    context.fillText(keyName, textPosition.x, textPosition.y);

    textPosition.x += .75 * fontSize;
}

window.onload = windowOnLoad;
window.onresize = resizeCanvas;
document.onkeydown = onKeyDown;

socket.on('mousedown', (coordinates) => {    
    context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);
});