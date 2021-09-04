import { keyDown } from './modules/handlers.js';

const socket = io();

document.addEventListener('keydown', keyDown);

window.addEventListener('load', (event) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.font = '12px serif';
    
    canvas.addEventListener('mousedown', (event) => {
        const coordinates = { x: event.clientX, y: event.clientY };

        context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);

        socket.emit('mousedown', coordinates);
    });
});

socket.on('mousedown', (coordinates) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    context.fillText(`(${coordinates.x}, ${coordinates.y})`, coordinates.x, coordinates.y);
});