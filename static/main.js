import { keyDown } from './modules/handlers.js';

document.addEventListener('keydown', keyDown);

window.addEventListener('load', (event) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.font = '12px serif';
    
    canvas.addEventListener('mousedown', (event) => {
        context.fillText(`(${event.clientX}, ${event.clientY})`, event.clientX, event.clientY);
    });
});