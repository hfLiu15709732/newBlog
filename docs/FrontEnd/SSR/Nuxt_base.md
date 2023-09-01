---
slug: nuxt
title: 1. Nuxt3基础学习
tags: [Nuxt3, 服务端渲染]
---

## 1. 理论学习

**预渲染和服务端渲染**

| 特点             | SPA                             | 预渲染                             | 服务端渲染                                             |
| ---------------- | ------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| 页面加载         | 单页面应用，整体加载 JavaScript | 静态 HTML 文件                     | 服务器端渲染 HTML 页面                                 |
| 内容更新         | 动态加载和渲染                  | 动态加载和渲染                     | 服务器端动态渲染                                       |
| 首次加载速度     | 可能较慢                        | 预先生成静态 HTML，加快加载        | 直接返回完整 HTML，加快加载速度                        |
| SEO 优化         | 需要额外处理                    | 预渲染的静态 HTML 可被搜索引擎识别 | 页面以渲染好的 HTML 直接返回，有利于搜索引擎爬取和索引 |
| 用户体验         | 流畅的响应式体验                | 与 SPA 类似，无需刷新页面          | 与 SPA 类似，无需刷新页面                              |
| 技术要求         | 前端技术                        | 前端技术                           | 前端和后端技术                                         |
| 服务器压力       | 轻量级                          | 轻量级                             | 需要更多服务器资源                                     |
| 开发和调试复杂度 | 相对较低                        | 相对较低                           | 相对较高                                               |

**安装项目**

```shell
npx nuxi init nuxt-app

# 但是nuxt3的安装往往因为网络问题寄了
# 可以选择直接从github克隆下来模版项目

git clone -b v3 https://github.com/nuxt/starter.git nuxt3-app



# 随后安装依赖

yarn add
#或者
npm i


# 之后启动项目

yarn dev
#或者
npm run dev


# 打包项目

yarn build
#或者
npm run build
```

## 2. 路由配置

### 2.1. 约定是路由

:::info 实现
只需要在 pages 文件夹中直接新建 vue 文件即可创建页面

nuxt3 会自动配置路由信息 路径名就是文件名
类似创建一个 news.vue 的文件 就会创建 127.0.。1:3000/news 的页面
:::

```jsx title="创建一个index.vue的文件 就会创建 根路径/的页面"
<template>
  <div class=""><h1>Index Page</h1></div>
</template>

<script setup>
import {} from "vue";
</script>

<style scoped></style>
```

### 2.2. 路由跳转

**使用 NuxtLink 实现**

```jsx
<template>
	<div class="">
		<h1>Index Page</h1>
		<NuxtLink to="/detail">前往Detail界面</NuxtLink>
	</div>
</template>
```

**编程式导航**

```jsx
import { useRouter } from "vue-router";
const router = useRouter();

function goToPage() {
	// 使用router.push方法进行导航
	router.push("/path/to/page");

	// 使用router.replace方法进行导航
	router.replace("/path/to/page");
}
```

### 2.3 动态路由与路由传参

**1. 路由的配置**

```shell
#约定式下需要这样写
pages/
--| about.vue
--| posts/
----| [id].vue


#这样的路径渲染成一下的路径
127.0.0.1:3000/about
127.0.0.1:3000/posts/:id
```

**2. 发送路由参数**

```jsx
router.push("/detail/百度");
//或者
<NuxtLink to="/detail/网易">前往关于网易的详情界面</NuxtLink>;
```

**3.对应组件接收参数**

```jsx
const route = useRoute();

console.log(route.params.id);
```

### 2.4 嵌套路由实现

**1. 路由的配置**

```jsx
//约定式路由下必须要这样写

|--pages
|----parent/
|------child1.vue
|------child2.vue
|------child3.vue
|----parent.vue
```

**2. 父页面的文件也要进行配置**

```jsx
<template>
  <div class="">父页面----page</div>
  <NuxtPage></NuxtPage>
</template>

<script setup>
</script>

<style scoped>

</style>
```

