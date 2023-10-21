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
