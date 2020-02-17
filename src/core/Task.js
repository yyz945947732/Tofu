import utils from '../utils';

const __errorMsg = function __errorMsg(time, msg, rest) {
  console.warn(`
        调用函数第${time}次失败,原因:${msg}
        ${rest}
    `);
};

const __successMsg = function __successMsg(time, rest) {
  console.log(`调用函数第${time}次成功! ${rest}`);
};

const __taskStatusMsg = function __taskStatusMsg(num, end = false) {
  console.log(`任务${end ? '结束' : '开启'}! 共${num}次任务...`);
};

const __getRest = function __getRest(now, end) {
  return `剩余${end - now}次...`;
};

const __runTask = function __runTask(fn, num, delay, log) {
  const end = num;
  let now = 1;
  if (log) __taskStatusMsg(num);
  const timer = setInterval(() => {
    if (now <= end) {
      try {
        if (fn) fn();
        if (log) __successMsg(now, __getRest(now, end));
        now++;
      } catch (e) {
        if (log) __errorMsg(now, e, __getRest(now, end));
        now++;
      }
    } else {
      clearInterval(timer);
      if (log) __taskStatusMsg(num, true);
    }
  }, delay);
  return timer;
};

class Task {
  constructor(fn, num = 1, delay = 9000, openLog = true) {
    this.taskNum = utils.getLegalNum(num);
    this.taskDelay = utils.getLegalNum(delay);
    this.openLog = !!openLog;
    if (fn && typeof fn === 'function') {
      this.task = {
        action: fn,
        id: __runTask(fn, this.taskNum, this.taskDelay, this.openLog),
      };
    } else {
      throw new TypeError('wrong argument by Task.the first argument expect function');
    }
  }

  stop() {
    if (this.task && this.task.id) clearInterval(this.task.id);
  }
}

export default Task;
