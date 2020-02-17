import utils from '../utils';

const VAL = 'value';

const __cleanValue = function __cleanValue(obj, value, delay = 5000, fn = () => {}) {
  if (utils.isObject(obj) && utils.has(obj, value)) {
    setTimeout(() => {
      delete obj[value];
      if (typeof fn === 'function') fn();
    }, utils.getLegalNum(delay));
  }
};

class Meteor {
  constructor(value, delay, fn) {
    this[VAL] = value;
    __cleanValue(this, VAL, delay, fn);
  }
}

export default Meteor;
