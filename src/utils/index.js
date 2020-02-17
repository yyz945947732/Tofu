const getLegalNum = (num) => (typeof num === 'number' ? Math.floor(num < 1 ? 1 : num) : 0);

const defineProperty = function defineProperty(obj, prop, value) {
  const legal = typeof prop === 'string' && typeof value !== 'undefined';
  if (legal) Object.defineProperty(obj, prop, { value, writable: true, configurable: true });
};

const isObject = (arg) => typeof arg === 'object' && arg !== null && !(arg instanceof Array);

const random = (arr) => (arr instanceof Array ? arr[Math.floor(Math.random() * arr.length)] : null);

const has = (obj, prop) => (typeof Reflect !== 'undefined' && Reflect.has ? Reflect.has(obj, prop) : obj[prop]);

export default {
  getLegalNum,
  defineProperty,
  isObject,
  random,
  has,
};
