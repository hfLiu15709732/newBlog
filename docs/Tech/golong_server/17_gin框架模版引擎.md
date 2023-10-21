---
slug: Gin_template
title: 17. Gin框架渲染引擎
tags: [Gin, 模版引擎, template]
---

# 强大、易用的 Gin 渲染引擎

## 1. 基础 HTML 渲染：

:::info 解析

1. 我们首先定义一个存放模板文件的 templates 文件夹，
2. 然后在其内部按照业务分别定义一个 posts 文件夹和一个 users 文件夹。

**posts/index.html**文件的内容如下：

```html
{{define "pppb.html"}}
<!-- 上面的define加下面的end可以为这个html文件进行唯一的重命名 解析html文件的时候要用 -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>posts/index</title>
	</head>
	<body>
		{{.title}}
	</body>
</html>
{{end}}
```

**user/index.html**文件的内容如下：

```html
{{define "pppa.html"}}
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>users/index</title>
	</head>
	<body>
		{{.title}}
	</body>
</html>
{{end}}
```

**创建推送 html 的服务器**：

```go
func main() {
	r := gin.Default()
	r.LoadHTMLGlob("templates/**/*")
	//r.LoadHTMLFiles("templates/posts/index.html", "templates/users/index.html")
    //解析所有html文件（前提是文件路径都是templates/xxx/a.html这样才行）

	r.GET("/posts/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pppb.html", gin.H{
			"title": "posts/index",
		})
	})

	r.GET("users/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pppa.html", gin.H{
			"title": "users/index",
		})
	})
    //设置pppa与pppb的唯一名称重写为了避免不同文件夹内的文件同名的问题

	r.Run(":10086")
}
```

:::

## 2. 自定义模版函数

:::info 注意
最常见的使用场景就是 a 标签转义的问题，不能直接使用 safe，需要自定义 safe 函数才行，如下所示

**先定义模版函数**

```go

	router := gin.Default()
	router.SetFuncMap(template.FuncMap{
		"safe": func(str string) template.HTML{
			return template.HTML(str)
		},
	})
	router.LoadHTMLFiles("./index.tmpl")

	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", "<a href='https://liwenzhou.com'>李文周的博客</a>")
	})

```

**再在 html 文件中使用**

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<title>修改模板引擎的标识符</title>
	</head>
	<body>
		<div>{{ . | safe }}</div>
	</body>
</html>
```

:::

## 3. 静态资源处理

:::info 注意
当我们渲染的 HTML 文件中引用了`静态文件`时，我们必须按照以下方式在渲染页面前调用`gin.Static`方法才行，并用使用的名字来代替路径中的./static
:::

```go
func main() {
	r := gin.Default()
	r.Static("/sta", "./static")//在html文件引用时使用/sta来代替原来使用./static的目录位置即可
	r.LoadHTMLGlob("templates/**/*")//解析所有html文件（前提是文件路径都是templates/xxx/a.html这样才行）
    r.LoadHTMLGlob("templates/*")//或者这样解析所有html文件（前提是文件路径都是templates/a.html这样才行）
   // ...
	r.Run(":8080")
}
```

## 4. JSON 格式渲染

:::info
gin 框架提供了`Context`对象的`JSON`方法,我们可以很方便地使用它来渲染`json`响应,

可以便捷的将 **map** 形式或者 **struct** 结构数据转化为 json 格式数据

:::

```go

func main() {
	r := gin.Default()

	r.GET("/map2JSON", func(c *gin.Context) {
		// 方式一：自己拼接map来进行传输

        // gin.H 是gin框架封装好的map[string]interface{}的
		c.JSON(http.StatusOK, gin.H{"message": "Hello world!"})
	})
    //map转化


	r.GET("/struct2JSON", func(c *gin.Context) {
		// 方法二：使用结构体
		var msg struct {
			Name    string `json:"user"`
			Message string
			Age     int
		}
        m1:=msg{
            Name:"hfliux",
            Message:"welcome",
            Age:18,
        }
		c.JSON(http.StatusOK, m1)
	})
    //struct转化

	r.Run(":10086")
}

```
