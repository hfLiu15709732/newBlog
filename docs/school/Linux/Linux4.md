---
slug: util
title: Linux实用工具
tags: [Linux, 工具, 实用]
---

# Linux 实用工具

## 第一部分：各类小技巧

| 快捷键            | 功能描述           |
| ----------------- | ------------------ |
| `ctrl + c`        | 强制停止           |
| `ctrl + d`        | 退出或登出         |
| `history`         | 历史命令搜索       |
| `ctrl + a`        | 光标，跳到命令开头 |
| `ctrl + e`        | 跳到命令结尾       |
| `ctrl + 键盘左键` | 向左跳一个单词     |
| `ctrl + 键盘右键` | 向右跳一个单词     |
| `ctrl + l`        | 清空终端内容       |
| `clear`           | 清空终端内容       |

## 第二部分：软件安装

- centos 用 yum
- Ubuntu 可以用 apt
- 具体指令有

```shell
yum -y [install | remove  | search] 软件名称
apt -y [install | remove  | search] 软件名称
```

- install：安装
- remove：卸载
- search：搜索
- -y，自动确认，无需手动确认安装或卸载过程

## 第三部分：系统服务管控与软链接

### 3.1 systemctl 命令

Linux 系统很多软件（内置或第三方）均支持使用**systemctl**命令控制：启动、停止、开机自启

能够被 systemctl 管理的软件，一般也称之为：**服务**

```shell
systemctl start丨stop丨status | enable丨disable 服务名

# start 启动
# stop 关闭
# status 查看状态
# enable 开启开机自启
# disable 关闭开机自启


#•NetworkManager，主网络服务
#•network，副网络服务
#•firewalld，防火墙服务
#•sshd，ssh服务（FinalShell远程登录Linux使用的就是这个服务）
```

### 3.2 软链接 ln 命令

- 在系统中创建软链接，可以将文件、文件夹链接到其它位置。
- 类似 Windows 系统中的《快捷方式》。

```shell
ln -s 参数1 参数2

ln -s /etc/yum.conf ~/yum.conf
#（软链接文件，注意前面是l开头）
```

- -s 选项，创建软连接
- 参数 1：被链接的文件或文件夹
- 参数 2：要链接去的目的地

## 第四部分：日期与时区

### 4.1 date 命令

通过 date 命令可以在命令行中查看系统的时间

```shell
date -d [+格式化字符串］
date "+%Y-%m-%d %H-%M-%S"

# 展示时间加减
date -d "+1 day" "+%Y-%m-%d %H-%M-%S"
date -d "+1 year" "+%Y-%m-%d %H-%M-%S"
```

- -d 按照给定的字符串显示日期，一般用于日期计算
- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式
- %Y 年 %m 月 %d 日 %H 小时 %M 分钟 %S 秒 %s 时间戳

### 4.2 时区修改

```shell
# 输入一下代码即可实现
rm -f /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai/etc/localtime
```

- 使用 root 权限，执行如下命令，修改时区为 东八区时区
- 原理是：将系统自带的 `localtime` 文件删除，并将 `/usr/share/zoneinfo/Asia/Shanghai` 文件软链接为 localtime 文件即可

### 4.3 ntp 时间校准

ntp 程序启动后会自动帮助校准时间

```shell
sudo apt install ntp
systemctl start ntpd
systemctl enable ntpd
```

或者也可以**手动**校准时间

```shell
ntpdate -u ntp.aliyun.com #通过与阿里云提供的服务网址进行手动校准
```

## 第五部分：主机 IP 与固定虚拟地址 IP

### 5.1 主机 IP 相关

```shell
hostname
# 查询主机名等相关信息


hostnamectl set-hostname rose-Ubuntu
# 修改主机名


systemctl enable ntpd
```

### 5.2 固定虚拟地址 IP

直接使用虚拟机连接 linux 时，是通过**DHCP**实现对 Linux 的连接

**DHCP：**动态获取 IP 地址，即每次重启设备后都会获取一次，可能导致 IP 地址**频繁变更**

实现固定虚拟地址 IP 的步骤如下：

