---
slug: vue-axios
title: 3. Vue 网络请求
tags: [网络请求, Vue]
---

## 1. 基本配置

**下载库文件**

```shell
npm install --save axios
```

**挂载应用**

```jsx title="main.js"
import axios from "axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mount("#app");
```

## 2.基础使用与进阶使用

:::danger 注意
在网络通信专题部分,有详细的将这一部分
:::
