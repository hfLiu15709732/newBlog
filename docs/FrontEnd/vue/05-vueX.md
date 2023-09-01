---
slug: vuex
title: 5. Vue集中式状态管理
tags: [VueX, pinia, Vue集中式状态管理]
---

## 1. Vuex 的集中式管控

### 1.1.基础配置

**安装依赖文件**

```shell
npm install --save vuex
```

**挂载 VueX 实例**

```js
import store from "./store";
app.use(store);
```

### 1.2. 快速开始

**编写仓库的主入口文件**

```jsx
import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"; //用户信息仓库
import setting from "./modules/setting"; //设置信息仓库

const store = new Vuex.Store({
	modules: {
		user,
		setting,
	}, //模块化仓库
}); //创建主仓库入口

export default store; //导出主仓库
```

**编写分支仓库文件（user 为例）**

```jsx
import { TOKEN_NAME } from "@/config/global";

const InitUserInfo = {
	roles: [],
};

// 定义的state初始值
const state = {
	userInfo: InitUserInfo,
};

const mutations = {
	setUserInfo(state, userInfo) {
		state.userInfo = userInfo;
	},
};

const getters = {
	token: (state) => state.token,
	roles: (state) => state.userInfo?.roles,
};

const actions = {
	async logout({ commit }) {
		commit("removeToken");
		commit("setUserInfo", InitUserInfo);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}; //依次导出每个数据项
```

**组件获取数据**

```jsx
import { useStore } from "vuex";
const { userInfo } = this.$store.state.user; //vue2
//或者
const store = useStore();
const userinfo = computed(() => store.state.user.userInfo); //vue3
```

### 1.3 getters 属性

**创建 getters**

```jsx
const state = () => ({
	cartList: [
		{ name: "乒乓球", price: 5 },
		{ name: "排球", price: 120 },
		{ name: "运动饮料", price: 10 },
		{ name: "运动鞋", price: 200 },
		{ name: "纸巾", price: 20 },
	],
});

const getters = {
	getList: (state) => state.cartList,
	getListLow: (state) => (num) => {
		return state.cartList.filter((item) => item.price < num);
	},
};
```

**使用 getters**

```jsx
const cartList = computed(() => store.getters["user/getList"]);
//或者
const cartList = computed(() => store.getters["user/getList"](50)); //传参数
```

### 1.4 Mutation 属性

:::danger 注意
在 Vuex 中，mutation 都是同步事务，要处理异步操作需要使用到 Action。
:::

**创建 Mutation**

```jsx
const mutations = {
	increment(state) {
		state.num++;
	},
}; //没有payload的

const mutations = {
	increment(state, payload) {
		state.count += payload.amount;
	},
}; //具有payload的
```

**使用 Mutation**

```jsx
store.commit("increment");
//或者
store.commit("increment", {
	amount: 10,
}); //具有payload的
```

### 1.5 Action 属性

:::danger 注意
在 Vuex 中，mutation 都是同步事务，要处理异步操作需要使用到 Action。
:::

**创建 Action**

```jsx
const actions = {
	increment(context) {
		// context.commit('increment');
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				context.commit("increment");
				resolve();
			}, 500);
		});
	},
};
```

**使用 Action**

```jsx
  store.dispatch('count/increment'{a: 123}).then(() => {
    console.log('-----执行完action');
    // 这里写一些逻辑
  });
  //也可以不返回promise 在函数里面直接处理即可
```

## 2. Pinia--更现代化的状态管理库

### 2.1.基础配置

**安装依赖文件**

```shell
yarn add pinia
# 或者使用 npm
npm install pinia
```

**挂载 VueX 实例**

```js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "../src/assets/main.css";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
```

### 2.2. 基础使用

**编写一个 Store**

```jsx
import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"; //用户信息仓库
import setting from "./modules/setting"; //设置信息仓库

const store = new Vuex.Store({
	modules: {
		user,
		setting,
	}, //模块化仓库
}); //创建主仓库入口

export default store; //导出主仓库
```

**编写分支仓库文件（user 为例）**

```jsx
import { defineStore } from "pinia";

const chatStore = defineStore("chat", {
	state: () => {
		return {
			cartNum: 100,
			totalPrice: 120043,
		};
	},
});

export default chatStore;
```

**组件获取数据**

```jsx

<script setup>

import useChatStore from "../store/chat"

const chatStore=useChatStore();


</script>

<template>
  <h1>商品数量:{{ chatStore.cartNum }}</h1>
  <h1>商品总价:{{ chatStore.totalPrice }}</h1>

</template>


```

**状态更新**

