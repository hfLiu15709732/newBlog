---
title: 5. 数据库连接
tags: [简介, 课程分享,期末速成]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 数据库连接

## 第一部分：基本理论

:::tip

**数据库连接池**：

- 连接池是一组可重复使用的数据库连接对象，用于处理数据库请求。
- 在启动应用程序时，连接池会预先创建一定数量的数据库连接，并将它们保存在内存中，以备后续使用。
- 当应用程序需要与数据库进行通信时，它可以从连接池中获取一个空闲的连接，并将其分配给相应的请求。
- 完成数据库操作后，应用程序将连接返回到连接池中，以便其他请求可以继续使用该连接。
- 连接池有助于减少每个请求的连接和断开开销，并提高数据库操作的性能和效率。

**数据库会话连接**：

- 会话连接是在应用程序与数据库之间建立的一次性连接。
- 当应用程序需要与数据库进行通信时，它会通过建立一个新的数据库连接来创建一个会话连接。
- 一旦完成了数据库操作，应用程序关闭会话连接，即断开与数据库的连接。

**区别和使用场景**：

- 连接池适用于长期运行的应用程序，例如Web服务器，它需要处理多个并发请求。连接池预先创建了一组数据库连接，并可以重复使用这些连接，从而避免了频繁的连接和断开操作，提高了性能和效率。
- 会话连接适用于短期运行的应用程序，例如命令行工具或脚本。每次运行时都需要与数据库进行通信，因此可选择创建一个会话连接来执行所需的数据库操作。
:::


## 第二部分：连接池使用

:::info
koa中连接数据库需要`mysql`或者`myslq2`这个库
:::

### 2.1 第一步：创建连接池与封装query方法：

```js
const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database'
});

// 执行查询操作
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, values, (err, rows) => {
        connection.release();

        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

module.exports = {
  query
};

```

### 2.2 第二步：调用query方法：


```js
const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database'
});

// 执行查询操作
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, values, (err, rows) => {
        connection.release();

        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

module.exports = {
  query
};

```

