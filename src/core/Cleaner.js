import utils from '../utils';

const RULES = (typeof Symbol === 'function') ? Symbol('__CleanRules__') : '__CleanRules__';

const __cleanAction = function __cleanAction(obj, target, smart, special) {
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (Object.prototype.hasOwnProperty.call(special, i)) {
        obj[i] = special[i];
      } else if (!smart) {
        if (!utils.isObject(obj[i])) obj[i] = target;
        else __cleanAction(obj[i], target, smart, special);
      } else {
        obj[i] = __getCleanedPropByType(obj[i], target, special);
      }
    }
  }
  return obj;
};

const __getCleanedPropByType = function __getCleanedPropByType(prop, target, special) {
  switch (typeof prop) {
    case 'symbol':
    case 'string':
      return '';
    case 'bigint':
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'function':
      return function fn() {};
    case 'object':
      if (prop instanceof Array) return [];
      if (prop === null) return null;
      return __cleanAction(prop, target, true, special);
    default:
      return target;
  }
};

class Cleaner {
  constructor(obj = {}, { target = undefined, smart = false, special = {} } = {}) {
    if (!utils.isObject(obj)) throw new Error('the first argument expect key-value object');
    const leaglSpecial = utils.isObject(special) ? special : {};
    const legalSmart = Boolean(smart);
    const cleanedObj = __cleanAction(obj, target, legalSmart, leaglSpecial);
    for (const i in cleanedObj) {
      if (Object.prototype.hasOwnProperty.call(cleanedObj, i)) {
        this[i] = cleanedObj[i];
      }
    }
    this[RULES] = { target, smart: legalSmart, special: leaglSpecial };
  }

  clean() {
    const { target, smart, special } = this[RULES];
    __cleanAction(this, target, smart, special);
    return this;
  }

  setCleanRules(rules = {}) {
    if (utils.isObject(rules)) {
      this[RULES] = {
        ...this[RULES],
        ...rules,
      };
    }
    return this;
  }
}

export default Cleaner;
