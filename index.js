import Mock from './src/core/Mock';
import Options from './src/core/Options';
import Task from './src/core/Task';
import Looper from './src/core/Looper';
import Meteor from './src/core/Meteor';
import Black8 from './src/core/Black8';
import Chaos from './src/core/Chaos';
import Cleaner from './src/core/Cleaner';
import Snapshot from './src/core/Snapshot';

const Tofu = {
  Mock,
  Options,
  Task,
  Looper,
  Meteor,
  Black8,
  Chaos,
  Cleaner,
  Snapshot,
};

if (window && !window.Tofu) {
  window.Tofu = Tofu;
}

export default Tofu;