1. 在 VMware Workstation（或 Fusion）中配置 IP 地址网关和网段（IP 地址的范围）（网关 10.0.0.254，子网 10.0.0.0）
2. 在 Linux 系统中手动修改配置文件，固定 IP（3.4 部是怎样具体实现 2）
3. 使用 vim 编辑/etc/sysconfig/network-scripts/ifcfg-ens33 文件，填入如下内容：

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/%E5%9B%BA%E5%AE%9Aip1.png?q-sign-algorithm=sha1&q-ak=AKIDXlahdVTNQohAMR2C_-0iDj4f56ss1XjTIIIYsyBRxOz6yhha6PfuPzsIngDf_W5T&q-sign-time=1698030001;1698033601&q-key-time=1698030001;1698033601&q-header-list=host&q-url-param-list=ci-process&q-signature=8e81e603733e9aba74cbca10abdd35f70718f6e9&x-cos-security-token=BPYeRbTdgfNUS8UTwr25LnTvDGeC1IGa95344dd4d5f122a1e616cd6be378a90bj-spmTya4ly0RYkWbvVix4db9TIO4-uVJRhkz4wXFK1efpCRibafPSlPueB4wsumpUgOx7vuOV4Bf-lQjMDudkzV5msuXw37jXuTZvNFCk4aMn1ltVBG2PTykp0EQ-sYBOdtD1IbI26ThuRPOVCih_rvjrDqrG9mieNUs_pz4DJALmQp6ETcc_qNTEDuOnyhscGQrs0lIKsTgt8oD0IWTQ&ci-process=originImage)

4. 执行：重启网卡，执行 ifconfig 即可看到 ip 地址固定为

```shell
# 相关所需要的代码
vim /etc/sysconfig/network-scripts/ifcfg-ens33
systemctl 1 restart network
```

## 第六部分：网络传输

### 6.1 ping 命令

可以通过**ping**命令，检查指定的网络服务器是否是可联通状态

```shell
ping [-c num］ip或主机名
ping -c 10 www.baidu.com
```

- 选项：-c，检查的次数，不使用-c 选项，将无限次数持续检查
- 参数：ip 或主机名，被检查的服务器的 ip 地址或主机名地址

### 6.2 wget 命令

**wget** 是非交互式的文件下载器，可以在命令行内下载网络文件

```shell
wget -b url

wget http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
# 下载apache-hadoop 3.3.0版本
```

- 选项：-b，可选，后台下载，会将日志写入到当前工作目录的 wgetlog 文件

### 6.3 curl 命令

**curl**可以发送 http 网络请求，可用于：下载文件、获取信息等

```shell
curl -O url
```

- 选项：-O[大写 O]，用于下载文件，当 url 是下载链接时，可以使用此选项保存文件
- 参数：url，要发起请求的网络地址

### 6.4 端口相关理论知识

- 公认端口：1~1023，通常用于一些系统内置或知名程序的预留使用，如 SSH 服务的 22 端口，HTTPS 服务的 443 端口非特殊需要，不要占用这个范围的端口
- 注册端口：1024~49151，通常可以随意使用，用于松散的绑定一些程序\服务
- 动态端口：49152~65535，通常不会固定绑定程序，而是当程序对外进行网络链接时，用于临时使用。

### 6.5 nmap 命令

可以通过**nmap**命令去查看端口的占用情况

```shell
nmap 被查看的IP地址
nmap 127.0.0.1
```

### 6.5 netsta 命令

可以通过**netstat**命令，查看指定端口的占用情况

```shell
netstat  -anp | grep 端口号
netstat  -anp | grep 8080
```

## 第七部分：进程管理

### 7.1 ps 查看进程

可以通过**ps**命令查看 Linux 系统中的进程信息

```shell
ps -e
ps -f
```

- 选项：-e，显示出全部的进程
- 选项：-f，以完全格式化的形式展示信息（展示全部信息）
- 一般来说，固定用法就是：`ps -ef`列出全部进程的全部信息

下面是会展示出来的全部信息

| 项目  | 说明                                          |
| ----- | --------------------------------------------- |
| UID   | 进程所属的用户 ID                             |
| PID   | 进程的进程号 ID                               |
| PPID  | 进程的父 ID(启动此进程的其它进程)             |
| C     | 此进程的 CPU 占用率(百分比)                   |
| STIME | 进程的启动时间                                |
| TTY   | 启动此进程的终端序号,如显示 ? ,表示非终端启动 |
| TIME  | 进程占用 CPU 的时间                           |
| CMD   | 进程对应的名称或启动路径或启动命令            |

### 7.2 ps 查看指定进程

我们可以使用管道符配合`grep`来进行过滤，即可准确的找到 tail 命令的信息，如：

