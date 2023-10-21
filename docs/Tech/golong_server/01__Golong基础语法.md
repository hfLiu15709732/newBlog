---
slug: Golong_base
title: 1. 基础语法
tags: [Golong, 语法基础]
---

# Golong 基础语法

## 1. 变量/常量

### 1.1 变量声明

:::info 声明格式
var 变量名 变量类型
:::

```go
var name string
var age int
var isOk bool
//单变量声明


var (
    a string
    b int
    c bool
    d float32
)
//批量声明


```

### 1.2 变量初始化

:::info 初始化格式
var 变量名 类型 = 表达式
:::

```go
var name string = "hfLiuX"
var age int = 20
//单变量初始化

var name, age = "hfliuX", 20
//批量声明


var name = "hfLiuX"
var age = 20
//自动类型推导


func foo() (int, string) {
	return 10, "Q1mi"
}

	x, _ := foo()
	_, y := foo()
	fmt.Println("x=", x)
	fmt.Println("y=", y)
    //匿名变量的应用，为了省略某个值
```

### 1.3 常量

```go
const pi = 3.1415
const e = 2.7182

const (
    pi = 3.1415
    e = 2.7182
)
const (
    n1 = 100
    n2
    n3
)//其中里面的n1，n2，n3都是100
```

### 1.4 Iota

:::info
iota 在 const 关键字出现时将被重置为 0。const 中每新增一行常量声明将使 iota 计数一次(iota 可理解为 const 语句块)
:::

```go
const (
		n1 = iota //0
		n2        //1
		n3        //2
		n4        //3
	)
//小案例1

const (
		n1 = iota //0
		n2 = 100  //100
		n3 = iota //2
		n4        //3
	)
const n5 = iota //0
//小案例2


const (
		a, b = iota + 1, iota + 2 //1,2
		c, d                      //2,3
		e, f                      //3,4
	)
//小案例3
```

## 2. 基本数据类型

### 2.1 整数进制转化问题

```go
	num1 := 20
	fmt.Printf("%b\n", num1) //二进制展示
	fmt.Printf("%d\n", num1) //十进制展示

	fmt.Println("--------------------------------------------")
	num2 := 075
	fmt.Printf("%d\n", num2) //八进制转还为十进制
	fmt.Printf("%o\n", num2) //八进制展示

	fmt.Println("--------------------------------------------")
	num3 := 0xff
	fmt.Printf("%d\n", num3) //十六进制转还为十进制
	fmt.Printf("%x\n", num3) //十六进制展示
```

### 2.2 浮点数相关

```go
	fmt.Println(math.MaxFloat32)
	fmt.Println(math.MaxFloat64)
	fmt.Printf("%f\n", math.Pi)
	fmt.Printf("%.9f\n", math.Pi) //展示小数点9位数据
```

### 2.3 布尔类型相关

1. 布尔类型变量的默认值为 false。
2. Go 语言中不允许将整型强制转换为布尔型.
3. 布尔型无法参与数值运算，也无法与其他类型进行转换。

### 2.3 字符串基础

**转义字符**

| 转义符 | 含义                     |
| ------ | ------------------------ |
| \r     | 回车符（返回行首）       |
| \n     | 换行符（直接跳到下一行） |
| \t     | 制表符                   |
| '      | 单引号                   |
| "      | 双引号                   |
| \      | 反斜杠                   |

**反引号问题**

:::info
Go 语言中要定义一个多行字符串时，就必须使用`反引号`字符：
:::

### 2.3 字符串 API 操作

| 方法                                 | 介绍           |
| ------------------------------------ | -------------- |
| len(str)                             | 求长度         |
| + 或 fmt.Sprintf                     | 拼接字符串     |
| strings.Split                        | 分割           |
| strings.Contains                     | 判断是否包含   |
| strings.HasPrefix, strings.HasSuffix | 前缀/后缀判断  |
| strings.Index(), strings.LastIndex() | 子串出现的位置 |
| strings.Join(a[]string, sep string)  | join 操作      |

### 2.4 byte 与 tune

:::info
遍历中文的字符串一定要使用 tune,使用 byte 会乱码
:::

```go

	s := "hello沙河"
	for i := 0; i < len(s); i++ { //byte的方式
		fmt.Printf("%v(%c) ", s[i], s[i])
	}
	fmt.Println()
	for _, r := range s { //rune的方式
		fmt.Printf("%v(%c) ", r, r)
	}
	fmt.Println()

```

### 2.5 字符串修改问题

:::info
要修改字符串，需要先将其转换成[]rune 或[]byte，完成后再转换为 string。无论哪种转换，都会重新分配内存，并复制字节数组。
:::

```go
package main

func main() {
	s1 := "big"
	// 强制类型转换
	byteS1 := []byte(s1)
	byteS1[0] = 'p'
	fmt.Println(string(byteS1))

	s2 := "白萝卜"
	runeS2 := []rune(s2)
	runeS2[0] = '红'
	fmt.Println(string(runeS2))
}

```

### 2.6 一般类型转化

:::info
Go 语言中只有强制类型转换，没有隐式类型转换。该语法只能在两个类型之间支持相互转换的时候使用。
:::

```go
//一般用于相同类型T之间的转化

f := 3.1415  // float64
i := int(f)  // 3


/ 要修改字符串，需要先将其转换成`[]rune或[]byte`，完成后再转换为`string`。
// 无论哪种转换，都会重新分配内存，并复制字节数组。
bs := "hello"
fmt.Printf("%x\n", &bs)  // 14000096010
bytebs := []byte(bs)  // 强制类型转换为[]byte 类型

bytebs[0] = 'H'       // 修改字符串第一个字符为 H
rbs := string(bytebs)
fmt.Printf("%x\n", &rbs) // 14000096020
fmt.Println(rbs)  // 输出：Hello 强类型转换为 string

rs := "你好"
runers := []rune(rs)  // 强制类型转换为[]rune 类型
runers[0] = '狗'      // 修改字符串第一个字符为 狗
fmt.Println(string(runers))  // 输出：狗好   强类型转换为 string

```

