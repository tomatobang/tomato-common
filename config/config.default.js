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

  config.consul = {
    client: {
      host: {
        // register center ip , default 127.0.0.1
        ip: 'localhost',
        // register center port, default 8500
        port: '8500',
        // optional
        defaults: {
          // token: 'acl token'
        }
      },
      server: {
        name: 'tomato-log', // project name, default project name
        // service ip, default extranet ip
        // address: '', 
        // service port, default service port
        // port: '', 
        check: {
          path: '/api/ping' // health check http path
        },
        tags: ['log'] // service tags
      }
    }
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
  };

  config.mongoose = {
    url: 'mongodb://localhost:27017/tomatolog',
    options: {}
  };

  config.grpc = {
    endpoint: 'localhost:50051',
    // dir: 'app/proto', // proto files dir, relative path
    // property: 'grpc', // default attach to `ctx.grpc.**`
    // loadOpts: { convertFieldsToCamelCase: true, }, // message field case: `string user_name` -> `userName`
  };

  return {
    ...config,
    ...userConfig,
  };
};
