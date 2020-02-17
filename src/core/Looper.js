<<<<<<< HEAD
import utils from '../utils';

const __setProps = function __setProps(obj, props) {
  for (const [i, k] of Object.entries(props)) {
    const prev = utils.has(props, i - 1) ? i - 1 : props.length - 1;
    const value = k;
    const next = utils.has(props, +i + 1) ? +i + 1 : 0;
    const all = utils.has(obj, 'all') ? obj.all : [];
    utils.defineProperty(obj, 'all', all.concat([{ prev, value, next }]));
=======

const __has = (obj, prop) => (typeof Reflect !== 'undefined' && Reflect.has ? Reflect.has(obj, prop) : obj[prop]);

const __defineProperty = function __defineProperty(obj, prop, value) {
  const legal = typeof prop === 'string' && typeof value !== 'undefined';
  if (legal) Object.defineProperty(obj, prop, { value, writable: true, configurable: true });
};

const __setProps = function __setProps(obj, props) {
  for (const [i, k] of Object.entries(props)) {
    const prev = __has(props, i - 1) ? i - 1 : props.length - 1;
    const value = k;
    const next = __has(props, +i + 1) ? +i + 1 : 0;
    const all = __has(obj, 'all') ? obj.all : [];
    __defineProperty(obj, 'all', all.concat([{ prev, value, next }]));
>>>>>>> c5b777af6819919331da5e3ca2c72dfe5e6afc9d
  }
};

const __setNow = function __setNow(obj, val) {
<<<<<<< HEAD
  utils.defineProperty(obj, 'now', val);
  utils.defineProperty(obj, 'value', utils.has(val, 'value') ? val.value : undefined);
=======
  __defineProperty(obj, 'now', val);
  __defineProperty(obj, 'value', __has(val, 'value') ? val.value : undefined);
>>>>>>> c5b777af6819919331da5e3ca2c72dfe5e6afc9d
};


class Looper {
  constructor(...props) {
    if (!props.length) throw new Error('Looper\'s constrctor required at least one argument');
    if (props.length === 1 && props[0] instanceof Array) {
      const [arr] = props[0];
      props = arr;
    }
    __setProps(this, props);
    this.reset();
  }

  reset() {
    __setNow(this, this.all[0]);
    return this;
  }

  next() {
    __setNow(this, this.all[this.now.next]);
    return this;
  }

  prev() {
    __setNow(this, this.all[this.now.prev]);
    return this;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value;
  }

  [Symbol.iterator]() {
    let index = 0;
    const _this = this;
    return {
      next() {
        if (index === _this.all.length) {
          return {
            value: '',
            done: true,
          };
        }
        return {
          value: _this.all[index++].value,
          done: false,
        };
      },
    };
  }
}

export default Looper;
