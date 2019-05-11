'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  rabbitmqjs: {
    enable: true,
    package: 'egg-rabbitmqjs',
  },
  consul: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-consul'),
  },
};
