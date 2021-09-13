
export function inject() {
    Object.defineProperty(Array.prototype, 'reverseForEach', {
        value: function(action) {        
            for (let i = this.length - 1; i >= 0; i--) {
                if (action(this[i], i, this)) {
                    break;
                }
            }
        }
    });
}