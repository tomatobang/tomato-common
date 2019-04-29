/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556505441434_6321';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.rabbitmq = {
    clients: {
      producer: {
        url: 'amqp://localhost',
        options: {},
        exchange: {
          name: "Test_Exchange",
          type: "direct",
          options: {
            durable: true
          },
          deadLetterExchange: "Test_Exchange_DLX",
        },
        bindings: [
          { queue: "Test_Queue", key: "Test", options: { exclusive: false, durable: true, maxPriority: 10, deadLetterExchange: "Test_Exchange_DLX" } },
        ],
      },
      consumer: {
        url: 'amqp://localhost',
        options: {},
        exchange: {
          name: "Test_Exchange",
          type: "direct",
          options: {
            durable: true
          },
          deadLetterExchange: "Test_Exchange_DLX",
        },
        bindings: [
          { queue: "Test_Queue", key: "Test", options: { exclusive: false, durable: true, maxPriority: 10, deadLetterExchange: "Test_Exchange_DLX" } },
        ],
      },
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
