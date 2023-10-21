---
slug: Gin_socket
title: 16. Gin框架基础
tags: [Gin, 框架基础]
---

# 初始 Gin 框架

## 1. 框架理论：

:::info 了解框架
Gin 是一个用 Go 语言编写的 web 框架。它是一个类似于 martini 但拥有更好性能的 API 框架, 由于使用了 httprouter，速度提高了近 40 倍。专注于高性能 WEB 服务器开发领域

**框架优势：**

:::

## 2. 前期准备：

```go
//1. 切换至国内代理
//切换至:https://goproxy.cn


//2. 框架安装
go get -u github.com/gin-gonic/gin

//3. 简单几步即可启动一台基于Gin的Web服务器


package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()//创建默认的服务器引擎

	r.GET("/hello", func(c *gin.Context) {
		// c.JSON：返回JSON格式的数据
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})//一个返回json参数的get请求路由

	r.Run(":10086")
    	// 启动HTTP服务，默认在127.0.0.1:8080启动服务
        // 现在手动切换在10086端口启动
}

```

## 3. 了解 RestFul 规范：

REST 与技术无关，代表的是一种软件架构风格，`REST`是 Representational State Transfer 的简称，中文翻译为“表征状态转移”或“表现层状态转化”。

简单来说，`REST`的含义就是客户端与 Web 服务器之间进行交互的时候，使用`HTTP`协议中的 4 个请求方法代表不同的动作。

- `GET`用来获取资源
- `POST`用来新建资源
- `PUT`用来更新资源
- `DELETE`用来删除资源。
  只要 API 程序遵循了`REST`风格，那就可以称其为 RESTful API。目前在前后端分离的架构中，前后端基本都是通过`RESTful API`来进行交互。

:::info 现实现状

高质量可维护性高的项目必然会选择严格意义上的 **REST** 风格的 **API** 约束

但现实多数项目及其求快速上线的项目仍然全是 **Get** 和 **POST**

:::

**接口类型**

| 请求方法 | URL          | 含义         |
| -------- | ------------ | ------------ |
| GET      | /book        | 查询书籍信息 |
| POST     | /create_book | 创建书籍记录 |
| POST     | /update_book | 更新书籍信息 |
| POST     | /delete_book | 删除书籍信息 |
