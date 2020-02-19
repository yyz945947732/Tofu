import utils from '../utils';

const OBJECT = 'object';

const ARRAY = 'array';

const NUMBER = 'number';

const STRING = 'string';

const FUNCTION = 'function';

const __getAchao = () => utils.random([undefined, 0, 1, null, '', true, false, [], {}, function fn() {}]);

const __getAtype = () => utils.random([OBJECT, ARRAY, NUMBER, STRING, FUNCTION]);

const __chaosTypeController = function __chaosTypeController(val, type) {
  const stringifyVal = JSON.stringify(val) || '';
  switch (type) {
    case OBJECT:
      return { [stringifyVal]: val };
    case ARRAY:
      return [val];
    case NUMBER:
      return Number.isNaN(Number(val)) ? stringifyVal.length : Number(val);
    case STRING:
      return stringifyVal;
    case FUNCTION:
      return function fn() { return stringifyVal; };
    default:
      return undefined;
  }
};

class Chaos {
  constructor(length = 1) {
    length = utils.getLegalNum(length);
    let i = 0;
    while (i < length) {
      this[i] = __getAchao();
      i++;
    }
    utils.defineProperty(this, 'length', length);
    Object.setPrototypeOf(Object.getPrototypeOf(this), Object.create(Array.prototype));
  }

  evolution(time = 1) {
    time = utils.getLegalNum(time);
    let t = 0;
    while (t < time) {
      let i = 0;
      while (i < this.length) {
        this[i] = __chaosTypeController(this[i], __getAtype());
        i++;
      }
      t++;
    }
    return this;
  }
}

export default Chaos;
