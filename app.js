'use strict';

module.exports = app => {
  /**
   * 应用启动前初始化工作
   */
  app.beforeStart(async () => {
    app['tips'] = 'tomato-log start...';
    console.log(app['tips']);
    const log4js = require('log4js');
    log4js.configure({
      appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
      categories: { default: { appenders: ['cheese'], level: 'error' } }
    });

    // const logger = log4js.getLogger('cheese');
    // logger.trace('Entering cheese testing');
    // logger.debug('Got cheese.');
    // logger.info('Cheese is Comté.');
    // logger.warn('Cheese is quite smelly.');
    // logger.error('Cheese is too ripe!');
    // logger.fatal('Cheese was breeding ground for listeria.');
  });

};
