
class Options {
  constructor(labels, starting = 0, propName = { value: 'value', label: 'label' }) {
    const legalLabels = this.__legalLabels(labels);
    const legalStarting = this.__legalStarting(starting);
    this.__definePropName(propName);
    this.__toArray(this.__createOptions(legalLabels, legalStarting));
  }
  __legalLabels(labels) {
    function tryString() {
      const stringCanSplit = typeof labels === 'string' && labels.includes(',');
      return stringCanSplit ? labels.split(',') : ['? ? ?'];
    }
    return labels instanceof Array ? labels : tryString();
  }
  __legalStarting(starting) {
    if (starting instanceof Array) return starting;
    const number = Number(starting);
    const isNumber = typeof number === 'number' && !isNaN(number);
    return isNumber ? starting : 0;
  }
  __makeLabelValueObj(label = 'Unknown', value = -1) {
    return {
      [this.__labelPropertyName]: String(label),
      [this.__valuePropertyName]: String(value)
    }
  }
  __createOptions(labels, starting) {
    let value = starting;
    const valueByType = ind => value instanceof Array ? value[ind] || undefined : value++;
    labels.forEach((item, index) => {
      this[index] = this.__makeLabelValueObj(item, valueByType(index));
    })
    return labels.length;
  }
  __definePropName(propName) {
    if (this.__isObject(propName) && propName.value && propName.label) {
      const { value, label } = propName;
      const strOrNum = arg => typeof arg === 'string' || typeof arg === 'number';
      const legalString = str => strOrNum(str) ? str : 'label';
      this.__setPropName(legalString(value), legalString(label));
    } else {
      this.__setPropName('value', 'label');
      console.warn('the third argument expect key-value object which has "value" and "label" property')
    }
  }
  __setPropName(value, label) {
    this.__defineProperty('__valuePropertyName', value);
    this.__defineProperty('__labelPropertyName', label);
    if (this.__valuePropertyName === this.__labelPropertyName) this.__valuePropertyName += 'Value';
  }
  __isObject(arg) {
    return typeof arg === 'object' && arg !== null && !(arg instanceof Array);
  }
  __toArray(length) {
    this.__defineProperty('length', length);
    Object.setPrototypeOf(this, Object.create(Array.prototype));
  }
  __defineProperty(prop, value) {
    const legal = typeof prop === 'string' && value;
    if (legal) Object.defineProperty(this, prop, { value, writable: true, configurable: true });
  }
}

export default Options
