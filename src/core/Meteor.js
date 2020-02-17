import utils from '../utils';

const VAL = 'value';

const __cbResponse = (crashedValue, meteor, isCrashed) => ({ crashedValue, meteor, isCrashed });

const __crash = function __crash(obj, value, delay = 5000, fn = () => {}) {
  if (utils.isObject(obj) && utils.has(obj, value)) {
    setTimeout(() => {
      const valueWillCrashed = obj[value];
      delete obj[value];
      if (typeof fn === 'function') fn(__cbResponse(valueWillCrashed, obj, !utils.has(obj, value)));
    }, utils.getLegalNum(delay));
  }
};

class Meteor {
  constructor(value, delay, fn) {
    if (value === undefined) throw new Error('Meteor\'s constrctor required at least one argument');
    this[VAL] = value;
    this.wishComeTrueTime = 0;
    __crash(this, VAL, delay, fn);
  }

  wish(fn) {
    if (this[VAL]) {
      try {
        if (fn && typeof fn === 'function') fn(this[VAL]);
      } catch (e) {
        console.warn(e);
      }
      this.wishComeTrueTime++;
    }
  }

  valueOf() {
    return this[VAL];
  }

  toString() {
    return JSON.stringify(this[VAL]);
  }
}

export default Meteor;
