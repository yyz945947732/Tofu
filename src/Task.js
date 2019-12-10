  const __getLegalNum = function(num) {
    return typeof num === 'number' ? Math.floor(num < 1 ? 1 : num) : 0;
  }
  
  const __errorMsg = function(time, msg) {
    console.warn(`调用函数第${time}次失败,原因:`, msg);
  }
  
  const __successMsg = function(time) {
    console.log(`调用函数第${time}次成功!`);
  }
  
  const __runTask = function(fn, num, delay, log) {
    const end = num;
    let now = 1;
    const timer = setInterval(() => {
      if (now <= end) {
        try {
          if (fn) fn();
          if (log) __successMsg(now);
          now++;
        } catch (e) {
          if (log) __errorMsg(now, e);
          now++;
        }
      } else {
        clearInterval(timer);
      }
    }, delay);
    return timer;
  }
  
  class Task {
    constructor(fn, num = 1, delay = 100000, openLog = true) {
      this.taskNum = __getLegalNum(num);
      this.taskDelay = __getLegalNum(delay);
      this.openLog = !!openLog;
      if (fn && typeof fn === 'function') {
        this.task = {
          action: fn,
          id: __runTask(this.taskAction, this.taskNum, this.taskDelay, this.openLog)
        }
      } else {
        throw new TypeError('wrong argument by Task.the first argument expect function');
      }
    }
    stop() {
      if (this.task && this.task.id) clearInterval(this.task.id);
    }
  }
  
  export default Task