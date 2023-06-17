---
slug: token
title: 4. 权限认证
tags: [简介, 课程分享,期末速成]
---

# 权限认证

## 第一部分:原理解析



1. Cookie:
   - Cookie是一种存储在用户浏览器中的小型文本文件，由服务器发送给浏览器，并在后续请求中被浏览器自动附加到请求头中。
   - Cookie通常用于记录用户的身份认证信息或跟踪用户的会话状态。
   - 服务器可以通过设置Cookie的过期时间、域和路径来控制其有效性和访问范围。
   - 使用Cookie需要考虑安全性，例如将Cookie标记为HttpOnly以防止客户端脚本访问它。
2. Session:
   - Session是在服务器端存储用户会话数据的一种机制。每个会话都有一个唯一的会话ID，通常以Cookie的形式存储在用户浏览器中。
   - 服务器使用会话ID来查找和检索与特定用户相关联的会话数据。
   - 会话数据可以存储在服务器的内存、数据库或其他持久化介质中。
   - 会话提供了一种无状态HTTP协议的有状态扩展机制，使得服务器可以跟踪和识别每个用户的请求。
3. Token:
   - Token是一种轻量级的身份验证机制，它是一个包含用户身份信息和其他数据的字符串。
   - Token通常使用加密算法进行签名，以确保其完整性和安全性。
   - 与Cookie和Session不同，Token是无状态的，服务器不需要存储任何会话数据。每个请求都包含一个Token，服务器可以通过验证Token来识别和验证用户的身份。
   - Token可以在不同的客户端和服务器之间传递，例如在分布式系统或使用RESTful API的应用程序中。

应用场景：

- Cookie通常用于在用户浏览器中存储少量的身份认证信息，例如用户登录凭证、购物车数据等。
- Session适用于需要在服务器端存储大量会话数据的应用程序，例如用户登录信息、权限控制等。
- Token适用于跨多个客户端和服务器的应用程序，例如移动应用、单页应用（SPA）或API服务，因为它们可以轻松地在不同系统之间共享。



## 第二部分:Cookie使用方法


### 2.1 方法

:::info
Koa原生已经提供了Cookie的设置方法，即为：
- `ctx.cookies.get(name, [options])` 读取上下文请求中的cookie
- `ctx.cookies.set(name, value, [options])` 在上下文中写入cookie
:::

### 2.2 小案例


``` js
const Koa = require('koa')
const app = new Koa()


app.use( async ( ctx ) => {

  if ( ctx.url === '/login' ) {
    ctx.cookies.set(
      'cookieId', 
      'hello world',
      {
        maxAge: 12 * 60 * 1000, // cookie有效时长
        expires: new Date('2023-03-20'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
        domain: '',  // 写cookie所在的域名
        path: '/login',       // 写cookie所在的路径
      }//cookie的配置信息
    )
    ctx.body = 'success CookieOk'
  } else {
    ctx.body = '404' 
  }

})

app.listen(7005, () => {
  console.log('服务器启动-------7005')
})


```




## 第三部分:Session应用方法










## 第四部分:Token应用方法


:::tip
有两个较好的选择，一个`jsonWebToken`,一个`koa-jwt`

1. `koa-jwt`只能在项目的前置结构统一设置权限返回和数据处理，不能单独逻辑jwt的设置与解析
2. `jsonWebToken`却可以直接在单独的逻辑控制器中对jwt设置与解析（所以本项目使用这个进行）
:::


### 4.1 使用：

:::note
签署jwt使用的是sign方法，而鉴权方式使用的是verify方法
:::