:::info 注意
仅仅在一个组件内的状态数据更新，仓库会自动同步更新数据
:::

```js
<script setup>

import useChatStore from "../store/chat"

let chatStore=useChatStore();



const handleAdding=()=>{
  chatStore.cartNum++;
}


</script>

<template>
  <h1>商品数量:{{ chatStore.cartNum }}</h1>
  <h1>商品总价:{{chatStore.totalPrice }}</h1>
  <button @click="handleAdding">加1</button>

</template>

<style scoped>
```

### 2.3.Getters 属性

:::tip 注意
Getter 是 defineStore 参数配置项（State、Getter、Action）里面的一个属性。Getter 属性是一个对象，该对象里面是各种方法。我们可以把 Getter 看成 Vue 中的计算属性，它的作用就是返回一个新的结果。
:::

**设置仓库 Getters**

```jsx
import { defineStore } from "pinia";

const chatStore = defineStore("chat", {
	state: () => {
		return {
			cartNum: 100,
			totalPrice: 120043,
			courseList: [
				{ name: "前端开发", person: 300 },
				{ name: "Java开发", person: 500 },
				{ name: "golong", person: 120 },
				{ name: "CPP", person: 390 },
				{ name: "Python", person: 220 },
				{ name: "ios", person: 320 },
			],
		};
	},
	getters: {
		getHotCourse: (state) => {
			let newList = state.courseList.filter((item) => {
				return item.person >= 300;
			});
			return newList;
		},
	},
});

export default chatStore;
```

**组件调用 Getters**

```jsx
<script setup>

import useChatStore from "../store/chat"

let chatStore=useChatStore();
const newList=chatStore.getHotCourse



</script>

<template>
  <hr/>
  <h1>热门课程</h1>
  <ul>
    <li v-for="(item,index) in newList">{{ item.name }}有{{ item.person }}人</li>
  </ul>
  <hr/>

</template>

```

### 2.4.Actions 属性

:::info 简要了解
前面提到的 State 和 Getter 属性都主要是 数据层面的，并没有具体的业务逻辑代码，它们两个就和我们组件代码中的 data 数据和 computed 计算属性一样。如果我们有 业务代码 的话，最好写在 Actions 中，该属性就和我们组件代码中的 methods 相似，用来放置一些处理业务逻辑的代码。

异步和同步的逻辑都可以放到 Action 中
:::

**编写 Actions 逻辑**

```jsx
import axios from "axios";
import { defineStore } from "pinia";

const chatStore = defineStore("chat", {
	state: () => {
		return {
			orderList: [],
		};
	},
	actions: {
		getOrderList: async function (value) {
			console.log(value); //获取组件的传递的参数
			let data = await axios.get(
				"https://mock.presstime.cn/mock/64a92865ace0545a9f40face/weapp/portroyal"
			);
			this.$state.orderList = data.data.listData;
		},
	},
});

export default chatStore;
```

**组件使用**

```jsx
<script setup>

import useChatStore from "../store/chat"

let chatStore=useChatStore();


const handleGet=()=>{
  chatStore.getOrderList("第一组件点击了")
}

</script>

<template>


  <button @click="handleGet">获取orderlist的数据</button>

  <hr/>
  <h1 >数据数据</h1>
  <ul>
    <li v-for="(item,index) in chatStore.orderList">{{ item.Title }}是{{ item.Score }}分 ，排{{ index+1 }}名</li>
  </ul>
  <hr/>

</template>
```

### 2.5 持久化存储

**安装依赖**

```shell
yarn add pinia-plugin-persistedstate
or
npm i  pinia-plugin-persistedstate

```

**挂载实例**

```jsx
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "../src/assets/main.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount("#app");
```

**仓库进行配置**

```jsx
import axios from "axios";
import { defineStore } from "pinia";

const chatStore = defineStore("chat", {
	//persist: true, //全部数据开启持久化存储

	persist: {
		key: "chatssss", //存储键值对的键名称
		storage: window.localStorage, //存储方式
		paths: ["data2", "picData"], //需要存储的数据(按需存储)
	}, //部分数据开启持久化存储
	state: () => {
		return {
			orderList: [],
			data1: "2228",
			data2: "866666335",
			data3: "8765",
			picData: 2222222,
		};
	},
	actions: {
		getOrderList: async function (value) {
			console.log(value); //获取组件的传递的参数
			let data = await axios.get(
				"https://mock.presstime.cn/mock/64a92865ace0545a9f40face/weapp/portroyal"
			);
			this.$state.orderList = data.data.listData;
		},
	},
});

export default chatStore;
```
