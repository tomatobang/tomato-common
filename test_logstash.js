const log4js = require('log4js');
const logger = log4js.getLogger('logstash');

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        logstash: {
            type: '@log4js-node/logstashudp',
            host: 'your_host_name',
            port: 10001,
            fields: {             // Optional, will be added to the 'fields' object in logstash
                field1: 'value1',
                field2: 'value2'
            },
            layout: {
                type: 'pattern',
                pattern: '%m'
            }
        }
    },
    categories: {
        default: { appenders: ['logstash', 'console'], level: 'info' }
    }
});

setInterval(() => {
    console.log(new Date().getTime(), logger); //"important log message", 
    logger.info('testing add log', {
        "datetime": "2018-11-07 21:38:09.271",
        "timestamp": 1541597889271,
        "level": "INFO",
        "event": "client-init",
        "reqId": "rJtT5we6Q",
        "reqLife": 5874,
        "reqUid": "999793fc03eda86",
        "d": {
            "url": "/",
            "ip": "9.9.9.9",
            "httpVersion": "1.1",
            "method": "GET",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
            "headers": "*"
        },
        "content": "(Empty)",
        "line": "middlewares/foo.js:14",
        "server": "127.0.0.1"
    });
}, 2000);

  // logger.trace('testing trace');
  // logger.debug('testing debug.');
  // logger.info('testing info.');
  // logger.warn('testing warn.');
  // logger.error('testing error!');
  // logger.fatal('testing fatal.');