```shell
ps -ef | grep tail
```

- 过滤不仅仅过滤名称，进程号，用户 ID 等等，都可以被 `grep` 过滤哦
- 如：`ps -ef | grep 30001`，过滤带有 30001 关键字的进程信息（一般
  指代过滤 30001 进程号）

  ### 7.3 关闭进程

- 在 Windows 系统中，可以通过任务管理器选择进程后，点击结束进程从而关闭它。
- 同样，在 Linux 中，可以通过 kill 命令关闭进程。

```shell
kill [-9] 进程ID
```

- 选项：`-9`，表示强制关闭进程。不使用此选项会向进程发送信号要求其关闭，但是否关闭看进程自身的处理机制。

## 第八部分：主机状态管理

### 8.1 top 命令查看主机信息

- 可以通过 `top` 命令查看 CPU、内存使用情况，类似 Windows 的任务管理器
- 默认每 5 秒刷新一次，语法：直接输入`top`即可，按 q 或 ctrl + c 退出

```shell
top

ctrl+c
```

下面是会展示出来的全部信息的表格

| 项目                | 说明                                                                               |
| ------------------- | ---------------------------------------------------------------------------------- |
| top                 | 命令名称                                                                           |
| 20:35:45            | 当前系统时间                                                                       |
| up 3 min            | 启动了 3 分钟                                                                      |
| 2 users             | 2 个用户登录                                                                       |
| load                | 1、5、15 分钟负载(1 分钟负载 0.22,5 分钟负载 0.46,15 分钟负载 0.22,说明系统压力低) |
| Tasks               | 174 个进程                                                                         |
| 1 running           | 1 个进程子在运行                                                                   |
| 173 sleeping        | 173 个进程睡眠                                                                     |
| 0 个停止进程        | 0 个停止进程                                                                       |
| 0 个僵尸进程        | 0 个僵尸进程                                                                       |
| 1 kill [-9] 进程 ID | 杀死进程命令                                                                       |
| %Cpu(s)             | CPU 使用率                                                                         |
| us                  | 用户 CPU 使用率                                                                    |
| sy                  | 系统 CPU 使用率                                                                    |
| ni                  | 高优先级进程占用 CPU 时间百分比                                                    |
| id                  | 空闲 CPU 率                                                                        |
| wa                  | IO 等待 CPU 占用率                                                                 |
| hi                  | CPU 硬件中断率                                                                     |
| si                  | CPU 软件中断率                                                                     |
| st                  | 强制等待占用 CPU 率                                                                |
| Kib Mem             | 物理内存                                                                           |
| total               | 总量                                                                               |
| free                | 空闲                                                                               |
| used                | 使用                                                                               |
| buff/cache          | buff 和 cache 占用                                                                 |
| Kib Swap            | 虚拟内存(交换空间)                                                                 |
| total               | 总量                                                                               |
| free                | 空闲                                                                               |
| used                | 使用                                                                               |
| buff/cache          | buff 和 cache 占用                                                                 |

| 项目    | 说明                                                       |
| ------- | ---------------------------------------------------------- |
| PID     | 进程 id                                                    |
| USER    | 进程所属用户                                               |
| PR      | 进程优先级,越小越高                                        |
| NI      | 负值表示高优先级,正表示低优先级                            |
| VIRT    | 进程使用虚拟内存,单位 KB                                   |
| RES     | 进程使用物理内存,单位 KB                                   |
| SHR     | 进程使用共享内存,单位 KB                                   |
| S       | 进程状态(S 休眠,R 运行,Z 僵死状态,N 负数优先级,I 空闲状态) |
| %CPU    | 进程占用 CPU 率                                            |
| %MEM    | 进程占用内存率                                             |
| TIME+   | 进程使用 CPU 时间总计,单位 10 毫秒                         |
| COMMAND | 进程的命令或名称或程序文件路径                             |

### 8.2 复杂的 top 选项与交互式 top 选项

