---
slug: Gin_gorm2
title: 21. 基于Gin+Gorm的增删改查 🚧
tags: [Gin, Gorm, 增删改查, CRUD]
---

# 基于 Gin+Gorm 的增删改查

## 1. 增加

### 1.1 插入单条记录

```go

user := User{Name: "Jinzhu", Age: 18, Birthday: time.Now()}

result := db.Create(&user) // 通过数据的指针来创建

user.ID             // 返回插入数据的主键
result.Error        // 返回 error
result.RowsAffected // 返回插入记录的条数


```

### 1.2 插入多条记录

```go
users := []*User{
    User{Name: "Jinzhu", Age: 18, Birthday: time.Now()},
    User{Name: "Jackson", Age: 19, Birthday: time.Now()},
}

result := db.Create(users) // pass a slice to insert multiple row

result.Error        // returns error
result.RowsAffected // returns inserted records count


```

### 1.3 约束式插入

```go

db.Select("Name", "Age", "CreatedAt").Create(&user)//只插入name age createdat字段部分

db.Omit("Name", "Age", "CreatedAt").Create(&user)//除了name age createdat字段部分，其他字段都插入
```

### 1.4 项目快速添加

```go

db.Select("Name", "Age", "CreatedAt").Create(&user)//只插入name age createdat字段部分

db.Omit("Name", "Age", "CreatedAt").Create(&user)//除了name age createdat字段部分，其他字段都插入
```

## 2. 删除

### 2.1 删除单条记录

### 2.2 删除多条记录

### 2.3 根据主键删除记录

### 2.4 软删除机制与记录找回

## 3. 修改

### 3.1 全字段更新

### 3.2 更新单列

### 3.3 更新多列

### 3.4 批量记录更新

### 3.5 太多了 看官方文档把

## 4. 查询

### 4.1 查询单条记录

### 4.2 查询多条记录

### 4.3 根据主键查询记录

### 4.4 条件查询

### 4.5 其他复杂查询（用 sql 吧）

## 5. 使用原生 SQL 语句

### 5.1 一般且最常用的形式

1. 使用 `raw` 函数来执行原生 sql 语句
2. 并将结果通过 `scan` 函数扫描到模型中去

```go

type Result struct {
  ID   int
  Name string
  Age  int
}

var result Result
db.Raw("SELECT id, name, age FROM users WHERE id = ?", 3).Scan(&result)

db.Raw("SELECT id, name, age FROM users WHERE name = ?", "jinzhu").Scan(&result)

var age int
db.Raw("SELECT SUM(age) FROM users WHERE role = ?", "admin").Scan(&age)

var users []User
db.Raw("UPDATE users SET name = ? WHERE age = ? RETURNING id, name", "jinzhu", 20).Scan(&users)


```
