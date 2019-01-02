'use strict';
/**
 * Controller 主要实现以下逻辑：
 *  1. 调用 validate 方法对请求参数进行验证
 *  2. 用验证过的参数调用 service 封装的业务逻辑来创建 topic
 *  3. 按照约定的格式设置响应状态码和内容
 */

const Controller = require('egg').Controller;

class TopicController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], require: false },
      content: 'string',
    };
  }

  async index() {
    const { ctx } = this;
    ctx.validate(
      {
        page: { type: 'string', format: /\d+/, required: false },
        tab: {
          type: 'enum',
          values: [ 'ask', 'share', 'job', 'good' ],
          required: false,
        },
        limit: { type: 'string', format: /\d+/, required: false },
      },
      ctx.query
    );

    ctx.body = await ctx.service.topics.list({
      page: ctx.query.page,
      tab: ctx.query.tab,
      limit: ctx.query.limit,
      mdrender: ctx.query.mdrender !== 'false',
    });
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.topics.show({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
  }

  async create() {
    const ctx = this.ctx;
    // 校验`ctx.request.body` 是否符合预期格式
    // 如果未通过则返回 422 状态码
    ctx.validate(this.createRule, ctx.request.body);

    // 调用 service 创建一个 topic
    const id = await ctx.service.topics.create(ctx.request.body);

    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;

    ctx.validate(this.createRule, ctx.request.body);
    await ctx.service.topics.update(Object.assign({ id }, ctx.request.body));
    ctx.status = 204;
  }
}

module.exports = TopicController;