:::info
即可实现嵌套路由的实现

类似于下面这样的 URL 路径

```shell
127.0.0.1:3000/parent
127.0.0.1:3000/parent/child1
127.0.0.1:3000/parent/child2
127.0.0.1:3000/parent/child3
```

:::

### 2.5 路由中间件(路由鉴权)

**1.配置中间件**

```jsx title="一般在middleware/auth.jsx"
export default defineNuxtRouteMiddleware((to, from) => {
	if (isAuthenticated() === false) {
		return navigateTo("/login");
	}
});
//isAuthenticated()是一个示例方法，用于验证用户是否已认证。
//在许多应用程序中，需要对用户进行身份验证，以控制其访问权限或执行特定操作的能力。
//isAuthenticated()方法通常用于检查用户是否通过身份验证，并返回一个布尔值来指示用户的身份验证状态。
```

**2.使用中间件**

```jsx title="pages/detail.vue"
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <h1>Welcome to your dashboard</h1>
</template>
```

**3.全局中间件**

只需要在文件名后面加上.global 的后缀就可以了

例如:建立一个 auth.global.js 文件代码如下:

```js
export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path === "/demo1") {
		//配置路由白名单即可以实现路由鉴权
		console.log("禁止访问这个页面");
		abortNavigation(); //停止当前导航，可以使用error进行报错
		return navigateTo("/");
	}
});
```

## 3. 页面过渡配置

**1. 启用页面过渡**

```jsx title="nuxt.config.js"
export default defineNuxtConfig({
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
});
```

**2. 配置过渡样式**

```jsx title="app.vue"
<template>
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

```

**单一页面配置过渡**

:::danger 注意
上面的配置会直接应用于所用界面 要为某个界面配置特殊的界面，需要使用下面
:::

```jsx title="app.vue"
<template>
  <NuxtPage />
</template>

<style>
/* ... */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>

```

```jsx title="about.vue about界面就具备了上面的roate过渡样式"
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>

```

## 3. 布局模版

### 3.1 使用单一插槽

**1. 配置模版信息**

```jsx title="/layout/default"
<template>
	<h1>我是布局模版 哈哈哈 默认的</h1>
	<slot></slot>
</template>
```

**2. 使用模版**

```jsx title="/pages/banner"
<template>
	<NuxtLayout name="default">
		<div class="">我是使用了布局模版的banner页面</div>
	</NuxtLayout>
</template>
```

### 3.2 多个使用具名插槽

**1. 配置模版信息**

```jsx title="位置:/pages/banner"
<template>
	<h1>我是布局模版 哈哈哈 特殊的</h1>
	<slot name="one"></slot>
	<div>---------------------------------------------</div>
	<slot name="two"></slot>
</template>
```

**2. 使用模版**

```jsx title="位置:/pages/display"
<template>
    <NuxtLayout name="special">
        <template #one>
            <div class="">我是使用了布局模版的display页面的第一部分</div>
        </template>
        <template #two>
            <div class="">我是使用了布局模版的display页面的第二部分</div>
        </template>
    </NuxtLayout>
</template>
```

## 4. 组件部分

### 4.1 一般组件

:::tip 特殊点
在`components`目录下，写在这个目录下他会自动加载到页面中，
而不用我们自己不断的重复引入到每个页面中。组件名即为组件文件的名称
:::

**1.注意目录的配置**

```shell
//目录结构
-|components
----|NavBar.vue
```

**2.编写组件**

```jsx
<template>
	<h1>这是一个navbar导航栏组件</h1>
</template>
```

**3.组件使用**

:::info
可以在组件/页面/布局模版中使用，都不要引入，直接使用就可以了
:::

**在组件/页面中使用**

```jsx
<template>
	<div>我是第三页面的内容</div>
	<NavBar />
</template>
```

**在布局模版中使用**

```jsx
<template>
	<div>
		我是布局模板，默认的
		<slot name="one" />
		---------
		<br />
		<slot name="two" />
		<TheFooter />
	</div>
</template>
```

