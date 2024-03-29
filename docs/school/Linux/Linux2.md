---
slug: commandAndBase
title: Linux命令初步与基础理论
tags: [Linux, base, 命令]
---

# Linux 命令初步与基础理论

## 第一部分：基础理论

### 1.1 Linux 内核

:::info
Linux 系统由 Linux 系统内核、系统级应用程序 两部分组成
:::
![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/linux%E5%86%85%E6%A0%B81.png?q-sign-algorithm=sha1&q-ak=AKID4CR-_k8rHP8S6Iwn2zOAu8-LOGkImLShtdHi1_PrjXrmYf1mlxrj6a1IO0UdHOQd&q-sign-time=1698029672;1698033272&q-key-time=1698029672;1698033272&q-header-list=host&q-url-param-list=ci-process&q-signature=8ef057d7ed13e963b7a53fd2a0f67d71aaba77fe&x-cos-security-token=BPYeRbTdgfNUS8UTwr25LnTvDGeC1IGa3c4efc6d9e5bc62e44b2bbe516b044c0j-spmTya4ly0RYkWbvVix7U1mf4ohnV-PWgcZ-O6Y_PU_nswRmT2QedD6Zb1oJwO_IA34nwnn-w55pf2CFxO3-yTRF9u6Tay4m-fvsCT7DkhMmn_MxCm6Lro1HfdslZ_tHDAQ8NnjSdzpcnnP-pOa5ceBsRlrS9TI8YvTQCx8HEZYb23pYTt_fF1RQYaKx3GK0DTR9o4_5QY_C99u4JsGQ&ci-process=originImage)

- 内核提供系统最核心的功能，如：调度 CPU、调度内存、调度文件系
  统、调度网络通讯、调度 IO 等

- 系统级应用程序，可以理解为出厂自带程序，可供用户快速上手操作
  系统，如：文件管理器、任务管理器、图片查看、音乐播放等。
- 比如，播放音乐，无论用户使用自带音乐播放器或是自行安装的第三
  方播放器均是由播放器程序，调用内核提供的相关功能，由内核调度
  CPU 解码、音响发声等

### 1.2 Linux 发行版

:::info
内核是免费、开源的，这也就代表了：任何人都可以获得并修改内核，并且自行集成系统级程序,

而 Linux 发行版就是提供了内核+系统级程序的完整封装
:::

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/linux%E5%8F%91%E8%A1%8C%E7%89%881.jpg?q-sign-algorithm=sha1&q-ak=AKIDq1d-7A5tryWnBFpKMZ_YyF3RnZJuHQq18iy0ezGWrRxW_q5-DPEugZmQxJVUEl4g&q-sign-time=1698029743;1698033343&q-key-time=1698029743;1698033343&q-header-list=host&q-url-param-list=ci-process&q-signature=d4e95e45ae915e9c57f542a1de22f77a63d0f145&x-cos-security-token=BPYeRbTdgfNUS8UTwr25LnTvDGeC1IGa35848cba955be89f0cb2d84b4d51dec1j-spmTya4ly0RYkWbvVix4eutGAJK3D0x0iubAUA53biLs3e4N8HC22ODKZN9p1DYnqbiQqr-leqoQN8YfDON0K_pgFAdp3ffBUa1Jv4EB7aIW0b5akorIoeWo8I_x2PqvQ2gz58vStYVrZGR1_cVKDu7xBsZzB7Juu190c6Td1xwFx7FBBStFvamSkKMp0g_C2JV6sAaZ7rqU2xbr_dyw&ci-process=originImage)
![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/linux%E5%8F%91%E8%A1%8C%E7%89%882.jpg?q-sign-algorithm=sha1&q-ak=AKIDRtGB5kqUsriYC-Z0VKllGiqecmydcepy3ElSClMyXglpqDusTNNcxruF_xFiTxhG&q-sign-time=1698029752;1698033352&q-key-time=1698029752;1698033352&q-header-list=host&q-url-param-list=ci-process&q-signature=37bf02c00877100bd6f14393dc4974c91a799ff4&x-cos-security-token=kcfjdl4Ru4loEnOkgCXY2vxvQm6E4j4adc1eea2501bc0818428fd7772a259892EwCYY89fcFoChRS6BDDp-FN67D87W5jYZX4o22_TQ9xZLcuATbJ54OjsXgSJfL7qib2dqVNZpT531p9yatQdIaXEZbEoVuNxVQk4WIgt4lJRqtYI6FlP2o585wvqJsBoaZ7m3GlxNBFtISzQ9-ft-AfImNHdEGnr48LUAM-6VjMjyzkBHoX_AtCWtEcn8UhruRfR5ulPUMEkgqaKsK3Nyw&ci-process=originImage)

