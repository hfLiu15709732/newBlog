---
slug: Gin_route
title: 18. Gin框架路由开发
tags: [Gin, 路由开发, route]
---

# Gin 框架的路由机制

## 1. 获取 querystring 参数

:::info 解析

1. querystring 指的是 URL 中?后面携带的参数，
2. 例如：/collage/search?title=工业&location=杭州。
3. 获取请求的 querystring 参数的方法如下：

```go

func main() {


func testQuery1(context *gin.Context) {
	query1 := context.Query("avatar")//直接，最常用的获取query参数
	query2 := context.Query("title")
	query3 := context.DefaultQuery("age", "未知") //具有默认值的获取（当age没传来的时候，默认为未知）
	query4, ok := context.GetQuery("location")  //具有bool判断是否传来的query获取
	if !ok {
        //代表没有传值过来
		query4 = "中国"
	}

	fmt.Println(query1)
	fmt.Println(query2)
	fmt.Println(query3)
	fmt.Println(query4)
	context.JSON(http.StatusOK, gin.H{"作者": query1, "作品": query2, "年龄": query3, "出生地": query4})

}


	server.GET("/search1", testQuery1) //测试获取querystring数据
}

```

:::

## 2. 获取 form 参数

:::info 详细解析

1. 当前端请求的数据通过 form 表单提交时，
2. 例如向/user/search 发送一个 POST 请求，
3. 获取请求数据的方式如下：

```go

func main() {
	r := gin.Default()

	r.POST("/user/search", func(c *gin.Context) {

		username := c.PostForm("username")//最基础的获取form参数形式
		address := c.PostForm("address")
        password := c.DefaultPostForm("password", "root")// DefaultPostForm取不到值时会返回指定的默认值


		//输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
			"message":  "ok",
			"username": username,
			"address":  address,
		})
	})
	r.Run(":8080")
}

```

:::

## 3. 获取原生 json

:::info 详细解析

1. 当前端请求的数据通过 JSON 提交时，
2. 例如向/json 发送一个 JSON 格式的 POST 请求，
3. 但实际项目中更优先使用参数绑定来解决（除非该数据根本不需要设立 struct）

```go

func main() {
	r := gin.Default()

    r.POST("/json", func(c *gin.Context) {
        // 注意：下面为了举例子方便，暂时忽略了错误处理
        b, _ := c.GetRawData()  // 从c.Request.Body读取请求数据
        // 定义map或结构体
        var m map[string]interface{}
        // 反序列化
        _ = json.Unmarshal(b, &m)

        c.JSON(http.StatusOK, m)
})
	r.Run(":8080")
}

```

:::

## 4. 获取 path 参数

:::info 详细解析

1. 请求的参数通过 URL 路径传递（就是严格意义的 RESTful 风格的形式），
2. 例如：/user/search/小王子/沙河。
3. 获取请求 URL 路径中的参数的方式如下。

```go

	r.GET("/user/search/:username/:address", func(c *gin.Context) {
		username := c.Param("username")
		address := c.Param("address")
		//输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
			"message":  "ok",
			"username": username,
			"address":  address,
		})
	})
```

:::

## 5. 参数绑定 🚀

:::info 详细解析

1. 首先，它是实际项目中最常见，最高效的方式
2. 为了能够更方便的获取请求相关参数，提高开发效率，
3. Gin 框架基于请求的 Content-Type 识别请求数据类型并利用反射机制自动提取请求中 QueryString、form 表单、JSON、XML 等参数到结构体中。
4. 下面的示例代码演示了.ShouldBind()强大的功能，它能够基于请求自动提取 JSON、form 表单和 QueryString 类型的数据，并把值绑定到指定的结构体对象。

```go

// Binding from JSON
type Login struct {
	User     string `form:"user" json:"user" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}