### 4.2 懒加载组件

:::tip 注意
在 Nuxt3 中使用懒加载组件非常容易，只需要在组件名前加上 lazy 即可，
是否加载只需要加上 v-if 即可

```jsx
<lazyCompose v-if="show" />
```

:::

**编写组件**

```jsx title="LazyCompose.vue"
<template>
  <div class="">Lazy Components</div>
</template>

<script setup>
</script>

<style scoped>
</style>
```

**使用组件**

```jsx title="LazyCompose.vue"

<template>
  <div class="">
    <lazyCompose v-if="show" />
    <button @click="handleClick">显示/隐藏懒加载组件</button>
  </div>
</template>


import { ref } from "vue";
const show = ref(false);
const handleClick = () => {
  show.value = show.value ? false : true;
};


```

### 4.3 多层组件

:::tip 注意
多层组件又可以说是对于同一类的组件归纳，
即把属于同一类的组件放到一个文件里面 使用时直接文件夹+组件名即可
:::

**路由目录的配置**

```shell
--|components
----|test
------|MyButton.vue
```

**使用组件**

```jsx
<TestMyButton />
```

## 5. 数据请求部分

### 5.1 理论解释

:::danger 注意
在 Nuxt3 不需要使用 Axios 了 Nuxt3 已经设计了四种请求数据的方法:

**useAsyncData** 、**useFetch** 、**useLazyFetch** 、**useLazyAsyncData**

其中 后两者只是前两者的懒加载形式
:::

**相关介绍：**

- useAsyncData: 这是 Nuxt 提供的组合式函数,用于在组件加载前异步获取数据。它会在组件初始化时自动调用,并等待数据获取完成后再渲染组件。获取到的数据会存入组件的 data()中。
- useFetch: 这也是一个组合式函数,用于发起任意的异步请求(不仅限于数据获取),它返回 fetch 状态响应与结果。默认不会等待请求完成就渲染组件,需要通过 watchEffect 手动处理 loading 状态。
- useLazyAsyncData: 这是一个新的组合式函数,提供了延迟调用 useAsyncData 的能力。只有在需要时才会触发数据获取,避免不必要的请求。
- useLazyFetch: 同样用于延迟触发 useFetch,只有在需要时才发起请求。

**主要区别：**

- 用途不同:useAsyncData 专用于数据获取,useFetch 可发起任意请求
- 触发时机不同:useAsyncData 自动触发,useFetch 需要自己处理
- 数据处理不同:useAsyncData 会存储数据,useFetch 不处理数据
- Lazy 版用于延迟执行上述函数,实现按需加载

| 函数名           | 区别                  | 触发时机             | 数据存储               |
| ---------------- | --------------------- | -------------------- | ---------------------- |
| useAsyncData     | 专门用于数据预取      | 组件初始化时自动触发 | 数据存储到组件 data 中 |
| useFetch         | 可发起任意异步请求    | 需要自己处理响应     | 不处理数据存储         |
| useLazyAsyncData | 延迟调用 useAsyncData | 只在需要时触发       | 数据存储到组件 data 中 |
| useLazyFetch     | 延迟调用 useFetch     | 只在需要时触发       | 不处理数据存储         |

### 5.2 开始使用

**useFetch 的使用**

```jsx
<template>
	<div class="">{{ list }}</div>
</template>;

import { ref } from "vue";

const res = await useFetch("http://xxxx/getTenArticleList");
const list = ref(res.data.data);
console.log(res);
//或者类似于
const { data: count } = await useFetch("/api/count");
```

**useAsyncData 的使用**

:::info 官网的解释
useFetch 接收 URL 并获取数据，而 useAsyncData 可能有更复杂的逻辑。
useFetch(url)几乎等同于 useAsyncData(url, () => $fetch(url))
:::

```jsx

const { data } = await useAsyncData('count', () => $fetch('/api/count'))


<template>
  Page visits: {{ data }}
</template>

```