### 1.3 FinalShell 与虚拟机快照

:::note
FinalShell 是通过 Linux 的 IP 地址并实现远程连接的程序
:::

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%BF%AB%E7%85%A7.jpg?q-sign-algorithm=sha1&q-ak=AKID9lHEmk4anPXdcaTO60HDMpIJpJ5TuPBNxxV2vf_wKp12iDoOp1km81WZWl5ftWBe&q-sign-time=1698029806;1698033406&q-key-time=1698029806;1698033406&q-header-list=host&q-url-param-list=ci-process&q-signature=94c94d0dbe1f0ed6c7fec0406333f74d755412c0&x-cos-security-token=kcfjdl4Ru4loEnOkgCXY2vxvQm6E4j4a3f265728c7b0679ea10b07cc5dd5db62EwCYY89fcFoChRS6BDDp-Gw9hJEBjoWaE462s8EOVZo-4KE119sUncVzcDrFhlK2KuoUBvRCMY2jw_w2YaTQa_g2ymVHh4T5-c8p5nWQZMGSXmq_7XzBiH7TXoOuR8dnoNtrJ2i-IUxA_p-cUOQDd4nStt2WSoxvOBc4xxWPqx6Z4mTItsgi5xskXL2kcPoj&ci-process=originImage)

**步骤实现：**

1. 在 Linux 操作系统中，桌面空白右键点击：open in terminal
2. 输入 ifconfig ，即可看到 IP 地址
3. 在 FinalShell 中配置好 IP 地址，账号密码后即可连接成功

**虚拟机快照：**

通过快照将当前虚拟机的状态保存下来，在以后可以通过快照恢复虚拟机到保存的状态。

## 第二部分：ls/cd/pwd 命令

### 2.1 ls 命令

ls 命令的作用是列出目录下的内容

```shell
ls -a Linux路径
ls -l Linux路径
ls -h Linux路径
```

- -a 选项，表示：all 的意思，即列出全部文件（包含隐藏的文件/文件夹）
- -l 选项，表示：以列表（竖向排列）的形式展示内容，并展示更多信息
- -h 表示以易于阅读的形式，列出文件大小，如 K、M、G
- 注意：-h 选项必须要搭配 -l 一起使用
- 选项可以进行搭配的组合式写法：如：-alf 顺序没关系，不分指令是有的，如 tar zip 之类的

### 2.2 cd 命令

cd 是用来进行切换工作目录，当 Linux 终端进行时，会默认以用户的 HOME 目录作为当前的工作目录

```shell
cd  "[Linux路径］"
```

- cd 命令直接执行，不写参数，表示回到用户的 HOME 目录

### 2.3 pwd 命令

pwd 是用查看当前工作目录

```shell
pwd
```

### 2.4 相对路径与绝对路径问题

- Linux 中相对路径就是在本级目录之上直接写对应路径，头部不写/
- 绝对路径就是以/开头的根路径地址
- ./表示当前目录
- ../表示上一级目录
- ../../表示上两级目录
- ~/表示直接从 Homo 目录开始

## 第三部分：文件操作命令（1）

### 3.1 mkdir 命令

mkdir 命令是用来创建新的目录（文件夹）

```shell
mkdir -p "Linux路径"
```

- -p 选项可选，表示自动创建不存在的父目录，适用于创建连续多层级的目录
- 注意：创建文件夹需要修改权限，请确保操作均在 HOME 目录内，不要在 HOME 外操作涉及到权限问题，HOME 外无法成功

### 3.2 touch 命令

touch 命令是用来**创建文件**

```shell
touch Linux路径
```

- touch 命令无选项，参数`必填`，表示要创建的文件路径，相对、绝对、特殊路径符均可以使用

### 3.3 cat 命令

cat 命令是用来**读取文件**

```shell
cat Linux路径
```

- cat 同样没有选项，只有`必填参数`，参数表示：被查看的文件路径，相对、绝对、特殊路径符都可以使用

### 3.4 more 命令

cat 命令也是用来**读取文件**

```shell
more Linux路径
```

- cat 是直接将内容全部显示出来
- more 支持翻页，如果文件内容过多，可以一页页的展示
- 同样没有选项，只有`必填参数`，参数表示：被查看的文件路径，相对、绝对、特殊路径符都可以使用
- 空格翻页 q 退出查看

## 第四部分：文件操作命令（2）

### 4.1 cp 命令

