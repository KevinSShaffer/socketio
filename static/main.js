import { Canvas } from './modules/canvas.js';
import { UsernameModal } from './modules/components.js';
import { inject } from './modules/extensions.js';

inject(); // there must be a better way to have an extensions module

const canvas = new Canvas('canvas');
const usernameModal = new UsernameModal(80, 80, 300, 200);

canvas.ui.push(usernameModal);

let lastAnimationFrameId = 0;

;(function () {
    function  main() {
        lastAnimationFrameId = window.requestAnimationFrame(main);
        
        canvas.render();
    }

    main();
})();