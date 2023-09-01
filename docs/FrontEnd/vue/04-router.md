---
slug: vue-router
title: 4. Vue-router 路由管理
tags: [前端路由, Vue-router, Vue]
---

## 1.理论知识

:::tip 原因
因为 vue 是单页应用，没有很多 html 跳转 ，必须要使用路由做页面的跳转

Vue 路由允许我们通过不同的 URL 访问不同的内容，即使用 URL 与组件之间的映射
:::

```js title="基础安装"

npm init vue@latest
//或者
npm init vite@latest
//Vue项目创建




npm i vue-router --save
//或者
npm install vue-router@4
//注意Vue2与Vue3的路由不兼容，使用Vue3的话需要使用Router4
```

## 2.快速开始

**基础模式对比**

//vue2 mode history vue3 createWebHistory
//vue2 mode hash vue3 createWebHashHistory
//vue2 mode abstact vue3 createMemoryHistory

**创建路由文件**

```js title="/src/router/index.jsx"
//引入路由对象
import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
	createMemoryHistory,
	RouteRecordRaw,
} from "vue-router";

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("../components/Login.vue"), //lazy 懒加载
	},
	{
		path: "/register",
		component: () => import("../components/Register.vue"),
	},
	{
		path: "/mian",
		component: () => import("../components/main.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

//导出router
export default router;
```

**路由挂载**

```js title="/src/main.js"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
createApp(App).use(router).mount("#app");
```

**基础的路由组件填充与跳转**

```jsx
<template>
	<div>
		<h1>小满最骚</h1>
		<div>
			<!--使用 router-link 组件进行导航 -->
			<!--通过传递 `to` 来指定链接 -->
			<!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
			<router-link tag="div" to="/">跳转a</router-link>
			<router-link tag="div" style="margin-left:200px" to="/register">跳转b</router-link>
		</div>
		<hr />
		<!-- 路由出口 -->
		<!-- 路由匹配到的组件将渲染在这里 -->
		<router-view></router-view>
	</div>
</template>
```

## 3.路由跳转方式

### 3.1 命名路由

:::tip 原理
以 name 作为路由编号进行跳转，跳转时不用整繁琐的 url 路径
:::

```js title="/src/router/index.jsx"
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Login",
		component: () => import("../components/login.vue"),
	},
	{
		path: "/reg",
		name: "Reg",
		component: () => import("../components/reg.vue"),
	},
];
```

```jsx title="/src/app.vue"
<h2>命名路由</h2>
<div>
  <router-link :to="{name:'Login'}">Login</router-link>
  <router-link style="margin-left:10px" :to="{name:'Reg'}">Reg</router-link>



  <router-link replace to="/">Login</router-link>
	<router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
</div>
<hr />
```

### 3.2 编程路由

:::tip 原理
直接使用 Vue-router 已经装建好的路由实例进行对路径管理
:::

```js
import { useRouter } from "vue-router";
const router = useRouter();

const toPage = () => {
	router.push("/reg");
};

//或者
const toPage = () => {
	router.push({
		path: "/reg",
	});
};

//或者

const toPage = () => {
	router.push({
		name: "Reg",
	});
};

//或者replace替代进行

const toPage = (url: string) => {
	router.replace(url);
};
```

### 3.3 历史横跨

:::tip 原理
采用一个整数作为参数，表示在历史堆栈中前进或后退多少步
:::

```js
const next = () => {
	//前进 数量不限于1
	router.go(1);
};

const prev = () => {
	//后退
	router.back();
};
```

## 4 嵌套式路由

:::tip 原理
本质本质就是父路由包含子路由，子路由切换与显示时 子路由也会显示出来
:::

```ts
const routes: Array<RouteRecordRaw> = [
	{
		path: "/user",
		component: () => import("../components/footer.vue"),
		children: [
			{
				path: "",
				name: "Login",
				component: () => import("../components/login.vue"),
			},
			{
				path: "reg",
				name: "Reg",
				component: () => import("../components/reg.vue"),
			},
		],
	},
];
```

:::info 子路由组件使用
使用子路由就是在父级组件上继续写 router-view 就可以
:::

## 5 命名视图

:::danger 应用场景
在一个路由组件中，想让 router-view 显示在一个组件中的不同位置，区分不同的 router-view 需要使用命名视图
:::

**路由创建部分**

```js
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		components: {
			default: () => import("../components/layout/menu.vue"),
			header: () => import("../components/layout/header.vue"),
			content: () => import("../components/layout/content.vue"),
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
```

**路由使用部分**

```html
<div>
	<router-view></router-view>
	<router-view name="header"></router-view>
	<router-view name="content"></router-view>
</div>
```

## 6 路由重定向