cp 命令是用来**复制文件/文件夹**

```shell
cp -r 参数1 参数2
```

- -r 选项，可选，用于复制文件夹使用，表示递归
- 参数 1，Linux 路径，表示被复制的文件或文件夹
- 参数 2，Linux 路径，表示要复制去的地方

### 4.2 mv 命令

mv 命令是用来**移动文件\文件夹**

```shell
mv 参数1 参数2
```

- 参数 1，Linux 路径，表示被移动的文件或文件夹
- 参数 2，Linux 路径，表示要移动去的地方，如果目标不存在，则进行改名，确保目标存在

### 4.3 rm 命令

rm 命令是用来**删除文件\文件夹**

```shell
rm -f 参数1 参数2．.参数N
rm -r 参数1 参数2．.参数N
```

- 同 cp 命令一样， -r 选项用于删除文件夹
- -f 表示 force，强制删除（不会弹出提示确认信息）
- 参数 1、参数 2、......、参数 N 表示要删除的文件或文件夹路径，按照空格隔开【无限数量的参数】
- 普通用户删除内容不会弹出提示，只有 root 管理员用户删除内容会有提示，所以一般普通用户用不到 -f 选项

### 4.4 通配符问题

- rm 命令支持通配符 \*，用来做模糊匹配
- 符号 \* 表示通配符，即匹配任意内容（包含空），
- test\*，表示匹配任何以 test 开头的内容
- \*test，表示匹配任何以 test 结尾的内容
- \*test\*，表示匹配任何包含 test 的内容

## 第五部分：查找命令

### 5.1 which 命令

which 命令是用来**查找命令**

:::info
Linux 命令，其实它们的本体就是一个个的二进制可执行程序。

和 **Windows** 系统中的**.exe** 文件，是一个意思。

同时，我们可以通过 which 命令，查看所使用的一系列命令的程序文件存放在哪里
:::

```shell
which 要查找的命令
```

### 5.2 find 命令

find 命令是用来**查找文件**

```shell
find 起始路径 -name “被查找文件名”
find 起始路径 -size +|-n[kMG] #（ | 代表或者的意思，不用实际打在命令行中）
```

- +、- 表示大于和小于
- n 表示大小数字
- kMG 表示大小单位，k(小写字母)表示 kb，M 表示 MB，G 表示 GB
- 示例一：查找小于 10KB 的文件： find / -size -10k
- 示例二：查找大于 100MB 的文件：find / -size +100M
- 示例三：查找大于 1GB 的文件：find / -size +1G

## 第六部分：信息过滤统计命令

### 6.1 grep 命令

grep 命令用来从文件中通过**关键字过滤文件行**。

```shell
grep -n 关键字 文件路径
```

- -n，可选，表示在结果中显示匹配的行的行号。
- 参数，关键字，必填，表示过滤的关键字，带有空格或其它特殊符号，建议使用 ” ” 将关键字包围起来
- 参数，文件路径，必填，表示要过滤内容的文件路径，可作为内容输入端口（就是使用管道符）

### 6.2 wc 命令

wc 命令用来从文件中通过**数量统计（行数/单词数等等）**。

```shell
wc -c 文件路径
wc -m 文件路径
wc -1 文件路径
wc -w 文件路径
```

- 选项，-c，统计 bytes 数量
- 选项，-m，统计字符数量
- 选项，-l，统计行数
- 选项，-w，统计单词数量
- 参数，文件路径，被统计的文件，可作为内容输入端口（就是使用管道符）

### 6.3 管道符

将管道符左边命令的结果，作为右边命令的输入

```shell
# cat text.txt的输出结果（文件内容）作为右边grep命令的输入（被过滤文件）
cat text.txt | grep lhf

# 统计文件中带有itcast关键字的有几行：
cat test.txt | grep itcast |wc -l

# 统计文件中带有itheima关键字的结果中有多少个单词
cat test.txt | grep itheima |wc -w
```

- 选项，-c，统计 bytes 数量
- 选项，-m，统计字符数量
- 选项，-l，统计行数
- 选项，-w，统计单词数量
- 参数，文件路径，被统计的文件，可作为内容输入端口（就是使用管道符）

## 第七部分：其他命令

### 7.1 echo 命令

echo 命令用来在命令行内**输出指定内容**

```shell
echo 输出的内容
echo `pwd`
```

- 无需选项，只有一个参数，表示要输出的内容，复杂内容可以用 ” ”包围
- 反引号包围命令语句，例如：包围 pwd 这样的获得内容语句,像代码块的第二句那样

### 7.2 反引号符

