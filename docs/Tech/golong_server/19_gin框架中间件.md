---
slug: Gin_middleware
title: 19. Gin框架中间件
tags: [Gin, middleware, 中间件]
---

# Gin 框架的中间件机制

## 1. 定义中间件

:::info
`Gin`中的中间件必须是一个**gin.HandlerFunc**类型。

```go

// StatCost 是一个统计耗时请求耗时的中间件
func StatCost() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Set("name", "小王子") // 可以通过c.Set在请求上下文中设置值，后续的处理函数能够取到该值

		c.Next()// 调用该请求的剩余处理程序,后续处理结束之后再执行next后面的
		// c.Abort()// 不调用该请求的剩余处理程序（可理解为后续的函数被阻塞了，直接执行本函数后续的就行了）
		// 计算耗时
		cost := time.Since(start)
		log.Println(cost)
	}
}


```

:::

## 2. 注册中间件

### 2.1 全局注册

```go

func main() {
	// 新建一个没有任何默认中间件的路由
	r := gin.New()//默认服务器也行 默认服务器额外注册了两个内置中间件
	// 注册一个全局中间件
	r.Use(StatCost())

	r.GET("/test", func(c *gin.Context) {
		name := c.MustGet("name").(string) // 从上下文取值
		log.Println(name)
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello world!",
		})
	})
	r.Run()
}

```

### 2.2 单一路由注册

```go
// 给/test2路由单独注册中间件（可注册多个）
	r.GET("/test2", StatCost(), func(c *gin.Context) {
		name := c.MustGet("name").(string) // 从上下文取值
		log.Println(name)
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello world!",
		})
	})

```

### 2.3 路由组注册

```go

shopGroup := r.Group("/shop", StatCost())
{
    shopGroup.GET("/index", func(c *gin.Context) {...})
    ...
}


//或者下面这样也一样


shopGroup := r.Group("/shop")
shopGroup.Use(StatCost())
{
    shopGroup.GET("/index", func(c *gin.Context) {...})
    ...
}

```

## 3. 中间件原理（类洋葱圈模型）

:::info

1. 着重注意一下**next()**和**abort()**的问题，可能中间件里面套着其他函数，
2. 而且记住**abort()**是阻塞后续的函数，本函数还是要执行完的

:::

## 4. 很棒的第三方中间件推荐

### 4.1 cors()跨域解决中间件

:::info 使用快速解析

**详细配置 cors 中间件**

```go

package main

import (
  "time"

  "github.com/gin-contrib/cors"
  "github.com/gin-gonic/gin"
)

func main() {
  router := gin.Default()
  // CORS for https://foo.com and https://github.com origins, allowing:
  // - PUT and PATCH methods
  // - Origin header
  // - Credentials share
  // - Preflight requests cached for 12 hours
  router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"https://foo.com"},  // 允许跨域发来请求的网站
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE",  "OPTIONS"},  // 允许的请求方法
    AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    AllowOriginFunc: func(origin string) bool {  // 自定义过滤源站的方法
      return origin == "https://github.com"
    },
    MaxAge: 12 * time.Hour,
  }))
  router.Run()
}

```

**直接使用 cors 中间件（啥也不配置）**

```go

func main() {
  router := gin.Default()
  // same as
  // config := cors.DefaultConfig()
  // config.AllowAllOrigins = true
  // router.Use(cors.New(config))
  router.Use(cors.Default())//等同于上面的配置，允许所有网址跨域
  router.Run()
}

```

:::
