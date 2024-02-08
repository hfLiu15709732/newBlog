---
slug: router
title: 2. 路由部分
tags: [简介, 课程分享,期末速成]
---

# 路由配置

:::tip
在koa中，路由配置最基础可以采用ctx.request.url判断进行处理，但对于项目来说，太麻烦与繁琐了，于是引入中间件Koa-router
:::

## 第一部分：安装koa-router


```sh
# koa2 对应的版本是 7.x
npm install koa-router
或者

yarn add koa-router
```


## 第二部分：使用的小案例



```js

const Koa = require('koa')

const app = new Koa()

const Router = require('koa-router')

let loginRouter = new Router()

// 创建子路由1
loginRouter.get('/', async ( ctx )=>{
  let html = `
  <strong>hahaha,登录页</strong>
  `
  ctx.body = html
})

// 创建子路由2
let detailPage = new Router()
detailPage
    .get('/hello', async ( ctx )=>{
    ctx.body = 'hello world'
    .get('/404', async ( ctx )=>{
    ctx.body = '404 寄了'
})
})

// 构建总路由，装载子路由
let router = new Router()
router.use('/', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/detailPage', detailPage.routes(), detailPage.allowedMethods())


// koa实例挂载路由中间件
app.use(router.routes()).use(router.allowedMethods())


app.listen(7005, () => {
  console.log('服务器启动-----7005')
})

```
