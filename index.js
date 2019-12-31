import Mock from './src/core/Mock';
import Options from './src/core/Options';
import Task from './src/core/Task';
import Looper from './src/core/Looper';

const Tofu = {
  Mock,
  Options,
  Task,
  Looper,
};

if (window && !window.Tofu) {
  window.Tofu = Tofu;
}

export default Tofu;