func main() {
	router := gin.Default()

	// 绑定JSON的示例 ({"user": "q1mi", "password": "123456"})
	router.POST("/loginJSON", func(c *gin.Context) {
		var login Login

		if err := c.ShouldBind(&login); err == nil {
			fmt.Printf("login info:%#v\n", login)
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	// 绑定form表单示例 (user=q1mi&password=123456)
	router.POST("/loginForm", func(c *gin.Context) {
		var login Login
		// ShouldBind()会根据请求的Content-Type自行选择绑定器
		if err := c.ShouldBind(&login); err == nil {
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	// 绑定QueryString示例 (/loginQuery?user=q1mi&password=123456)
	router.GET("/loginForm", func(c *gin.Context) {
		var login Login
		// ShouldBind()会根据请求的Content-Type自行选择绑定器
		if err := c.ShouldBind(&login); err == nil {
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	router.Run(":10086")
}


```

:::

:::danger 注意 注意
**关于字段绑定要说的**

**ShouldBind**会按照下面的顺序解析请求中的数据完成绑定：

如果是 **GET** 请求，只使用 **Form** 绑定引擎（query）。

如果是 **POST** 请求，首先检查 **content-type** 是否为 **JSON** 或 **XML**，然后再使用 **Form**（form-data）。
:::

## 6. 文件上传

### 6.1 单文件上传

:::info 小例子的形式详细讲说一下

**分别是前端原生 html 的代码和后端 Gin 的代码**

**前端的原生上传**

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<title>上传文件示例</title>
	</head>
	<body>
		<form action="/upload" method="post" enctype="multipart/form-data">
			<input type="file" name="f1" />
			<input type="submit" value="上传" />
		</form>
	</body>
</html>
```

**后端 Gin 接收文件**

```go

func main() {
	router := gin.Default()
	// 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// 单个文件
		file, err := c.FormFile("f1")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		log.Println(file.Filename)
		dst := "./uploads/"+ file.Filename//创建文件存储路径
		// 上传文件到指定的目录
		c.SaveUploadedFile(file, dst)
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("'%s' uploaded!", file.Filename),
		})
	})
	router.Run()
}

```

:::

### 6.2 多文件上传

## 7. 重定向

### 7.1 HTTP 重定向

:::tip 解析

**HTTP 重定向很容易。 内部、外部重定向均支持。**

```go
r.GET("/test", func(c *gin.Context) {
	c.Redirect(http.StatusMovedPermanently, "http://www.map.baidu.com/")
})

```

:::

### 7.2 路由重定向(分发)

**路由重定向，使用 HandleContext：**

```go
r.GET("/test", func(c *gin.Context) {
    // 指定重定向的URL
    c.Request.URL.Path = "/test2"
    r.HandleContext(c)
})
r.GET("/test2", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"hello": "world"})
})
```

## 8. 路由组和其他路由

### 8.1 any 路由

:::info

字面意思，可接受所有形式，逻辑里面判断是 **get** 还是 **post** 来进行后续的处理

**实际开发并不常用**

```go
r.Any("/test", func(c *gin.Context) {...})
```

:::

### 8.2 404 路由

:::info

为没有配置处理函数的路由添加处理程序，默认情况下它返回 **404** 代码，下面的代码为没有匹配到路由的请求都返回 **views/404.html** 页面。

```go
r.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "views/404.html", nil)
	})
```

:::

### 8.3 一般路由

:::info

**就是之前写过的最经典的路由形式**

```go
r.GET("/index", func(c *gin.Context) {...})
r.GET("/login", func(c *gin.Context) {...})
r.POST("/login", func(c *gin.Context) {...})
```

:::

### 8.4 路由组

:::info

1. 我们可以将拥有共同 URL 前缀的路由划分为一个路由组。
2. 习惯性一对{}包裹同组的路由，这只是为了看着清晰，
3. 你用不用{}包裹功能上没什么区别。

**常规路由组**

```go

func main() {
	r := gin.Default()
	userGroup := r.Group("/user")
	{
		userGroup.GET("/index", func(c *gin.Context) {...})
		userGroup.GET("/login", func(c *gin.Context) {...})
		userGroup.POST("/login", func(c *gin.Context) {...})

	}
	shopGroup := r.Group("/shop")
	{
		shopGroup.GET("/index", func(c *gin.Context) {...})
		shopGroup.GET("/cart", func(c *gin.Context) {...})
		shopGroup.POST("/checkout", func(c *gin.Context) {...})
	}
	r.Run()
}

```

**路由组再嵌套**

```go

shopGroup := r.Group("/shop")
	{
		shopGroup.GET("/index", func(c *gin.Context) {...})
		shopGroup.GET("/cart", func(c *gin.Context) {...})
		shopGroup.POST("/checkout", func(c *gin.Context) {...})
		// 嵌套路由组
		xx := shopGroup.Group("xx")
		xx.GET("/oo", func(c *gin.Context) {...})
	}

```

:::
