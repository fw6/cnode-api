# cnode-api

## 响应格式

### 获取主题列表

- `GET api/v2/topics`
- 响应状态码: 200
- 响应体:
  ```json
  [
    {
      "id": "57ea257b3670ca3f44c5beb6",
      "author_id": "541bf9b9ad60405c1f151a03",
      "tab": "share",
      "content": "content",
      "last_reply_at": "2017-01-11T13:32:25.089Z",
      "good": false,
      "top": true,
      "reply_count": 155,
      "visit_count": 28176,
      "create_at": "2016-09-27T07:53:31.872Z"
    },
    {
      "id": "57ea257b3670ca3f44c5beb6",
      "author_id": "541bf9b9ad60405c1f151a03",
      "tab": "share",
      "content": "content",
      "title": "《一起学 Node.js》彻底重写完毕",
      "last_reply_at": "2017-01-11T10:20:56.496Z",
      "good": false,
      "top": true,
      "reply_count": 193,
      "visit_count": 47633
    }
  ]
  ```

### 获取单个主题

- `GET /api/v2/topics/:id`
- 响应状态码: 200
- 响应体:
  ```json
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "author_id": "541bf9b9ad60405c1f151a03",
    "tab": "share",
    "content": "content",
    "title": "《一起学 Node.js》彻底重写完毕",
    "last_reply_at": "2017-01-11T10:20:56.496Z",
    "good": false,
    "top": true,
    "reply_count": 193,
    "visit_count": 47633
  }
  ```

### 创建主题

- `POST /api/v2/topics`
- 响应状态码: 201
- 响应体:
  ```json
  {
    "topic_id": "57ea257b3670ca3f44c5beb6"
  }
  ```

### 更新主题

- `PUT /api/v2/topics/57ea257b3670ca3f44c5beb6`
- 响应状态码: 204
- 响应体: 空

### 错误处理

```json
{
  "error": "Validation Failed",
  "detail": [
    { "message": "required", "field": "title", "code": "missing_field" }
  ]
}
```

## REST 风格 URL 定义

`Egg`提供了`app.resources('routerName', 'pathMatch', controller)`快速在一个路径上生成`CRUD`路由结构

```js
module.exports = app => {
  const { router, controller } = app
  router.resources('posts', '/api/posts', controller.posts)
  router.resources('users', '/api/v1/users', controller.v1.users)
}
```

| Method | Path            | Routh Name | Controller.Action            |
| :----: | :-------------- | :--------- | :--------------------------- |
|  GET   | /posts          | posts      | app.controllers.posts.index  |
|  GET   | /posts/new      | new_posts  | app.controllers.posts.new    |
|  GET   | /post:id        | post       | app.controllers.posts.show   |
|  GET   | /posts/:id/edit | edit_post  | app.controllers.posts.edit   |
|  POST  | /posts          | posts      | app.controllers.posts.create |
|  PUT   | /post/:id       | post       | app.controllers.posts.update |
| DELETE | /post/:id       | post       | app.controllers.destroy      |

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

[egg]: https://eggjs.org
