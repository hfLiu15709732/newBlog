---
slug: Fetch
title: Fetch基础与项目封装
tags: [Fetch,网络通信,Ajax]
---

# Fetch的基础与项目封装

## 第一部分：理论介绍

:::tip
首先，fetch 是一种用于客户端与服务器之间进行数据交互的 API，类似Ajax
:::

### 1.1 Fetch的优势

1. 更加灵活：相比传统的 XMLHttpRequest（XHR）对象，fetch 更加灵活。它可以使用 promise 进行异步操作，也可以使用 async/await 进行同步操作，代码更加简洁易懂。

2. 更好的可读性：fetch 接口设计简单明了，其 API 易于使用，使得代码更加易懂。fetch 请求的语义化更加直观，代码看起来更加整洁。

3. 更加安全：fetch 请求默认不会发送任何 cookies 和身份验证信息，这可以帮助防止跨站点请求伪造（CSRF）攻击。此外，fetch 请求使用的是 Promise 对象，相比 XHR 的事件处理函数，可以更好地处理错误和异常。

4. 更加高效：fetch 请求可以使用缓存，从而减少服务器的请求次数。此外，fetch 请求可以并行发送，从而提高请求的并发性能。


### 1.2 Fetch与Ajax


| 特性           | Fetch                                                        | Ajax                                                      |
| -------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 请求方式       | 使用 `fetch()` 方法发送请求                                  | 使用 `XMLHttpRequest` 对象发送请求                        |
| 语法简洁性     | 使用 Promise 对象进行异步操作，代码更加简洁易懂              | 代码冗长，容易出错                                        |
| 异常处理       | 抛出异常，可以使用 `try...catch` 处理                        | 通过事件处理函数处理                                      |
| 处理 JSON 数据 | 使用 `response.json()` 方法处理 JSON 数据                    | 需要手动解析 JSON 数据                                    |
| 支持的数据类型 | 支持发送和接收多种数据类型，包括 JSON、FormData 等           | 支持发送和接收 XML 和文本数据，但需要手动设置 HTTP 头部   |
| 安全性         | 默认不会发送 cookies 和身份验证信息，可以防止跨站点请求伪造（CSRF）攻击 | 可能会发送 cookies 和身份验证信息，需要手动设置 HTTP 头部 |
| 缓存机制       | 可以使用缓存，减少服务器的请求次数                           | 缓存机制较为复杂                                          |
| 并发性能       | 可以并行发送请求，提高请求的并发性能                         | 仅支持串行发送请求                                        |



## 第二部分：Fetch的基础使用

### 2.1 Fetch发起Get请求
:::tip
首先，要知道Fetch默认不指定类型 发起的请求就是Get请求
:::

```js
  const getDataByFetchDefault=()=>{
    fetch(" https://mock.presstime.cn/mock/6491a9d23acfaff9262aec80/base/getArtileList")
    .then((response)=>{
      return response.json()
    })
    .then((value)=>{
      console.log(value);
    })
    .catch((err)=>{console.log("出错啦"+err);})
  }

```

### 2.2 Fetch发起Post请求

:::danger 注意！
Fetch发起post请求 两个参数分别是通信的URL地址，一个是配置项参数（对象形式）
:::

**配置项参数解析**：

| 参数             | 类型                                                         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `method`         | 字符串                                                       | HTTP 请求方法，必须为 `"POST"`。                             |
| `headers`        | 对象或 Headers 对象                                          | 请求头信息，包括 Content-Type、Authorization 等。如果是对象，则需要手动设置 Content-Type 为 `"application/json"` 或其他格式。如果是 Headers 对象，则可以使用其 API 添加请求头信息。 |
| `body`           | 字符串、BufferSource、FormData、URLSearchParams 或 ReadableStream | 请求体信息，可以是字符串、BufferSource、FormData、URLSearchParams 或 ReadableStream 类型。如果是 JSON 数据，则需要先使用 `JSON.stringify()` 方法将其转换为字符串格式。如果是其他格式，则需要手动设置 Content-Type。 |
| `mode`           | 字符串                                                       | 请求模式，包括 `"cors"`、`"no-cors"`、`"same-origin"`。默认为 `"cors"`，表示跨域请求。 |
| `cache`          | 字符串                                                       | 缓存模式，包括 `"default"`、`"no-store"`、`"reload"`、`"no-cache"`、`"force-cache"`、`"only-if-cached"`。默认为 `"default"`。 |
| `credentials`    | 字符串                                                       | 跨域请求时是否发送 cookies，包括 `"omit"`、`"same-origin"`、`"include"`。默认为 `"same-origin"`，表示仅在当前域名下发送 cookies。 |
| `redirect`       | 字符串                                                       | 重定向模式，包括 `"follow"`、`"error"`、`"manual"`。默认为 `"follow"`。 |
| `referrer`       | 字符串                                                       | 请求来源地址，可以是 `""`、`"no-referrer"`、`"client"` 或请求来源地址。默认为 `"client"`。 |
| `referrerPolicy` | 字符串                                                       | 请求来源策略，包括 `"no-referrer"`、`"no-referrer-when-downgrade"`、`"same-origin"`、`"origin"`、`"strict-origin"`、`"origin-when-cross-origin"`、`"strict-origin-when-cross-origin"`。默认为 `"no-referrer-when-downgrade"`。 |
| `integrity`      | 字符串                                                       | 请求时需要验证的资源完整性值，可以是 sha256、sha384 或 sha512 等。 |




