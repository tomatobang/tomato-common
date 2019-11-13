'use strict';

import { EggAppConfig, PowerPartial } from 'egg';
const env = process.env;

// 提供给 config.{env}.ts 使用
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// 应用本身的配置 Scheme
export interface BizConfig {
  ratelimit: {
    duration: number;
    throw: boolean;
    errorMessage: string;
    max: number;
  };

  robot: {
    ua: any;
  };
}

// appInfo: EggAppInfo
export default () => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.keys = 'com.server.tomatocommon';
  config.middleware = ['errorhandler'];

  config.cluster = {
    listen: {
      port: 8000,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'INFO',
    dir: './logs',
    encoding: 'utf-8',
    // 应用启动后，也能看日志( 文档中没说明, 且不建议使用 )
    // disableConsoleAfterReady: false,
  };

  config.static = {
    dir: '../app/public',
    prefix: '',
    buffer: true,
    maxAge: 31536000,
    dynamic: false,
    preload: false,
    maxFiles: 20,
  };

  config.consul = {
    client: {
      host: {
         // register center ip , default 127.0.0.1
        ip: '127.0.0.1',
        // register center port, default 8500
        port: '8500', 
        // optional
        defaults: { 
          // token: 'acl token'
        }
      },
      server: {
        name: 'tomato-common', // project name, default project name
        // service ip, default extranet ip
        // address: '', 
        // service port, default service port
        // port: '', 
        check: {
          path: '/api/ping' // health check http path
        },
        tags: ['tomato'] // service tags
      }
    }
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/tomatobang',
    options: {},
  };

  config.serverPort = {
    serverPort: env.serverPort || 3000,
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

  config.grpc = {
    endpoint: 'localhost:50051',
    // dir: 'app/proto', // proto files dir, relative path
    // property: 'grpc', // default attach to `ctx.grpc.**`
    // loadOpts: { convertFieldsToCamelCase: true, }, // message field case: `string user_name` -> `userName`
  };

  return config;
};