反引号包围命令语句，例如：包围 pwd 这样的获得内容语句,代表执行 pwd，而不是吧 pwd 当成字符串

```shell
echo `pwd`
```

### 7.3 重定向符

重定向符：`>`和`>>`

```shell
# > 表示 将左侧命令的结果，覆盖写入到符号右侧指定的文件中
# >> 将左侧命令的结果，追加写入到符号右侧指定的文件中
echo 'hello world' >> test.txt
cat base.txt > test.txt
```

### 7.4 tail 命令

wc 命令是用来**查看文件尾部内容，跟踪文件的最新更改**。

```shell
tail  -f  Linux路径
tail -num Linux路径
```

- 参数，Linux 路径，表示被跟踪的文件路径
- 选项 -f，表示持续跟踪文件的更改，退出必须使用 `ctrl+c` 停止命令来解除
- 选项 -num，表示，查看尾部多少行，不填默认 10 行

## 第八部分：Vim 编辑器

### 8.1 工作原理图

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/vim%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E5%9B%BE1.jpg?q-sign-algorithm=sha1&q-ak=AKIDj4RrIGZaXzJ0qn-3K66cBH-FJtQNW_kWUzPFU3tJ0JX34R-GPTxVWo-QEOWDSmUl&q-sign-time=1698029960;1698033560&q-key-time=1698029960;1698033560&q-header-list=host&q-url-param-list=ci-process&q-signature=279ea6694b1f0081ec8828d2012af17c53b24c27&x-cos-security-token=BPYeRbTdgfNUS8UTwr25LnTvDGeC1IGad38dfc72173ae2fe9f276e302b8d82c5j-spmTya4ly0RYkWbvVix7X3rcRJdiu6yXYSzN1tvyShuDvFDPgUFuzFJKbLfaMJoDPChoxul-2DswTdZ3Scxm9miJegQmvrv0vQhO_OJgfiVoeaVRVvlzUt53AQQf4z3PeiVf3-jKP3VzqI6qPZVoCL27zXjj0YUneDuPywGVI51so58yG6sxgei-oZBHytYqVox9rSyhmSAQ7eeYLa1Q&ci-process=originImage)

### 8.2 快速使用

```shell
vi 文件路径
vim 文件路径
```

**整体一套流程就是：**

1. 先 vim 进入命令模式
2. 然后按下 `i`进入输入模式
3. 编辑完成后，按下`ESC `返回命令模式
4. 按下`:`进入底线命令模式
5. 输入`wq`保存并退出 vim 编辑器

### 8.3 底线命令模式选项

| 快捷键        | 功能描述                          |
| ------------- | --------------------------------- |
| `wq`          | 保存并退出文件,相当于`:wq`命令    |
| `q`           | 退出文件但不保存,相当于`:q!`命令  |
| `q!`          | 强制退出文件但不保存,忽略任何修改 |
| `w`           | 保存文件但不退出,相当于`:w`命令   |
| `set nu`      | 打开行号显示功能                  |
| `set nonu`    | 关闭行号显示功能                  |
| `set paste`   | 进入粘贴模式,用于粘贴时不自动缩进 |
| `set nopaste` | 退出粘贴模式,取消`set paste`效果  |

### 8.3 进入插入模式快捷键

| 快捷键 | 功能描述                 |
| ------ | ------------------------ |
| `i`    | 在光标位置前插入文本     |
| `I`    | 在行首插入文本           |
| `a`    | 在光标位置后插入文本     |
| `A`    | 在行尾插入文本           |
| `o`    | 在光标下面插入一个新行   |
| `O`    | 在光标上面插入一个新行   |
| `esc`  | 从插入模式切换回命令模式 |

### 8.4 命令模式快捷键

| 快捷键 | 功能描述                       |
| ------ | ------------------------------ |
| `h`    | 向左移动光标                   |
| `j`    | 向下移动光标                   |
| `k`    | 向上移动光标                   |
| `l`    | 向右移动光标                   |
| `w`    | 向前跳转一个单词               |
| `b`    | 向后跳转一个单词               |
| `0`    | 跳转到行首                     |
| `^`    | 跳转到行首非空字符位置         |
| `$`    | 跳转到行尾                     |
| `gg`   | 跳转到文件首行                 |
| `G`    | 跳转到文件尾行                 |
| `dgg`  | 删除从当前行到文件首行的所有行 |
| `d0`   | 删除从光标位置到当前行首的内容 |
| `d$`   | 删除从光标位置到当前行尾的内容 |
| `dG`   | 删除从当前行到文件尾行的所有行 |
