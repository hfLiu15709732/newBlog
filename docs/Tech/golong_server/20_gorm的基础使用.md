---
slug: Gin_gorm1
title: 20. Gorm框架的基本使用1 🚧
tags: [Gin, Gorm, 数据库连接]
---

# Gorm 框架基础与模型相关

## 1. 理论介绍

:::info Gorm 特性

- 全功能 ORM
- 关联 (Has One，Has Many，Belongs To，Many To Many，多态，单表继承)
- Create，Save，Update，Delete，Find 中钩子方法
- 支持 `Preload`、`Joins` 的预加载
- 事务，嵌套事务，Save Point，Rollback To Saved Point
- Context、预编译模式、DryRun 模式
- 批量插入，FindInBatches，Find/Create with Map，使用 SQL 表达式、Context Valuer 进行 CRUD
- SQL 构建器，Upsert，数据库锁，Optimizer/Index/Comment Hint，命名参数，子查询
- 复合主键，索引，约束
- Auto Migration
- 自定义 Logger
- 灵活的可扩展插件 API：Database Resolver（多数据库，读写分离）、Prometheus…

:::

## 2. 框架安装

```bash

go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite

```

## 2. 快速入门介绍

```go

package main

import (
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
)

type Product struct {
  gorm.Model
  Code  string
  Price uint
}

func main() {
  db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }

  // 迁移 schema
  db.AutoMigrate(&Product{})

  // Create
  db.Create(&Product{Code: "D42", Price: 100})

  // Read
  var product Product
  db.First(&product, 1) // 根据整型主键查找
  db.First(&product, "code = ?", "D42") // 查找 code 字段值为 D42 的记录

  // Update - 将 product 的 price 更新为 200
  db.Model(&product).Update("Price", 200)
  // Update - 更新多个字段
  db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // 仅更新非零值字段
  db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

  // Delete - 删除 product
  db.Delete(&product, 1)
}

```

## 3. 一般模型定义

首先，GORM 定义一个 gorm.Model 结构体，其包括字段`ID`、`CreatedAt`、`UpdatedAt`、`DeletedAt`

```go

// gorm.Model 的定义
type Model struct {
  ID        uint           `gorm:"primaryKey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`//为实现软删除而设计的
}
//可以选择将他嵌入到你的结构体，也可以不弄
```

就像下面这样的结构体一样来绑定模型

```go
type Student struct {
	gorm.Model   //gorm框架定义的模型 里面包括 id，createdAt，updateAt，deleteAt
	Name         string
	Age          sql.NullInt64 `gorm:"column:stu_age"`
	Birthday     *time.Time
	Email        string  `gorm:"type:varchar(100);unique_index"`
	Role         string  `gorm:"size:255"`        // 设置字段大小为255
	MemberNumber *string `gorm:"unique;not null"` // 设置会员号（member number）唯一并且不为空
	Num          int     `gorm:"AUTO_INCREMENT"`  // 设置 num 为自增类型
	Address      string  `gorm:"index:addr"`      // 给address字段创建名为addr的索引
	IgnoreMe     int     `gorm:"-"`               // 忽略本字段
}
```

## 4. 字段权限控制

可导出的字段在使用 **GORM** 进行 **CRUD** 时拥有全部的权限，
此外，**GORM** 允许您用标签控制字段级别的权限。这样您就可以让一个字段的权限是只读、只写、只创建、只更新或者被忽略

```go

type User struct {
  Name string `gorm:"<-:create"` // 允许读和创建
  Name string `gorm:"<-:update"` // 允许读和更新
  Name string `gorm:"<-"`        // 允许读和写（创建和更新）
  Name string `gorm:"<-:false"`  // 允许读，禁止写
  Name string `gorm:"->"`        // 只读（除非有自定义配置，否则禁止写）
  Name string `gorm:"->;<-:create"` // 允许读和写
  Name string `gorm:"->:false;<-:create"` // 仅创建（禁止从 db 读）
  Name string `gorm:"-"`  // 通过 struct 读写会忽略该字段
  Name string `gorm:"-:all"`        // 通过 struct 读写、迁移会忽略该字段
  Name string `gorm:"-:migration"`  // 通过 struct 迁移会忽略该字段
}

```

## 5. 模型字段 Tag

上面那个 Student 的例子其实已经写了不少常用的，下面表格列出全部出来

| 标签名                 | 说明                                                                                                                                                                                                                                                                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column                 | 指定 db 列名                                                                                                                                                                                                                                                                                                                                     |
| type                   | 列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：`not null`、`size`, `autoIncrement`… 像 `varbinary(8)` 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：`MEDIUMINT UNSIGNED not NULL AUTO_INCREMENT` |
| serializer             | 指定将数据序列化或反序列化到数据库中的序列化器, 例如: `serializer:json/gob/unixtime`                                                                                                                                                                                                                                                             |
| size                   | 定义列数据类型的大小或长度，例如 `size: 256`                                                                                                                                                                                                                                                                                                     |
| primaryKey             | 将列定义为主键                                                                                                                                                                                                                                                                                                                                   |
| unique                 | 将列定义为唯一键                                                                                                                                                                                                                                                                                                                                 |
| default                | 定义列的默认值                                                                                                                                                                                                                                                                                                                                   |
| precision              | 指定列的精度                                                                                                                                                                                                                                                                                                                                     |
| scale                  | 指定列大小                                                                                                                                                                                                                                                                                                                                       |
| not null               | 指定列为 NOT NULL                                                                                                                                                                                                                                                                                                                                |
| autoIncrement          | 指定列为自动增长                                                                                                                                                                                                                                                                                                                                 |
| autoIncrementIncrement | 自动步长，控制连续记录之间的间隔                                                                                                                                                                                                                                                                                                                 |
| embedded               | 嵌套字段                                                                                                                                                                                                                                                                                                                                         |
| embeddedPrefix         | 嵌入字段的列名前缀                                                                                                                                                                                                                                                                                                                               |
| autoCreateTime         | 创建时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoCreateTime:nano`                                                                                                                                                                                                           |
| autoUpdateTime         | 创建/更新时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoUpdateTime:milli`                                                                                                                                                                                                     |
| index                  | 根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 [索引](https://gorm.io/zh_CN/docs/indexes.html) 获取详情                                                                                                                                                                                                                            |
| uniqueIndex            | 与 `index` 相同，但创建的是唯一索引                                                                                                                                                                                                                                                                                                              |
| check                  | 创建检查约束，例如 `check:age > 13`，查看 [约束](https://gorm.io/zh_CN/docs/constraints.html) 获取详情                                                                                                                                                                                                                                           |
| <-                     | 设置字段写入的权限， `<-:create` 只创建、`<-:update` 只更新、`<-:false` 无写入权限、`<-` 创建和更新权限                                                                                                                                                                                                                                          |
| ->                     | 设置字段读的权限，`->:false` 无读权限                                                                                                                                                                                                                                                                                                            |
| -                      | 忽略该字段，`-` 表示无读写，`-:migration` 表示无迁移权限，`-:all` 表示无读写迁移权限                                                                                                                                                                                                                                                             |
| comment                | 迁移时为字段添加注释                                                                                                                                                                                                                                                                                                                             |
