---
slug: mvc
title: 8. 简易MVC框架构建
tags: [简介, 课程分享,期末速成]
order: 1
---
# 构建基本的MVC项目

:::tip
全部的原码放到github上了
🔗链接：[koa-template](https://github.com/hfLiu15709732/koa_template)
:::

## 第一部分:项目结构

### 1.1树状表示

```sh
└── app
    └── controllers
        ├── UserController.js
        └── ...
    └── models
        ├── User.js
        └── ...
    └── services
        ├── UserService.js
        └── ...
└── config
    ├── database.js
    ├── schedule.js
    └── ...
└── middleware
    ├── authentication.js
    ├── logging.js
    └── ...
└── routes
    ├── user.js
    └── ...
└── schedule
    ├── dbBack.js
    └── ...
└── utils
    ├── validation.js
    └── ...
├── app.js
└── package.json

```


### 1.2具体解释
- controllers 目录存放控制器文件，负责处理请求和返回响应。
- models 目录存放模型文件，定义数据结构和与数据库交互的方法。
- services 目录存放服务层文件，封装业务逻辑，供控制器调用。
- config 目录存放配置文件，如数据库配置、定时任务配置等。
- middleware 目录存放中间件文件，用于处理各种请求前或请求后的逻辑。
- routes 目录存放路由文件，定义API接口及其对应的处理函数。
- schedule 目录存放定时任务文件，实现定时执行的任务逻辑。
- utils 目录存放工具函数或类文件，提供项目中需要的公共功能。
- app.js 是应用的入口文件，启动Koa应用并配置中间件、路由等相关设置。



## 第二部分:入口文件构建

:::tip
注释很详细了，应该不用专门解释了
:::

```js
const Koa = require("koa")//引入koa
const {koaBody}=require("koa-body");//解析请求体数据
const cors=require("koa-cors");//路由跨域解决
const helmet=require("koa-helmet");//一般性网络攻击阻截
const router = require('./router/FrontEndRouter')//引入路由管理文件
const config=require("./config/defaultConfig")//引入默认设置文件
const app = new Koa()//创建Koa服务器实例

app.use(koaBody())//注册请求体解析库
app.use(cors());//解决跨域请求的中间件
app.use(helmet());//解决基本的网络攻击，如：xss，sql注入






router(app)//注册路由

app.listen(config.runningPort, () => {
  console.log(`服务器启动，运行在：http://localhost:${config.runningPort}`)
})//启动服务器在7002端口


```
## 第三部分:路由文件构建
:::tip
由入口文件，最调用的就是路由文件 所有先弄他，

同时：路由文件会包含多个路由文件，分离接口请求，下面实在Frontend_Route.js 即为专门处理前台的路由接口映射
:::

**代码如下**：

```js
const router = require('koa-router')()

const HomeController = require("../controller/home")
const Login_Controller = require("../controller/FrontEnd_Login")
const FrontEnd_Login_Controller=require("../controller/FrontEnd_Login");
const FrontEnd_Common_Controller=require("../controller/FrontEnd_Common");
const loginBaseURL="/frontend/login";
const commonBaseURL="/frontend/common";


module.exports = (app) => {
    //根据不同的url映射，分配到对应控制器上去
  router.post( `${loginBaseURL}/register/email`, Login_Controller.registerByEmail )
  router.post( `${loginBaseURL}/username`,Login_Controller.loginByUserName)
  router.post( `${loginBaseURL}/email`, Login_Controller.loginByEmail)

  router.post( `/`, HomeController.index)
  router.post( `/home`, HomeController.home)
  
  app.use(router.routes())
     .use(router.allowedMethods())
}
//

```

## 第四部分:控制器构建

:::tip
由路由映射直接分配的就是控制器目录，所有然后搞他

同时：控制器文件会包含多个控制器文件，分离逻辑处理，而往往会分的比route文件夹更细，例如前台的请求会再分为登录/注册模块  用户数据请求模块  表格数据请求模块等等，后台又分为登录/注册模块....这样子。
:::


```js
const FrontEnd_Login_Service = require('../service/FrontEnd_Login_Service')