**TOP 的选项**

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/top%E9%80%89%E9%A1%B91.jpg?q-sign-algorithm=sha1&q-ak=AKIDKJDUlXoS-_9ZU_dt_D33Dpp_mKOtPmvumhvOj3KRnARU0BjDr5EdsAxpfeRD_Q6q&q-sign-time=1698030031;1698033631&q-key-time=1698030031;1698033631&q-header-list=host&q-url-param-list=ci-process&q-signature=141ff7cc522bd42eb93f412319a8be70626ced13&x-cos-security-token=BPYeRbTdgfNUS8UTwr25LnTvDGeC1IGaa262ab81f0f4be4f3c8d468748381014j-spmTya4ly0RYkWbvVix0kchAx0F-34OyBfo3VzHKA9g9mqJ1bwcc8cwyZlhhRLDURqeiihZcAyNjETWqveFu08xHCMdsDvzHIgWMx0PpB4wB0c1-8tZjMArnXWuoJmeG7Qyih59URY4x4NIaO8ObkWh4qiaDsHw3FELWIjA3ET6T1IcHWUpSp_1VidwCvyldpBrKIA0WDl-Y4OzfKTLg&ci-process=originImage)

**TOP 的交互式选项**

![](https://blog-use-1316646528.cos.ap-nanjing.myqcloud.com/Linux%E5%AD%A6%E4%B9%A0/top%E9%80%89%E9%A1%B92.jpg?q-sign-algorithm=sha1&q-ak=AKIDdsv6YxifMwirpibFSPYWZM9vpkNcmTgSLDGhjc-L2EO3Fp61cjXKqOartRrpGDyX&q-sign-time=1698030040;1698033640&q-key-time=1698030040;1698033640&q-header-list=host&q-url-param-list=ci-process&q-signature=a56824c5f7d45c2e6071d15dac6bb943c1999145&x-cos-security-token=kcfjdl4Ru4loEnOkgCXY2vxvQm6E4j4af4b60164b1c0120b72b20c3be257ca09EwCYY89fcFoChRS6BDDp-KhN8tVM3kDv18eZLDCukHq38aA8XoPoTEnU4v2ODUtHqISwlShekEh_2NU8_Br_apFjSXeNpSbOAm94Nn5Bel8GK_x0jK7xst3aEFQReCkytmmnqJBiPyXThmkIguDkcr-N4kQgOR1WoOJ5lWa8wTBrvWWnGmcD0GfkgSD14Xi_uDA0nqXxVpjVAyWYs-mDyg&ci-process=originImage)

### 8.3 磁盘信息监控命令

- 使用`df`命令，可以查看硬盘的使用情况
- •可以使用 `iostat` 查看 CPU、磁盘的相关信息

```shell
df [-h]

iostat [-x] [num1] [num2]
```

- 选项：-x，显示更多信息
- num1：数字，刷新间隔，num2：数字，刷新几次

下面是会展示出来的全部信息

| 项目                      | 说明                                       |
| ------------------------- | ------------------------------------------ |
| rqm/s                     | 每秒这个设备相关的读取请求数               |
| wrqm/s                    | 每秒这个设备相关的写入请求数               |
| rsec/s                    | 每秒读取的扇区数                           |
| wsec/s                    | 每秒写入的扇区数                           |
| df [-h]                   | 查看磁盘空间使用情况                       |
| iostat [-x] [num1] [num2] | 查看 IO 统计信息                           |
| rKB/s                     | 每秒发送到设备的读取请求数,KB 为单位       |
| wKB/s                     | 每秒发送到设备的写入请求数,KB 为单位       |
| avgrq-sz                  | 平均请求扇区的大小                         |
| avgqu-sz                  | 平均请求队列的长度                         |
| await                     | 每一个 IO 请求的处理的平均时间,单位是毫秒  |
| svctm                     | 平均每次设备 I/O 操作的服务时间,单位是毫秒 |
| %util                     | 磁盘利用率                                 |

其中主要关注 `rkb/s` 和 `wkb/s` 两个重要数据即可

### 8.4 网络状态信息监控

- 可以使用 `sar`命令查看网络的相关统计（sar 命令非常复杂，这里仅
  简单用于统计网络）

```shell
sar -n DEV num1 num2
```

- 选项：`-n`，查看网络，`DEV` 表示查看网络接口
- num1：刷新间隔（不填就查看一次结束），num2：查看次数（不填无限次数）

下面是会展示出来的全部信息的表格

| 项目     | 说明                             |
| -------- | -------------------------------- |
| IFACE    | 本地网卡接口的名称               |
| rxpck/s  | 每秒钟接受的数据包               |
| txpck/s  | 每秒钟发送的数据包               |
| rxKB/S   | 每秒钟接受的数据包大小,单位为 KB |
| txKB/S   | 每秒钟发送的数据包大小,单位为 KB |
| rxcmp/s  | 每秒钟接受的压缩数据包           |
| txcmp/s  | 每秒钟发送的压缩包               |
| rxmcst/s | 每秒钟接收的多播数据包           |

## 第九部分：上传与下载

### 9.1 借助 FinalShell 窗口实现

:::info

我们可以通过 FinalShell 工具，方便的和虚拟机进行数据交换。在 FinalShell 软件的下方窗体中，提供了 Linux 的文件系统视图，可以方便的：

- 浏览文件系统，找到合适的文件，右键点击下载，即可传输到本地电
  脑
- 浏览文件系统，找到合适的目录，将本地电脑的文件拓展进入，即可
  方便的上传数据到 Linux 中

:::

### 9.2 rz 、 sz 命令实现

- rz 命令，进行上传，语法：直接输入 rz 即可（速度很慢，大文件可以直接拖拽，会更快）
- sz 命令进行下载，语法：sz 要下载的文件

```shell
rz

sz "要下载的文件"
```

- 文件会自动下载到桌面的：fsdownload 文件夹中。
- 注意，rz、sz 命令需要终端软件支持才可正常运行，`FinalShell`、`SecureCRT`、`XShell`等常用终端软件均支持此操作

## 第十部分：压缩与解压

### 10.1 压缩格式简介

- zip 格式：Linux、Windows、MacOS，常用
- 7zip：Windows 系统常用
- rar：Windows 系统常用
- tar：Linux、MacOS 常用
- gzip：Linux、MacOS 常用
  在 Windows 系统中常用的软件如：winrar、bandizip 等软件，都支持各类常见的压缩格式
  在 Linux 系统中需要掌握操作：`tar`、`gzip`、`zip`这三种压缩格式及完成文件的压缩、解压操作。

:::info
Linux 和 Mac 系统常用有 2 种压缩格式，后缀名分别是：

- .tar，称之为 tarball，归档文件，即简单的将文件组装到一个.tar 的文件内，并没有太多文件体积的减少，仅仅是简单的封装
- .gz，也常见为.tar.gz，gzip 格式压缩文件，即使用 gzip 压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积

:::

### 10.2 tar 命令

```shell
tar -c -v -× -f  -z -C 参数1 参数2..．参数N

#tar压缩的常用组合为：
tar -cvf test.tar 1.txt 2.txt 3.txt       #将1.txt 2.txt 3.txt 压缩到test.tar文件内
tar -zcvf test.tar.gz 1.txt 2.txt 3.txt   #将1.txt 2.txt 3.txt 压缩到test.tar.gz文件内，使用gzip模式

#tar解压的常用组合为：
tar -xvf test.tar                              #解压test.tar，将文件解压至当前目录
tar -xvf test.tar -C /home/itheima             #解压test.tar，将文件解压至指定目录（/home/itheima）
tar -zxvf test.tar.gz -C /home/itheima         #以Gzip模式解压test.tar.gz，将文件解压至指定目录（/home/itheima）
```

- -c，创建压缩文件，用于压缩模式
- -v，显示压缩、解压过程，用于查看进度
- -x，解压模式
- -f，要创建的文件，或要解压的文件，-f 选项必须在所有选项中位置处于最后一个
- -z，gzip 模式，不使用-z 就是普通的 tarball 格式
- -C，选择解压的目的地，用于解压模式

- -z 选项如果使用的话，一般处于选项位第一个
- -f 选项，必须在选项位最后一个,后面直接接要创建的文件名
- -C 选项需要单独使用，和解压所需的其它参数分开

### 10.3 zip 压缩

可以使用`zip`命令，压缩文件为 zip 压缩包

```shell
zip -r 参数1 参数2.．参数N


zip test.zip a.txt b.txt c.txt        #将a.txt b.txt c.txt 压缩到test.zip文件内
zip -r test.zip test itheima a.txt    #将test、itheima两个文件夹和a.txt文件，压缩到test.zip文件内
```

- -r，被压缩的包含文件夹的时候，需要使用-r 选项，和 rm、cp 等命令
  的-r 效果一致

### 10.4 unzip 解压

使用`unzip`命令，可以方便的解压 zip 压缩包

```shell
unzip［-d]］参数


unzip test.zip                      #将test.zip解压到当前目录
unzip test.zip -d /home/itheima     #将test.zip解压到指定文件夹内（/home/itheima）
```

- -d，指定要解压去的位置，同 tar 的-C 选项
