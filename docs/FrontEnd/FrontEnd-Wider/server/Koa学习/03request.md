---
slug: request
title: 3. 网络请求
tags: [简介, 课程分享,期末速成]
---

# 网络请求


:::tip
主要的目的在于获取更种请求格式传来的数据
:::

:::info
和express框架一样，不直接支持解析post请求体数据，需要使用koa-bodyparser这个库
:::

## 第一部分：原理解析



- 1.get请求数据获取
  - 请求对象ctx.request.query，返回对象如 { school:'zjutuser', age:20 }
  - 请求字符串 ctx.request.querystring，返回如 school='zjutuser'&age=20
- 2.post数据请求获取:
  - 请求对象ctx.request.body，返回如 { school:'zjutuser', age:20 }


  
:::info
get请求的参数获取也可以是通过ctx.query与ctx.querystring
:::

## 第二部分：小案例



```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url


  // 获取get请求数据
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

    //get或者是下面这样
    // let ctx_query = ctx.query
    //let ctx_querystring = ctx.querystring
  
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})


app.use( async ( ctx ) => {
  let url = ctx.url

  let req_data=ctx.request.body; 
  
  ctx.body = {
    url,
    req_data,
  }
})

app.listen(7005, () => {
  console.log('服务器开启------7005')
})


```

:::danger
上面仅是一个例子展示获取数据（没区分路由），项目中要先区分路由映射在走controller中获取
:::
