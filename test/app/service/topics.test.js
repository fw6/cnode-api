'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/topics.test.js', () => {
  let ctx;

  // 创建匿名 context 对象，可以在 ctx 对象上调用 service 的方法
  beforeEach(() => {
    ctx = app.mockContext();
  });

  describe('create()', () => {
    it('should create failed by accesstoken error', async () => {
      try {
        await ctx.service.topics.create({
          accesstoken: 'hello',
          title: 'title',
          content: 'content',
        });
      } catch (err) {
        assert(err.status === 401);
        assert(err.message === '错误的accesstoken');
        return;
      }
    });

    it('should create success', async () => {
      app.mockHttpclient(`${ctx.service.topics.root}/topics`, 'POST', {
        data: {
          success: true,
          topic_id: '5433d5e4e737cbe96dcef312',
        },
      });

      const id = await ctx.service.topics.create({
        accesstoken: 'hello',
        title: 'title',
        content: 'content',
      });

      assert(id === '5433d5e4e737cbe96dcef312');
    });
  });
});
