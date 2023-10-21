---
slug: Golong_map
title: 4. Map
tags: [Golong, map, 映射]
---

# Golong 中的 Map

## 1. 声明式定义与创建

```go

	//1. 声明式定义与创建

	nameMap := map[int]string{
		1: "hfliux",
		2: "future",
		3: "blog",
	}
	fmt.Println(nameMap)
```

## 2. make 函数进行创建

```go
	//2. make函数进行创建

	scoreMap1 := make(map[string]int, 8)
	scoreMap1["张三"] = 90
	scoreMap1["小明"] = 100
	fmt.Println(scoreMap1)
	fmt.Println(scoreMap1["小明"])
```

## 3. 判断键值是否存在

```go

	//3. 判断键值是否存在

	pwdMap := map[int]string{
		1: "lhf17777",
		2: "blog165",
		3: "admin123",
	}
	value, ok := pwdMap[18]
	if ok {
		fmt.Println(value)
	} else {
		fmt.Println("未有该用户")
	}
```

## 4. map 的遍历

```go
	//4. map的遍历
	for key, value := range nameMap {
		fmt.Println(fmt.Sprintf("%d", key) + "---" + value)
	}
```

## 5. delete()函数删除 map 的元素

```go
	/*
		5. delete()函数删除map的元素
	*/
	cityMap := map[int]string{
		1: "北京",
		2: "上海",
		3: "广州",
		4: "深圳",
	}
	delete(cityMap, 2)
	fmt.Println(cityMap)
```

## 6. 小案例 1：按顺序遍历 map

```go

	rand.Seed(time.Now().UnixNano()) //初始化随机数种子

	var scoreMap = make(map[string]int, 200)

	for i := 0; i < 100; i++ {
		key := fmt.Sprintf("stu%02d", i) //生成stu开头的字符串
		value := rand.Intn(100)          //生成0~99的随机整数
		scoreMap[key] = value
	}
	//取出map中的所有key存入切片keys
	var keys = make([]string, 0, 200)
	for key := range scoreMap {
		keys = append(keys, key)
	}
	//对切片进行排序
	sort.Strings(keys)
	//按照排序后的key遍历map
	for _, key := range keys {
		fmt.Println(key, scoreMap[key])
	}
```

## 7. 小案例 2：元素为 map 的切片

```go

	var mapSlice = make([]map[string]string, 3)
	for index, value := range mapSlice {
		fmt.Printf("index:%d value:%v\n", index, value)
	}
	fmt.Println("after init")
	// 对切片中的map元素进行初始化
	mapSlice[0] = make(map[string]string, 10)
	mapSlice[0]["name"] = "小王子"
	mapSlice[0]["password"] = "123456"
	mapSlice[0]["address"] = "沙河"
	for index, value := range mapSlice {
		fmt.Printf("index:%d value:%v\n", index, value)
	}
```

## 8. 小案例 3：元素为切片的 map

```go
	var sliceMap = make(map[string][]string, 3)
	fmt.Println(sliceMap)
	fmt.Println("after init")
	preKey := "中国"
	val, ok := sliceMap[preKey]
	if !ok {
		val = make([]string, 0, 2)
	}
	val = append(val, "北京", "上海")
	sliceMap[preKey] = val
	fmt.Println(sliceMap)
```
