---
slug: view
title: 6. 视图层
tags: [简介, 课程分享,期末速成]
---

# 视图层（模板引擎）

:::tip
实际应用场景不大，koa一般都用于前后端分离的场景
:::

## 第一部分：使用视图

### 1.1 引入依赖

```bash
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs
```

:::tip
视图文件ejs统一放到一个view文件夹中
目录结构如下面所示：

```
├── package.json
├── index.js
└── view
    └── index.ejs
```

:::


### 1.2写EJS模板

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p> Welcome to the world of ejs <%= title %></p>
</body>
</html>
```

### 1.3 使用EJS模板

```js
//是在index.js中写的
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'ejs view'
  await ctx.render('index', {
    title,
  })
})

app.listen(7005)
```


