---
slug: Golong_list_api
title: 3. 切片
tags: [Golong, "数组", "切片", "map"]
---

# Golong 中的切片

## 1. 直接声明式的

```go
	//1. 直接声明切片类型
	var a []string              //声明一个字符串切片
	var b = []int{}             //声明一个整型切片并初始化
	var c = []bool{false, true} //声明一个布尔切片并初始化
	var d = []bool{false, true} //声明一个布尔切片并初始化
	fmt.Println(a)              //[]
	fmt.Println(b)              //[]
	fmt.Println(c)              //[false true]
	fmt.Println(d)
	fmt.Println(a == nil) //true
	fmt.Println(b == nil) //false
	fmt.Println(c == nil) //false
	// fmt.Println(c == d)   //切片是引用类型，不支持直接比较，只能和nil比较
```

## 2. 数组切出生成的

```go
	//2. 数组生成的切片
	arr1 := [9]int{1, 2, 3, 4, 5, 0, 0, 0, 0}
	slice1 := arr1[6:7]      // 由数组切出的切片
	fmt.Println(len(slice1)) //切片元素数量
	fmt.Println(cap(slice1)) //切片容量(数组开切的起始点到终点)

	//完整的数组切片
	t := arr1[1:3:5]
	fmt.Println(len(t)) //切片元素数量
	fmt.Println(cap(t)) //切片容量(第三个参数指明最多切到哪里)
```

## 3. make 函数构造生成的

```go
	//3. make函数构造切片
	//make([]T, size, cap)
	// 	T:切片的元素类型
	// size:切片中元素的数量
	// cap:切片的容量
	slice2 := make([]int, 2, 10)
	fmt.Println(slice2)      //[0 0]
	fmt.Println(len(slice2)) //2
	fmt.Println(cap(slice2)) //10
```

## 4. 切片判空

```go
		var s1 []int         //len(s1)=0;cap(s1)=0;s1==nil
		s2 := []int{}        //len(s2)=0;cap(s2)=0;s2!=nil
		s3 := make([]int, 0) //len(s3)=0;cap(s3)=0;s3!=nil
        /*
		4. 所以注意：所以要判断一个切片是否是空的，要是用len(s) == 0来判断，不应该使用s == nil来判断。
        */
```

## 5. 切片拷贝问题

:::info 注意 2：
切片属于引用类型 在拷贝时
拷贝前后两个变量共享底层数组，对一个切片的修改会影响另一个切片的内容
:::

## 6. 切片遍历

```go
	s := []int{1, 3, 5, 300, 786, 1982}

	for i := 0; i < len(s); i++ {
		fmt.Println(s[i])
	}

	for _, value := range s {
		fmt.Println(value)
	}

```

## 7. append()添加切片元素

```go
	//7. append()添加切片元素
	var sar []int
	sar = append(sar, 1)       // [1]
	sar = append(sar, 2, 3, 4) // [1 2 3 4]
	sar2 := []int{5, 6, 7}
	sar = append(sar, sar2...) // [1 2 3 4 5 6 7
```

## 8. 切片扩容策略

:::info 注意点 3：
当底层数组不能容纳新增的元素时，切片就会自动按照一定的策略进行“扩容”，此时该切片指向的底层数组就会更换。“扩容”操作往往发生在 append()函数调用时，所以我们通常都需要用原变量接收 append 函数的返回值。
:::

1. 首先判断，如果新申请容量（cap）大于 2 倍的旧容量（old.cap），最终容量（newcap）就是新申请的容量（cap）。
2. 否则判断，如果旧切片的长度小于 1024，则最终容量(newcap)就是旧容量(old.cap)的两倍，即（newcap=doublecap），
3. 否则判断，如果旧切片长度大于等于 1024，则最终容量（newcap）从旧容量（old.cap）开始循环增加原来的 1/4，即（newcap=old.cap,for {newcap += newcap/4}）直到最终容量（newcap）大于等于新申请的容量(cap)，即（newcap >= cap）
4. 如果最终容量（cap）计算值溢出，则最终容量（cap）就是新申请容量（cap）。
5. 切片扩容还会根据切片中元素的类型不同而做不同的处理，比如 int 和 string 类型的处理方式就不一样。

## 9. copy()函数实现深拷贝切片

```go
	// copy()复制切片
	numA := []int{1, 2, 3, 4, 5}
	numC := make([]int, 5, 5)
	copy(numC, numA)  //使用copy()函数将切片a中的元素复制到切片c
	fmt.Println(numA) //[1 2 3 4 5]
	fmt.Println(numC) //[1 2 3 4 5]
	numC[0] = 1000
	fmt.Println(numA) //[1 2 3 4 5]
	fmt.Println(numC) //[1000 2 3 4 5]

```

## 10. 切片元素删除

```go
	//Go语言中并没有删除切片元素的专用方法，我们可以使用切片本身的特性来删除元素。 代码如下：
	// 从切片中删除元素
	numD := []int{30, 31, 32, 33, 34, 35, 36, 37}
	// 要删除索引为2的元素
	numD = append(numD[:2], numD[3:]...)
	fmt.Println(numD) //[30 31 33 34 35 36 37]

```

## 11. 小案例 1：

```go
	//题目：请使用内置的sort包对数组var a = [...]int{3, 7, 8, 9, 1}进行排序

	var arrPre = [...]int{3, 7, 8, 9, 1}
	sliceAfter := arrPre[:]
	sort.Ints(sliceAfter)
	fmt.Println(sliceAfter)

```

## 2.Map
