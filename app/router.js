'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;

  // REST 风格URL定义，用于快速生成 CRUD 路由结构
  app.router.resources('topics', '/api/v2/topics', 'topics');
};
