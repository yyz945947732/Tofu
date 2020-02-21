import utils from '../utils';

const __propManager = function __propManager() {
  let __valuePropertyName = 'value';
  let __labelPropertyName = 'label';
  __propManager.clean = function clean() {
    __valuePropertyName = null;
    __labelPropertyName = null;
  };
  return {
    set(value, label) {
      __valuePropertyName = value;
      __labelPropertyName = label;
      if (__valuePropertyName === __labelPropertyName) __valuePropertyName += 'Value';
    },
    get() {
      return {
        __valuePropertyName,
        __labelPropertyName,
      };
    },
  };
};

const __propController = __propManager();
const __setPropName = __propController.set;
const __getPropName = __propController.get;

const __legalLabels = function __legalLabels(labels) {
  function tryString() {
    const stringCanSplit = typeof labels === 'string' && labels.includes(',');
    return stringCanSplit ? labels.split(',') : ['? ? ?'];
  }
  return labels instanceof Array ? labels : tryString();
};

const __legalStarting = function __legalStarting(starting) {
  if (starting instanceof Array || starting === null) return starting;
  const number = Number(starting);
  const isNumber = typeof number === 'number' && !Number.isNaN(number);
  return isNumber ? starting : 0;
};

const __makeLabelValueObj = function __makeLabelValueObj(label = 'Unknown', value = label) {
  return {
    [__getPropName().__labelPropertyName]: String(label),
    [__getPropName().__valuePropertyName]: String(value),
  };
};

const __createOptions = function __createOptions(obj, labels, starting) {
  let value = starting;
  const valueByType = (ind) => (value instanceof Array ? `${value[ind]}` : value++);
  labels.forEach((item, index) => {
    obj[index] = __makeLabelValueObj(item, value !== null ? valueByType(index) : item);
  });
  return labels.length;
};

const __definePropName = function __definePropName(propName) {
  if (utils.isObject(propName) && propName.value && propName.label) {
    const { value, label } = propName;
    const strOrNum = (arg) => typeof arg === 'string' || typeof arg === 'number';
    const legalString = (str) => (strOrNum(str) ? str : 'label');
    __setPropName(legalString(value), legalString(label));
  } else {
    __setPropName('value', 'label');
    console.warn('the third argument expect key-value object which has "value" and "label" property');
  }
};

const __toArray = function __toArray(obj, length) {
  utils.defineProperty(obj, 'length', length);
  Object.setPrototypeOf(obj, Array.prototype);
};

class Options {
  constructor(labels, starting = 0, propName = { value: 'value', label: 'label' }) {
    const legalLabels = __legalLabels(labels);
    const legalStarting = __legalStarting(starting);
    __definePropName(propName);
    __toArray(this, __createOptions(this, legalLabels, legalStarting));
    __propManager.clean();
  }
}

export default Options;