### 2.7 使用 strconv 包进行类型转化

1. 字符串转 int：Atoi()
2. int 转字符串: Itoa()
3. ParseTP 类函数将 string 转换为 TP 类型：ParseBool()、ParseFloat()、 ParseInt()、ParseUint()。因为 string 转其它类型可能会失败，所以这些函数都有第二个返回值表示是否转换成功
4. FormatTP 类函数将其它类型转 string：FormatBool()、FormatFloat()、FormatInt()、FormatUint()
5. AppendTP 类函数用于将 TP 转换成字符串后 append 到一个 slice 中：AppendBool()、AppendFloat()、AppendInt()、AppendUint()

```go
// 1. Itoa(): 实现Int类型转化为string类型
println("a" + strconv.Itoa(32))  // a32



// 2.Atoi()实现string类型转化为int类型
func Atoi(s string) (int, error)
//由于string可能无法转换为int，所以这个函数有两个返回值：第一个返回值是转换成int的值，第二个返回值判断是否转换成功。

//成功的案例
i,_ := strconv.Atoi("3")
println(3 + i)   // 6

// Atoi()转换失败
i,err := strconv.Atoi("a")
if err != nil {
    println("converted failed")
}



// 3. parse()函数将字符串转化为其他类型操作
//ParseBool()、ParseFloat()、ParseInt()、ParseUint()。

b, err := strconv.ParseBool("true")
f, err := strconv.ParseFloat("3.1415", 64)//只能接收float64类型的浮点数
i, err := strconv.ParseInt("-42", 10, 64)
u, err := strconv.ParseUint("42", 10, 64)


//而parseint和parseunit原型如下：
func ParseInt(s string, base int, bitSize int)

// 解释一：bitSize参数表示转换为什么位的int/uint，有效值为0、8、16、32、64。当bitSize=0的时候，表示转换为int或uint类型。例如bitSize=8表示转换后的值的类型为int8或uint8。

// 解释二：base参数表示以什么进制的方式去解析给定的字符串，有效值为0、2-36。当base=0的时候，表示根据string的前缀来判断以什么进制去解析：0x开头的以16进制的方式去解析，0开头的以8进制方式去解析，其它的以10进制方式解析。
```

## 3. 基础运算符

:::info
**Golong 支持一下操作运算符**

1. 算术运算符
2. 关系运算符
3. 逻辑运算符
4. 位运算符
5. 赋值运算符

操作基本和其他语言，没什么差别，大致看一下即可

:::

### 3.1 算数运算符

| 运算符 | 描述 |
| ------ | ---- |
| +      | 相加 |
| -      | 相减 |
| \*     | 相乘 |
| /      | 相除 |
| %      | 求余 |

:::danger 不同点
++（自增）和--（自减）在 Go 语言中是单独的语句，并不是运算符。
:::

### 3.2 关系运算符

| 运算符 | 描述                                                          |
| ------ | ------------------------------------------------------------- |
| ==     | 检查两个值是否相等，如果相等返回 True，否则返回 False         |
| !=     | 检查两个值是否不相等，如果不相等返回 True，否则返回 False     |
| >      | 检查左边值是否大于右边值，如果是返回 True，否则返回 False     |
| >=     | 检查左边值是否大于等于右边值，如果是返回 True，否则返回 False |
| <      | 检查左边值是否小于右边值，如果是返回 True，否则返回 False     |
| <=     | 检查左边值是否小于等于右边值，如果是返回 True，否则返回 False |

### 3.3 逻辑运算符

| 运算符 | 描述                                                                 |
| ------ | -------------------------------------------------------------------- |
| &&     | 逻辑 AND 运算符。如果两边的操作数都是 True，则为 True，否则为 False  |
| \|\|   | 逻辑 OR 运算符。如果两边的操作数有一个 True，则为 True，否则为 False |
| !      | 逻辑 NOT 运算符。如果条件为 True，则为 False，否则为 True            |

### 3.4 位运算符（不常用）

| 运算符 | 描述                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| &      | 参与运算的两数各对应的二进位相与。 （两位均为 1 才为 1）                                    |
| \|     | 参与运算的两数各对应的二进位相或。 （两位有一个为 1 就为 1）                                |
| ^      | 参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为 1。 （两位不一样则为 1） |
| <<     | 左移 n 位就是乘以 2 的 n 次方。 "a<<b"是把 a 的各二进位全部左移 b 位，高位丢弃，低位补 0。  |
| >>     | 右移 n 位就是除以 2 的 n 次方。 "a>>b"是把 a 的各二进位全部右移 b 位。                      |

### 3.5 赋值运算符

| 运算符 | 描述                                           |
| ------ | ---------------------------------------------- |
| =      | 简单的赋值运算符，将一个表达式的值赋给一个左值 |
| +=     | 相加后再赋值                                   |
| -=     | 相减后再赋值                                   |
| \*=    | 相乘后再赋值                                   |
| /=     | 相除后再赋值                                   |
| %=     | 求余后再赋值                                   |
| <<=    | 左移后赋值                                     |
| >>=    | 右移后赋值                                     |
| &=     | 按位与后赋值                                   |
| \|=    | 按位或后赋值                                   |
| ^=     | 按位异或后赋值                                 |