module.exports = {
  loginByUserName: async(ctx, next) => {
    //用户名登录处理的逻辑函数
    console.log(ctx.request.body);
    console.log(ctx.request.body);

    ctx.response.body = "success"
  },
  loginByEmail: async(ctx, next) => {
    //邮箱登录处理的逻辑函数
    console.log(ctx.request.body);

    ctx.response.body = "success"
  },

  registerByEmail: async(ctx, next) => {
    //邮箱注册处理的逻辑函数
    const {userName,password,email}=ctx.request.body;
    let db_result=await FrontEnd_Login_Service.getUserInfoByUserName(userName);
    if(db_result.cnt!=0){
        //已经有了此用户，不允许注册
      
    }
    else{
      //没有此用户，允许注册
      let store_data={username:userName,password,email,comments:"无信息"};
      let store_result=await FrontEnd_Login_Service.addingUserByEmail(store_data);
      console.log(store_result);
      
    }
    ctx.response.body = "success"
  },


}

```

## 第五部分:设置部分构建

:::tip
下面两个分别是关于数据库连接池的配置与统一错误返回的配置
:::

```js title="数据库连接池的设置"
const pg = require('pg');
const Pool = require('pg-pool');
const databaseConfig={
    user: 'opengaussuser',
    password: 'openGauss@123',
    host: '192.168.163.128',
    port: 26000,
    database: 'liuhf_db_uni'
}
const pool=new Pool(databaseConfig)
//上面是建立数库连接池，将连接池暴露出去即可供service层使用


module.exports = {
    pool:pool,
    runningPort:7002,
    jwt_session_key:`prod_secret_1685715082`,

    

  }
```


```js title="统一JSON格式错误返回配置"

module.exports = {
    successFormat:(code="200",msg=`success`,data)=>{
        return {
            code,
            msg,
            data,
        }

    },
    commonErrorFormat:(code="500",msg=`service-error`,data)=>{
        return {
            code,
            msg,
            data,
        }
    },
    verifyErrorFormat:(code="401",msg=`token-error`,data)=>{
        return {
            code,
            msg,
            data,
        }
    }
    

  }
```


## 第六部分:services构建

:::tip
同理：由控制器在调用的就是服务器关联部分

还是同理，sevvices文件会包含多个services文件，分离数据库关联，根据实际需求分就行了，

还有就是，这个模板项目连接的是OpenGauss（pg）数据库  不是mysql，把这部分换成上面数据库讲的就ok了
:::

```js
const pg = require('pg');
const defaultConfig = require('../config/defaultConfig');
const {pool}=defaultConfig;

module.exports = {


    addingUserByEmail: async(storeObj) => {
        const client=await pool.connect();//请求连接池连接（连接池已经维持了数据库的连接）
        let sql=`INSERT INTO zjutuser.userTab (username,password,email,comments) VALUES ('${storeObj.username}','${storeObj.password}','${storeObj.email}','${storeObj.comments}');`;
        console.log(sql);
        let result=await client.query(sql);
        return {resultArr:result.rows,cnt:result.rowCount}

    },

    getUserInfoByUserName:async(username)=>{

        const client=await pool.connect();//请求连接池连接（连接池已经维持了数据库的连接）

        let sql=`select * from zjutuser.userTab WHERE username='${username}'`;
        let result=await client.query(sql);
        return {resultArr:result.rows,cnt:result.rowCount}
        

    },

    getUserInfoByEmail: async(name, pwd) => {

    },

  }

```


## 第七部分:中间件构建


## 第八部分:定时任务构建

:::tip
除非有特殊的需求，一般都是入口文件直接调用定时任务 例如网站/数据库日志记录，数据库定时备份
:::

```js title="以数据库定时备份为例"
//每种数据库的定时备份写的语句不一样，这里以postgres为例
const schedule=require("node-cron");
const defaultConfig=require("../config/defaultConfig");
const { data } = require("cheerio/lib/api/attributes");
const {pool}=defaultConfig;
const client=pool.connect();


schedule.schedule('0 0 */1 * *', async ()=>{
    const result=await client.query('BACKUP DATABASE TO \'/root/backup.sql\'');

    const TimeStamp=new Date().getTime();
    console.log(`数据库备份成功！ 记录时间戳：${TimeStamp}`);

    await client.release();
})


module.exports={
    schedule:{
        affair:"backup",
        type:"working",
    }
}
```
