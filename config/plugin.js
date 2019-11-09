'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  rabbitmqjs: {
    enable: false,
    package: 'egg-rabbitmqjs',
  },
  consul: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-consul'),
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  grpc: {
    enable: true,
    package: 'egg-grpc',
  }
};
