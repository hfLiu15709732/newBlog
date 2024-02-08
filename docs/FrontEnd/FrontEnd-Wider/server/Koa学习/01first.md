---
slug: first
title: 1. 理论与快速开始
tags: [简介, 课程分享,期末速成]
---

# 理论与快速开始

![](https://www.ruanyifeng.com/blogimg/asset/2017/bg2017080801.png)

## 第一部分：理论简介：

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，**通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套**，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。



## 第二部分：快速入门Koa框架：

**创建Koa框架整体分为四步：**

1. 导入Koa包
2. 实例化基于koa的对象app
3. 编写相应中间件（配置路由）
4. 开启服务器监听



> **快速入门案例：**



```js
const Koa=require("koa");//导入koa包


const app=new Koa();//实例app对象

app.use((ctx)=>{
    ctx.body="Hello,I am Koa2";
})//编写中间件




app.listen(7005,()=>{
    console.log("Koa框架服务器已经启动-----7005");
})
```





## 第三部分：初步认识中间件与洋葱圈模型：



> **洋葱圈模型概念：先由最外层中间件逐层深入，执行next()之前的代码**
>
> **最后递归后回调，由最深层推出至最外层中间件，执行next()之后的代码**



![](https://tse3-mm.cn.bing.net/th/id/OIP-C.cGJ5OCf6sMr9egqC6smZ7AHaGv?pid=ImgDet&rs=1)

### 3.1 相关代码小案例：（洋葱圈模型的代码还未上传）

```js
const Koa=require("koa");

const app=new Koa();

app.use((ctx,next)=>{·
    console.log("我是第一中间件");
    next();
})
.use((ctx,next)=>{
    console.log("我是第二中间件");
    next();
})
.use((ctx,next)=>{
    console.log("我是第三中间件");
    ctx.body="hahaha";
})


app.listen(7005,()=>{
    console.log("启动成功");
})
```





### 3.2 异步数据处理（相较于express最大的差异点）

> **重点：可以使用Async await 关键字进行异步等待操作**





```js
const { default: axios } = require("axios");
const Koa=require("koa");

const app=new Koa();

app.use(async(ctx,next)=>{
    ctx.score=100;
    await next();
})
.use(async(ctx,next)=>{
    await axios.get("https://apii.hfliu.com/default/default/getArticleList")//个人博客网站的后端接口
    .then((val)=>{
        ctx.list=val.data
        console.log(val.data);
    })
    next();
})//进行数据请求或与数据库的交互操作


.use(async(ctx,next)=>{

    console.log(1111);
     ctx.body=ctx.list

})
//中间件的编写支持链式调用

app.listen(7005,()=>{
    console.log("启动成功");
})
```


**从上述例子可以看出 async/await 的特点**：

- 异步逻辑的代码用同步写法实现
- 使用多层 async function 的同步写法代替传统的callback回调嵌套
- 最底层的await返回需要是Promise对象形式
