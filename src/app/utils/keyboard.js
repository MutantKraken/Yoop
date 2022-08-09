export class KeyBoard {
  constructor() {
    this.keys = [];
    this.downFunc = (event) => {
      if (this.keys.includes(event.code)) {
        return;
      }
      this.keys.push(event.code);
    };
    this.upFunc = (event) => {
      this.keys = this.keys.filter(function(item) {
        return item !== event.code;
      });
    };
  }
  isKey(key) {
    return this.keys.includes(key);
  }
  start() {
    document.addEventListener('keydown', this.downFunc, false);
    document.addEventListener('keyup', this.upFunc, false);
  }
  stop() {
    document.removeEventListener('keydown', this.downFunc, false);
    document.removeEventListener('keyup', this.upFunc, false);
  }
}