**当配置项较少时可以这样写**：

```js

  const getDataByFetchPost=()=>{
    var mockData = [
      {userName:"ppd",age:20},
      {userName:"lld",age:23},
      {userName:"aad",age:28},
    ];

    fetch(" https://mock.presstime.cn/mock/6491a9d23acfaff9262aec80/base/getSchoolList",{method:"post",body:mockData})
    .then((response)=>{
      return response.json()
    })
    .then((value)=>{
      console.log(value);
    })
    .catch((err)=>{console.log("出错啦"+err);})
  }


```


**当配置项很多时可以这样写**：



```js


const  myInitSeries={

  body: JSON.stringify(data), 
  cache: 'no-cache', 	
  credentials: 'same-origin',  
  headers: {	
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json',
    'Authorization': `token_data`
  },
  method: 'POST', 
  mode: 'cors', 
  redirect: 'follow', 
  referrer: 'no-referrer',
}

  const getDataByFetchPost=()=>{
    var mockData = [
      {userName:"ppd",age:20},
      {userName:"lld",age:23},
      {userName:"aad",age:28},
    ];

    fetch(" https://mock.presstime.cn/mock/6491a9d23acfaff9262aec80/base/getSchoolList",myInitSeries)
    .then((response)=>{
      return response.json()
    })
    .then((value)=>{
      console.log(value);
    })
    .catch((err)=>{console.log("出错啦"+err);})
  }

```




### 2.3 Fetch文件传输


```js

  const getDataByFetchFormData=()=>{
    var formData = new FormData();
    var fileField = document.querySelector("input[type='file']");// 获取<input type="file" /> 元素
    
    formData.append('username', 'lllpdd');
    formData.append('fileList', fileField.files[0]);
    
    fetch(" https://mock.presstime.cn/mock/6491a9d23acfaff9262aec80/base/getSchoolList",{method:"post",body:formData})
    .then((response)=>{
      return response.json()
    })
    .then((value)=>{
      console.log(value);
    })
    .catch((err)=>{console.log("出错啦"+err);})
  }


```


## 第二部分：Fetch的二次封装




### 3.1 主要代码


```js


import fetch from 'fetch';
import { message, notification } from 'antd';


//基础请求路径
const baseURL = '/api';

// 请求返回状态码
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


const checkStatus = response => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;


  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

//格式化参数
const parseQuery = (obj) => {
  let str = ''
  for (let key in obj) {
    const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key]
    str += '&' + key + '=' + value
  }
  return str.substr(1)
}

//请求响应后，将response的所有数据转换成json，客户端就可以拿到以json格式响应的所有数据
const parseJSON = (response) => {
  return response.json();
}



const request = (url,params, options) => {
  // 检验登录或相关什么的操作
  const { method,headers } = options;



  const defaultOptions = {
    // 允许跨域携带资源凭证,发送cookies
    //   - include：无论同源不同源都可以
    //   - same-origin：同源可以，默认值 √
    //   - omit：都拒绝
    credentials: 'include',
    mode: 'cors',
    // 设置请求头
  };


  options.headers = {
      Accept: 'application/json',// 添加携带的数据格式，这个根据需求填写
      'Content-Type': 'application/json; charset=utf-8',
      //Authentication: window.sessionStorage.getItem('jwToken'),//添加鉴权Token
      ...headers,//合并配置项
    }


   if (method === 'GET' && params) {
    url += '?' + parseQuery(params)
   } 



   else {
       // 读取传入的数据格式类型，不是表单数据使用JSON库进行格式化
      options.body = JSON.stringify(params);
  }
  const newOptions = { ...defaultOptions, ...options };

  /**
   * 全部配置好之后，最后使用fetch发起一个请求，它本身需要传入一个url和一个options
   */
   return fetch(baseURL + url, newOptions)
    .then(checkStatus)//状态检验
    .then(parseJSON)//转化为json格式（转完还是promise格式）
    .then(data => data)//等待resolve至json格式的真数据


    .catch(err => {
        // 服务器没有响应才会跳转到这里
        if (!window.navigator.onLine) {
        // 断网处理
        // ...
        return;
      }
    // 什么都没有，返回一个错误
      return Promise.reject(err);
    });
};


export const Http={
  // GET的请求
  get: async function (url, params , ownOptions = { method: 'GET',headers: {}}) {
    return await request(url, params,ownOptions );
  },
  // POST请求
  post:async function (url, params = {},ownOptions = { method: 'POST', headers: {}, body: {}}) {
    return await request(url, params,ownOptions );
  }
}




```






### 3.2 分布解析
