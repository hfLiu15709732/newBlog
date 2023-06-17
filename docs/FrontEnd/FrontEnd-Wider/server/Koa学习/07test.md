---
slug: test
title: 7. 测试单元
tags: [简介, 课程分享,期末速成]
---

# 测试单元

:::info
对于一些相对复杂的项目来说，频繁的人工调试测试太麻烦与繁琐了，于是可采用自动化测试的方案进行
其中mocha/jasmine都是不错的测试框架库
:::



## 第一部分：安装依赖

```bash
npm install --save-dev mocha chai supertest
```

:::tip
其中的框架：
- mocha 模块是测试框架
- chai 模块是用来进行测试结果断言库，比如一个判断 50 + 100 是否等于 150
- supertest 模块是http请求测试库，用来请求API接口
:::


## 第二部分:准备工作

### 2.1 基本目录结构

```sh
.
├── index.js # api文件
├── package.json
└── test # 测试目录
    └── index.test.js # 测试用例
```


### 2.2 写测试环境


```js
const Koa = require('koa')
const app = new Koa()

const server = async ( ctx, next ) => {
  let result = {
    success: true,
    data: null
  }

  if ( ctx.method === 'GET' ) { 
    if ( ctx.url === '/getString.json' ) {
      result.data = 'this is string data'
    } else if ( ctx.url === '/getNumber.json' ) {
      result.data = 123456
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else if ( ctx.method === 'POST' ) {
    if ( ctx.url === '/postData.json' ) {
      result.data = 'ok'
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else {
    ctx.body = 'hello world'
    next && next()
  }
}

app.use(server)

module.exports = app

app.listen(7005, () => {
  console.log('服务器启动-------7005')
})

```


## 第三部分：开始测试

### 3.1写测试文件

```js
const supertest = require('supertest')
const chai = require('chai')
const app = require('./../index')

const expect = chai.expect
const request = supertest( app.listen() )

// 测试套件/组
describe( '开始测试demo的GET请求', ( ) => {
  
  // 测试用例
  it('测试/getString.json请求', ( done ) => {
      request
        .get('/getString.json')
        .expect(200)
        .end(( err, res ) => {
            // 断言判断结果是否为object类型
            expect(res.body).to.be.an('object')
            expect(res.body.success).to.be.an('boolean')
            expect(res.body.data).to.be.an('string')
            done()
        })
  })
})
```
### 3.2执行方法

```sh
# node.js = 7.6.0
./node_modules/.bin/mocha


# node.js <= 7.5.x
./node_modules/.bin/mocha  --harmony
```


:::tip
**服务入口加载**

如果要对一个服务的API接口，进行单元测试，要用supertest加载服务的入口文件

```js
const supertest = require('supertest')
const request = supertest( app.listen() )
```

**测试套件、用例**

- describe()描述的是一个测试套件
- 嵌套在describe()的it()是对接口进行自动化测试的测试用例
- 一个describe()可以包含多个it()

```js
describe( '开始测试demo的GET请求', ( ) => {
    it('测试/getString.json请求', () => {
        // TODO ...
    })
})
```

- supertest封装服务request，是用来请求接口
- chai.expect使用来判断测试结果是否与预期一样
- chai 断言有很多种方法，这里只是用了数据类型断言  


:::

## 第四部分:参考

[Koa-note](https://github.com/chenshenhai/koa2-note)