```ts
const routes: Array<RouteRecordRaw> = [
	{
		path: "/user",
		component: () => import("../components/footer.vue"),
		redirect: "/login",
		//或者
		redirect: { path: "/login" },
		//或者
		redirect: { name: "Login" },
		//或者进行传参
		redirect: (to) => {
			return {
				path: "/login",
				query: to.query, //将父级参数传递
			};
		},
		children: [
			{
				path: "",
				name: "Login",
				component: () => import("../components/login.vue"),
			},
			{
				path: "reg",
				name: "Reg",
				component: () => import("../components/reg.vue"),
			},
		],
	},
];
```

## 7. 路由别名

:::info 原理
实现了一个组件对应多个 URL 路径
:::

```ts
const routes: Array<RouteRecordRaw> = [
	{
		path: "/user",
		component: () => import("../components/footer.vue"),
		alias: ["/user1", "/user2", "/user3"],
		children: [
			{
				path: "",
				name: "Login",
				component: () => import("../components/login.vue"),
			},
			{
				path: "reg",
				name: "Reg",
				component: () => import("../components/reg.vue"),
			},
		],
	},
];
```

## 8. 路由传参

### 8.1 动态路由传参

**设置相关参数**

```jsx
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Login",
		component: () => import("../components/login.vue"),
	},
	{
		//动态路由参数
		path: "/reg/:id",
		name: "Reg",
		component: () => import("../components/reg.vue"),
	},
];
```

**组件传参**

```jsx
const toDetail = (item: Item) => {
	router.push({
		name: "Reg",
		params: {
			id: item.id,
		},
	});
};
```

**接收参数**

```jsx
import { useRoute } from "vue-router";
import { data } from "./list.json";
const route = useRoute();

const item = data.find((v) => v.id === Number(route.params.id));
```

### 8.2 Query 传参

**组件传参**

```jsx
const toDetail = (item: Item) => {
	router.push({
		path: "/reg",
		query: item,
	});
};
```

**接收参数**

```jsx
import { useRoute } from 'vue-router';
const route = useRoute()



 <div>参数属性1：{{ route.query?.name }}</div>
 <div>参数属性2：{{ route.query?.price }}</div>
 <div>参数属性3：{{ route.query?.id }}</div>
```

### 8.3 Params 传参

**组件传参**

```jsx
const toDetail = (item: Item) => {
	router.push({
		name: "Reg",
		params: item,
	});
};
```

**接收参数**

```jsx
import { useRoute } from 'vue-router';
const route = useRoute()



<div>名称属性：{{ route.params?.name }}</div>
<div>价格属性：{{ route.params?.price }}</div>
<div>编号属性：{{ route.params?.id }}</div>
```

## 9. 路由守卫

**相关参数用处**

| 参数名称                          | 参数用处                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| to                                | 即将要进入的目标 路由对象                                                                                             |
| from                              | 当前导航正要离开的路由                                                                                                |
| next()                            | 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)                                     |
| next(false)                       | 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址 |
| next('/')或者 next({ path: '/' }) | 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航                                                          |

### 9.1 前置守卫

:::info 原理
实现在路由跳转前执行的函数

一般用于:身份鉴权
:::

```jsx title="一种形式实现鉴权"
const whiteList = ["/", "/login", "/admin"]; //路由白名单

//全局前置守卫
router.beforeEach((to, from, next) => {
	Vnode.component?.exposed?.startLoading(); //loadingBar

	let token = localStorage.getItem("token");
	//白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
	if (whiteList.includes(to.path) || token) {
		//token每次都要跟后端校验一下是否过期
	}
});
```

```jsx title="第二种形式实现鉴权 一个完整的案例"
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NewsViews from "../views/NewsView.vue";
import NewsDetail from "../views/NewsDetail.vue";
import NewsType from "../views/NewsType.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: { transition: "slide-left" },
		},
		{
			path: "/about",
			name: "about",
			component: AboutView,
			meta: { transition: "slide-left" },
		},
		{
			path: "/news/",
			name: "news",
			component: NewsViews,
			redirect: "/news/detail/百度",
			children: [
				{
					path: "detail/:name",
					name: "detail",
					component: NewsDetail,
					meta: { transition: "slide-left" },
				},
				{
					path: "type",
					name: "type",
					component: NewsType,
					meta: { transition: "slide-left" },
				},
			],
			meta: { transition: "slide-left" },
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name === "home" || to.name === "about") {
		next();
	} else {
		//这块换成检验token的代码即可
		if (5 < 100) {
			console.log("通过啦 ！！！！！");
			next();
		} else {
			console.log("出错啦 ！！！！！");
			next({ name: "home" });
		}
	}
});

export default router;
```

### 9.2 后置守卫

:::info 原理
实现在路由跳转后执行的函数

一般用于:关闭 loading，关闭进度条等等
:::

```jsx
//全局后置守卫
router.afterEach((to, from) => {
	Vnode.component?.exposed?.endLoading();
});
```
