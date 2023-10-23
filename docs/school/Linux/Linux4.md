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
   TODO 图片待上传云存储
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

//TODO 两张图关于 top 选项的

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
