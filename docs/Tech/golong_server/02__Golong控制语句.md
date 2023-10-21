---
slug: Golong_base_control
title: 2. 控制语句
tags: [Golong, 控制语句]
---

# Golong 控制语句

## 1. if else

### 1.1 一般用法

```go
	//基本写法
	var score1 int = 88
	if score1 > 90 {
		fmt.Println("A")
	} else if score1 > 75 {
		fmt.Println("B")
	} else {
		fmt.Println("C")
	}

```

### 1.2 特殊用法

```go
	//特殊写法（if里面写的变量score2只会在判断里面用，外面不能用）
	if score2 := 99; score2 > 90 {
		fmt.Println("A")
	} else if score2 > 75 {
		fmt.Println("B")
	} else {
		fmt.Println("C")
	}
```

## 2. for 语句

### 2.1 一般写法

```go
	//for循环的一般写法
	for i := 0; i < 10; i++ {
		fmt.Print(i)
		fmt.Print("--")
	}
	fmt.Println("-")
```

### 2.2 for range 写法

```go
	//特殊写法（面向切片时是index,value//面向map时是key,value）
	var mapSlice = make([]map[string]string, 3)
	for index, value := range mapSlice {
		fmt.Printf("index:%d value:%v\n", index, value)
	}
	fmt.Println("after init")
```

## 3. switch 语句

### 3.1 常规单一判断

```go
	total := 3
	switch total {
	case 1:
		fmt.Println("第一级别")
	case 2:
		fmt.Println("第二级别")
	case 3:
		fmt.Println("第三级别")
	case 4:
		fmt.Println("第四级别")
	default:
		fmt.Println("其他级别")

	}
```

### 3.1 多数据判断

```go
	base := 3
	switch base {
	case 1, 3, 5, 7, 9:
		fmt.Println("奇数")
	case 2, 4, 6, 8, 10:
		fmt.Println("偶数")
	default:
		fmt.Println("其他")

	}
```

### 3.3 范围判断

```go
	mount := 30
	switch {
	case mount > 100:
		fmt.Println("数量很多")
	case mount < 10:
		fmt.Println("数量很少")
	default:
		fmt.Println("数量尚可")

	}
```
