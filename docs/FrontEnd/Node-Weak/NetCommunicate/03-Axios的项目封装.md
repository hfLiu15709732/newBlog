---
slug: axios—_prj
title: Axios项目封装
tags: [Axios,网络通信,Ajax]
---

# 使用Axios封装集中式网络请求库


## 第一部分：理论介绍
### 1.1作用（为什么）：

1. **代码简洁易懂：**通过集中式管理网络请求，可以减少重复的代码和逻辑，使代码更加简洁易懂。
2. **维护方便：**所有的网络请求都放在同一个地方进行管理，方便维护和修改，也可以统一处理异常情况。
3. **功能强大：**Axios支持多种HTTP请求方式，如GET、POST、PUT和DELETE等，还能设置请求头、响应拦截器等功能，使得开发人员可以很方便地定制请求参数和处理响应数据。
4. **可扩展性强：**通过封装Axios，可以方便地实现对于不同API接口的调用，同时也方便地扩展其他网络请求库，如fetch等。
5. **提高效率：**通过集中式管理网络请求，可以提高开发效率，避免因为网络请求的散乱而导致开发效率降低。


### 1.2 需要完成的步骤：

1. **配置请求的统一拦截器：**需要对请求用户进行第一层鉴权（token是否有/过期）
2. **配置相应的统一拦截器：**对相应的信息进行第一层处理与错误请求的拦截
3. **封装基本方法的函数：**（get/post方法等等）
4. **创建统一的请求对象：**（创建HTTP对象并将所封装的方法包含在内，并将HTTP暴露出去）
5. **构建URL的统一管理和基地址的配置**
6. **设计每个请求的对应方法：**实际的业务需求的函数，请求直接使用HTTP对象，URL直接找5所创建的地方
7. **业务函数暴露：**将所有业务函数构建成整体的业务请求对象，并将业务请求对象暴露出去，供组件调用



## 第二部分：使用Axios构建

### 2.1 构建请求封装文件

:::danger 注意：
其中第一部到第四部均可以在一个文件中构建,创建requestPackageing.jsx文件
:::


```js
//其中第一部到第四部均可以在一个文件中构建
//创建requestPackageing.jsx文件
import axios from "axios";
import msag from "./Response";
import { Notification } from "@douyinfe/semi-ui";
import ConstantTab from "./Constant";




axios.defaults.timeout = 100000;//设置超时信息
axios.defaults.baseURL = "127.0.0.1:7001/admin";//设置请求基地址


//基本上都是axios的封装与配置
//但本项目是对axios包装了两层（一层是axios的api，一层是统一处理一级封装函数）；留出更多处理数据的空间，也相对更规范些
//最终是将集中处理的函数默认暴露出去，直接在requestUse的集中请求文件中调用他即可
//没了解过可以看axios的中文文档：https://www.axios-http.cn/

/**
 * 第一步：   http 请求的统一拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const tokenJson = localStorage.getItem('token');
    if(tokenJson){
      //本项目的用户信息存储到localStorage里面了 也可以用store，因为一般登录后还是会将登录信息存到redux里面一份，
      //但不存到localsStorage的话，当前页面刷新时，redux中的内容会消失。
      const tokenStr=JSON.stringify(tokenJson);
      const {token,openID}=tokenStr;
      if(token&&Date.now()-openID<=3600000*2){
          config.headers.jwt_token = token //请求头加上token信息
      }
      //检验token是否存在，和openID是否过期（这里设的是2天，自己根据自己的项目改时间戳就行）
      else{
        Notification.error(ConstantTab.TokenExpireNotify)
      }
    }
    else{
      Notification.error(ConstantTab.TokenDisNotify)
    }

    return config
  },
  (error) => {
    
    //token没有或者已经过期了;这里做出处理(返回登录页并清除token信息)
    return Promise.reject(error);
  }
);






/**
 * 第二步：  http 响应的拦截器
 */
axios.interceptors.response.use(
  (response) => {
    //相应状态码在2XX以内会触发
    if (response.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    //响应状态码超出2XX会触发这里，如3XX 4XX 5XX;
    console.log("请求出错：", error);
  }
);


//第三部：   封装请求方法

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 * 
 * 注意 axios--get的参数要么接在url后面，要么包一个对象放后面
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(
        (response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}





//第四步：构建统一的HTTP请求对象

//统一接口处理，返回数据
/**
 * @param fetch 请求类型(get/post/put/patch)
 * @param url   请求路径（相对路径，基准路径在baseUrl已经设过
 * @param data  数据体
 * @returns {Promise}
 */
export default function (fecth, url, param) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {


      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;


      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;


      default:
        break;
    }
  });
}


```



### 2.2 构建URL统一管理

::tip 注意：
然后创建一个apiurl.jsx,用于整请求URL的管理
:::


```js
// let baseURL={
//     local:"http://localhost:7001/admin/",
//     online:"/api/admin/",
// }

// let ipUrl=baseURL.local;


//baseUrl已经在packaging.jsx中配置过了，这里不需要了

let servicePath = {

    getArticleList:'/article/home/index',
    
    registerByUserName:'/register/username',

    registerByEmail:'/register/email',

    loginByUserName:'/login/username',

    loginByEmail:'/login/email',

    getTableForCPU_R23:'/login/email',

    getTableForMobile_AVG_CPU:'/table/mobile/avgcpu',

    getTableFilter:'/table/mobile/filter',

    getLineChart:'/chart/linechart',

    getPaiChart:'/chart/paichart',

    getColumnChart:'/table/chart/column',

    getCardData:'/card/data',

}

export default servicePath;
```



### 2.3 构建业务逻辑的统一管理

:::tip 注意：
创建一个requestUsing.jsx,用于写实际业务请求函数的位置
:::

```js
import http from "./requestPackaging";//引入axios的封装文件
import { Notification} from '@douyinfe/semi-ui';
import servicePath from "./apiUrls";  //引入请求路径库




/**
 * 获取首页列表
 */
const getArticleList=()=>{
  return new Promise((resolve, reject) => {
    http("get",servicePath.getArticleList).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

const getTableForCPU_R23=()=>{
  return new Promise((resolve, reject) => {
    http("get",servicePath.getTableForCPU_R23).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}//获取表格（关于cpu_r23）的数据








export {
   getArticleList,
   getTableForCPU_R23,
}
```



### 2.4 实际组件调用

```js
import { getTableForCPU_R23} from '../../config/requestUse';




      const handleTabsChange=(val)=>{
            switch (val) {
                  case "6":
                    changeMainData(data.slice(11,17))
                    break;
                  case "7":
                    changeMainData(data.slice(5,17))
                    break;
                  case "8":
                    changeMainData(data.slice(11,16))
                    break;

                  default:
                    break;
                }//mock虚拟数据


             getTableForMobile_AVG_CPU().then(
                   (val)=>{
                         mainData=val.mainData;
                   },
                   ()=>{}
             )
            // 后端有数据之后就把这里开启就可
      }

```

