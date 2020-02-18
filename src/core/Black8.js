import utils from '../utils';

const ERROR_INFO = (typeof Symbol === 'function') ? Symbol('__errorInfo__') : '__errorInfo__';

class Black8 {
  constructor(obj, deep = false) {
    if (obj && !utils.isObject(obj)) obj = { value: obj };
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (utils.isObject(obj[prop]) && deep) obj[prop] = Black8.makeOf(obj[prop], deep);
        Object.defineProperty(this, prop, {
          enumerable: true,
          get() {
            return obj[prop];
          },
          set(val) {
            this.boom(`set ${JSON.stringify(val)} to ${prop} is not allowed`);
          },
        });
      }
    }
  }

  static makeOf(obj, deep = false) {
    return new Black8(obj, deep);
  }

  boom(msg = 'this is a Error for no reason...') {
    msg = String(msg);
    if (!this[ERROR_INFO]) this[ERROR_INFO] = [];
    const ind = this[ERROR_INFO].findIndex((item) => item.reason === msg);
    if (ind > -1) this[ERROR_INFO][ind].time += 1;
    else this[ERROR_INFO].push({ reason: msg, time: 1 });
    throw new Error(msg);
  }

  getErrorInfo(reason) {
    if (!this[ERROR_INFO]) return undefined;
    if (reason) return this[ERROR_INFO].find((item) => item.reason === reason);
    return this[ERROR_INFO];
  }

  valueOf() {
    this.boom('method valueOf is not allowed');
  }

  toString() {
    this.boom('method toString is not allowed');
  }

  [Symbol.iterator]() {
    this.boom('this object is not Iterable');
  }
}

export default Black8;
