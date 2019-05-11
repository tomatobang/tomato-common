'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/ping', controller.home.index);
  router.get('/publish', controller.home.publish);
  router.get('/receive', controller.home.receive);
};
