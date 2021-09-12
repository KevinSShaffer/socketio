import { Canvas } from './modules/canvas.js';
import { UsernameModal } from './modules/components.js';

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