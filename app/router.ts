'use strict';
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/api/ping', controller.home.index);
  /** TEST: unregister consul */
  // router.get('/api/unregister', controller.home.unregister);
  router.get('/publish', controller.home.publish);
  router.get('/receive', controller.home.receive);

};
