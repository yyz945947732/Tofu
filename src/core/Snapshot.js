import utils from '../utils';

const TARGET = (typeof Symbol === 'function') ? Symbol('__TARGET_NOW__') : '__TARGET_NOW__';

const __setTimer = function __setTimer(obj, points) {
  points.forEach((item, index) => {
    setTimeout(() => {
      __addShot(obj, index, obj[TARGET]);
    }, utils.getLegalNum(item));
  });
};

const __addShot = function __addShot(obj, sign, state) {
  if (utils.isObject(obj)) obj[sign] = JSON.parse(JSON.stringify(state));
};

const __timeTravelAction = function __timeTravelAction(source, target) {
  for (const i in source) {
    if (!Object.prototype.hasOwnProperty.call(target, i)) {
      delete source[i];
    }
  }
  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      source[i] = JSON.parse(JSON.stringify(target[i]));
    }
  }
};

class Snapshot {
  constructor(obj, ...points) {
    if (!obj || typeof obj !== 'object' || obj === null) throw new TypeError('the first argument expect object');
    this[TARGET] = obj;
    if (points.length > 0) {
      __setTimer(this, points[0] instanceof Array ? points[0] : points);
    }
  }

  kaca(sign = 'default sign', once = false) {
    if (once && utils.has(this, JSON.stringify(sign))) return this.get(sign);
    __addShot(this, JSON.stringify(sign), this[TARGET]);
    return this.get(sign);
  }

  get(sign = 'default sign') {
    const state = this[JSON.stringify(sign)];
    return (typeof state === 'object' && state !== null) ? state : {};
  }

  timeTravel(sign = 'default sign') {
    const havePoint = utils.has(this, JSON.stringify(sign));
    if (!havePoint) {
      console.warn(`cant find point ${JSON.stringify(sign)}`);
      return this[TARGET];
    }
    this.kaca('before timeTravel');
    __timeTravelAction(this[TARGET], this.get(sign));
    this.kaca('after timeTravel');
    return this[TARGET];
  }
}

export default Snapshot;
