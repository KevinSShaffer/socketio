import { keyDown } from './modules/handlers.js';

const canvasPaddingInPixels = 10;
const socket = io();

let canvas = {};
let context = {};

document.addEventListener('keydown', keyDown);

window.addEventListener('load', (event) => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    resizeCanvas();
    
    canvas.addEventListener('mousedown', (event) => {
        const coordinates = { x: event.offsetX, y: event.offsetY };

        context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);

        socket.emit('mousedown', coordinates);
    });
});

window.onresize = resizeCanvas;

socket.on('mousedown', (coordinates) => {    
    context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);
});

function resizeCanvas() {
    canvas.setAttribute('width', window.innerWidth - (canvasPaddingInPixels * 2));
    canvas.setAttribute('height', window.innerWidth * 3 / 4 - (canvasPaddingInPixels * 2));
    canvas.setAttribute('padding', `${canvasPaddingInPixels}px`)
    context.font = '12px serif';
}