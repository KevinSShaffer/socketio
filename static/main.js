import { keyDown } from './modules/handlers.js';

document.addEventListener('keydown', keyDown);

window.addEventListener('load', (event) => {
    const canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.fillStyle = 'rgb(200, 0, 0)';
        context.fillRect(10, 10, 50, 50);

        context.fillStyle = 'rgb(0, 0, 200, 0.5)';
        context.fillRect(30, 30, 50, 50);
    }
});