#### 4.1.1 sign方法
```js
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

**参数说明**：

- payload: 载荷，通常是一个包含用户数据的对象。
- secretOrPrivateKey: 密钥或私钥，用于对令牌进行签名和验证。这可以是一个字符串或缓冲区。
- options（可选）: 一个包含额外选项的对象，用于配置生成令牌的行为。
- callback（可选）: 一个回调函数，用于异步操作。

**下面是一些常用的options选项**：

- expiresIn: 令牌的有效期。可以是一个表示时间段的字符串（例如：'1h'表示1小时，'7d'表示7天），也可以是一个表示秒数的数字。
- algorithm: 用于签名和验证令牌的算法。常用的有'HMACSHA256'、'HS384'、'HS512'等。
- issuer: 发行者的名称。
- subject: 主题的名称。
- audience: 受众的名称。
- notBefore: 令牌在此日期之前无效。
- jwtid: 令牌的唯一标识符。


#### 4.1.2 verify方法

```js
jwt.verify(token, secretOrPublicKey, [options, callback])
```

**参数说明**：

- token: 要验证的JWT令牌。
- secretOrPublicKey: 密钥或公钥，用于验证令牌的签名。这可以是一个字符串或缓冲区。
- options（可选）: 一个包含额外选项的对象，用于配置验证令牌的行为。
- callback（可选）: 一个回调函数，用于异步操作。

**下面是一些常用的options选项**：

- algorithms: 允许使用的算法列表。默认情况下，它将尝试使用所有支持的算法。
- issuer: 发行者的名称。
- subject: 主题的名称。
- audience: 受众的名称。
- clockTolerance: 时钟偏差容忍度（以秒为单位），用于验证令牌的'exp'和'nbf'声明。
- ignoreExpiration: 是否忽略令牌的过期时间。
- ignoreNotBefore: 是否忽略令牌的生效时间。





### 4.2 小案例：
```js
//设置的小案例设计了两个方法，集中处理token问题，暴露函数使控制器或其他调用即可
const jwt = require('jsonwebtoken');

// 设置JWT令牌并返回给前端
const setToken = (ctx, payload) => {
  const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  ctx.body = {
    token
  };
};

// 验证JWT令牌并获取令牌中的数据
const verifyToken = (ctx, next) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = {
      error: 'Authorization header is required'
    };
    return;
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    ctx.state.user = decoded;
    return next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      error: 'Invalid token'
    };
  }
};

module.exports = {
  setToken,
  verifyToken
};

```



```js
//在其他处理函数中调用

const Router = require('koa-router');
const { setToken, verifyToken } = require('./auth');

const router = new Router();

// 设置JWT令牌并返回给前端
router.post('/login', async (ctx) => {
  // 处理登录逻辑，获取用户数据
  const user = {
    id: 1,
    username: 'example_user'
  };

  // 设置JWT令牌并返回给前端
  setToken(ctx, user);
});

// 需要验证JWT令牌的受保护路由
router.get('/protected', verifyToken, async (ctx) => {
  // 获取令牌中的用户数据
  const user = ctx.state.user;

  // 处理受保护路由的逻辑
  ctx.body = {
    message: 'Protected route',
    user
  };
});

module.exports = router;

```




## 第四部分:总结对比

| 方面       | Cookie             | Session             | Token                        |
| ---------- | ------------------ | ------------------- | ---------------------------- |
| 存储位置   | 客户端浏览器       | 服务器端            | 客户端                       |
| 数据存储   | 在文本文件中       | 在服务器内存/数据库 | 在字符串中                   |
| 存储容量   | 通常4KB左右        | 无限制              | 可变，但通常较短             |
| 安全性     | 需要设置安全标志   | 相对较安全          | 通过加密签名提供更高的安全性 |
| 隐私       | 可以存储敏感信息   | 可以存储敏感信息    | 可以存储有限的敏感信息       |
| 跨域       | 受同源策略限制     | 受同源策略限制      | 跨域通信便捷                 |
| 扩展性     | 有限               | 有限                | 高                           |
| 服务器负载 | 无                 | 有                  | 无                           |
| 使用场景   | 身份认证、跟踪状态 | 用户会话管理        | 分布式应用、API身份验证 SPA      |

