---
slug: html_base
title: 1. HTML基本标签
tags: [简介, 课程分享,期末速成]
---


# HTML基础

## 第一部分：基本结构


在HTML基本结构中，一般只有6个特殊标签能放在**head标签**内。

1. title标签
2. meta标签
3. link标签
4. style标签
5. script标签
6. base标签


```html
<!DOCTYPE html>
<html>
<head>
    <!--网页关键字-->
    <meta  name="keywords" content="峰哥博客,博客,计算机" />
    <!--网页描述-->
    <meta  name="description" content="峰哥博客是一个xxxx的博客" />
    <!--本页作者-->
    <meta  name="author" content="hfLiuX" />
    <!--版权声明-->
    <meta  name="copyright" content="内容进制转载" />
    <!--自动跳转标签-->
    <meta  http-equiv="refresh" content="6;url=http://www.bilibili.com"/>



    <style type="text/css">
        /*CSS样式*/
    </style>


    <script>
        /*JS脚本*/
    </script>


    <link type="text/css" rel="stylesheet" href="home.css">

    <title>峰哥博客</title>
</head>
<body>
    <p>博客主页</p>
</body>
</html>
```


## 第二部分：文本标签


### 2.1 段落

```html
<p>第一段</p>
<p>第二段</p>
<p>段落之间会自动换行</p>
```



<hr/>

### 2.2 标题标签

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```



<hr/>


### 2.3 特殊标签

```html
    <h3>第一部分</h3>                  
    <p>xxxxxxxxxx，xxxxxx</p>
    <p>xxxxxxxxxx，xxxxxx</p>
    <hr/>
    <h3>第二部分</h3>                  
    <p>xxxxxxxxxx，xxxxxx</p>
    <p>xxxxxxxxxx，xxxxxx</p>

    <!-- 换行标签 -->
    <br/>



    <strong>这是粗体文本</strong><br/>
    <i>斜体1</i><br/>
    <em>斜体2</em><br/>
    <cite>斜体3</cite>

    <!-- 上标标签 -->
    <p>(a+b)<sup>2</sup>=a<sup>2</sup>+b<sup>2</sup>+2ab</p>
    <!-- 下标标签 -->
    SO<sub>4</sub>指的是硫酸分子</p>


    <p>手电筒</p>
    <!-- 中划线标签 -->
    <p><s>原价:￥50.00 RMB</s></p>
    <p><strong>现在仅售：￥20.00 RMB</strong></p>

    <p><u>峰哥博客</u>计算机技能学习网</p>


    <!--字体标签  -->
    <p>普通字体文本 </p>
    <big>大字号文本</big><br/>
    <small>小字号文本</small>


    &nbsp;   空格符号
    &quot;   双引号符号
    &amp;    与符号
 	&#124;   竖线   

```







<hr/>






## 第三部分：列表标签


### 3.1 有序列表

```html
<ol type="a">
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
</ol>

<!-- type属性值问题 -->
<!-- 有1 、 a 、 A 、 i 、 I这些 -->
```

### 3.2 无序列表

```html
<ul type="disc">
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
</ul>

<!-- type属性值问题 -->
<!-- 有disc  circle  square这些 -->
```

### 3.3 定义列表


```html
    <dl>
        <dt>HTML</dt>
        <dd>超文本标记语言，构建基本结构</dd>

        <dt>CSS</dt>
        <dd>样式表，网页样式</dd>

        <dt>JS</dt>
        <dd>脚本语言，网页交互</dd>
    </dl>
```



## 第四部分：表格标签

### 4.1 基本表格结构
```html 整体结构

    <table>        
        <caption>学生信息表</caption>
        <tr>
            <th>姓名</th>
            <th>学号</th>
            <th>班级</th>
            <th>成绩</th>
        </tr>
        <tr>
            <td>小明</td>
            <td>S001</td>
            <td>一班</td>
            <td>132</td>
        </tr>
        <tr>
            <td>小张</td>
            <td>S002</td>
            <td>一班</td>
            <td>98</td>
        </tr>
        <tr>
            <td>小论</td>
            <td>S006</td>
            <td>三班</td>
            <td>129</td>
        </tr>
    </table>

```

:::note 表格渲染结果
<table>        
        <caption>学生信息表</caption>
        <tr>
            <th>姓名</th>
            <th>学号</th>
            <th>班级</th>
            <th>成绩</th>
        </tr>
        <tr>
            <td>小明</td>
            <td>S001</td>
            <td>一班</td>
            <td>132</td>
        </tr>
        <tr>
            <td>小张</td>
            <td>S002</td>
            <td>一班</td>
            <td>98</td>
        </tr>
        <tr>
            <td>小论</td>
            <td>S006</td>
            <td>三班</td>
            <td>129</td>
        </tr>
</table>
:::



### 4.2 表格合并行

```html
    <table>
        <tr>
            <td>类型</td>
            <td>名称</td>
        </tr>
        <tr>
            <td rowspan="3">喜欢的</td>
            <td>苹果</td>
        </tr>
        <tr>
            <td>水蜜桃</td>
        </tr>
        <tr>
            <td>香蕉</td>
        </tr>
        <tr>
            <td rowspan="3">不喜欢的</td>
            <td>苹果</td>
        </tr>
        <tr>
            <td>水蜜桃</td>
        </tr>
        <tr>
            <td>香蕉</td>
        </tr>
        
    </table>


```

:::note 表格渲染结果
<table>
        <tr>
            <td>类型</td>
            <td>名称</td>
        </tr>
        <tr>
            <td rowspan="3">喜欢的</td>
            <td>苹果</td>
        </tr>
        <tr>
            <td>水蜜桃</td>
        </tr>
        <tr>
            <td>香蕉</td>
        </tr>
        <tr>
            <td rowspan="3">不喜欢的</td>
            <td>苹果</td>
        </tr>
        <tr>
            <td>水蜜桃</td>
        </tr>
        <tr>
            <td>香蕉</td>
        </tr>
        
</table>
:::

### 4.3 表格合并列

```html
    <table>
            <tr>
                <td colspan="2">一班同学</td>
                <td colspan="3">二班同学</td>
            </tr>
            <tr>
                <td>小刘</td>
                <td>小张</td>
                <td>小李</td>
                <td>小王</td>
                <td>大王</td>
            </tr>

    </table>
```

:::note 表格渲染结构
<table>
        <tr>
            <td colspan="2">一班同学</td>
            <td colspan="3">二班同学</td>
        </tr>
        <tr>
            <td>小刘</td>
            <td>小张</td>
            <td>小李</td>
            <td>小王</td>
            <td>大王</td>
        </tr>

</table>
::: 






## 第五部分：图片/视频/链接

:::tip 相关理论
（1）jpg可以很好地处理大面积色调的图片，适合存储颜色丰富的复杂图片，如照片、高清图片等。此外，jpg体积较大，并且不支持透明。

（2）png是一种无损格式，可以无损压缩以保证页面打开速度。此外，png体积较小，并且支持透明，不过不适合存储颜色丰富的图片。

（3）gif图片效果最差，但适合制作动画。动图标签基本都是gif的

:::



```html

    <img src="../png/tianjin.png" alt="天津景观图"/>

    <!--基本链接：直接链接网站  -->
    <a href="http://www.baidu.com">前往百度</a>
    <a href="链接地址" target="_blank">新标签页面打开</a>
    <a href="链接地址" target="_self">本页面打开</a>

    <!--内部链接：链到本项目的子页面  -->
    <a href="detail.html">前往详情页</a>


    <!--锚点链接：连接到本页面的对应id组件标签上去  -->
    <a href="#top">返回顶部</a>



```




## 第六部分：表单


### 6.1  Form标签

```html
    <form name="form1" method="post" action="www.xxx.com/home" target="_blank">
        <input type="text" value="单行文本框"/><br/>
        <textarea>多行文本框</textarea><br/>
        <select>
            <option>选项1</option>
            <option>选项2</option>
            <option>选项3</option>
        </select>
    </form>

```

**类型解释**：

| 属性   | 说明     | 解释                       |
| :----- | :------- | -------------------------- |
| name   | 表单名称 | 区分与其他表单的关系       |
| method | 提交方式 | 有POST GET PUT 等等        |
| action | 提交地址 | 后台服务器的地址           |
| target | 打开方式 | 类似之前_blank _self之类的 |



### 6.2  Input/Button/Select/

**input解析**：
```html

<!-- 基本语法 -->
<input type="表单类型" />


<!-- 单行文本框 -->
<input type="text" />
<!-- 密码框 -->
<input type="password" />


<!-- 单选框 -->
<input type="radio" />
<!-- 复选框 -->
<input type="checkbox" />



<!-- 一般按钮 -->
<input type="button" />
<!-- 提交表单 -->
<input type="submit" />
<!-- 表单重置 -->
<input type="reset" />




<!-- 文件上传 -->
<input type="file" />

```



**单选复选的使用**：
```html
        题目1（单选题）:<br/>
        <input type="radio" name="q1" value="a" />选项A<br/>
        <input type="radio" name="q1" value="b" />选项B<br/>
        <input type="radio" name="q1" value="c" />选项C<br/>
        <input type="radio" name="q1" value="d" />选项D<br/>


        题目2(多选题)：<br/>
        <input type="checkbox" name="q2" value="a"/>选项A
        <input type="checkbox" name="q2" value="b"/>选项B
        <input type="checkbox" name="q2" value="c"/>选项C
        <input type="checkbox" name="q2" value="d"/>选项D
```



**下拉框使用**：
```html

<select>
    <option>天津</option>
    <option>北京</option>
    <option>浙江</option>
    <option>河北</option>
</select>
```




**多行文本框使用**：
```html

<textarea rows="行数" cols="列数" value="取值">默认内容</textarea>
```



上述所有东西的渲染展示：

:::note 上述所有东西的渲染展示：

文本框
<input type="text" />

<br/>

密码框
<input type="password" />

<br/>
<br/>

文件上传
<input type="file" />

<br/>
<br/>

按钮
<input type="submit" />
<br/><br/>

题目1（单选题）:<br/>
<input type="radio" name="q1" value="a" />选项A<br/>
<input type="radio" name="q1" value="b" />选项B<br/>
<input type="radio" name="q1" value="c" />选项C<br/>
<input type="radio" name="q1" value="d" />选项D<br/>

<br/><br/>
题目2(多选题)：<br/>
<input type="checkbox" name="q2" value="a"/>选项A<br/>
<input type="checkbox" name="q2" value="b"/>选项B<br/>
<input type="checkbox" name="q2" value="c"/>选项C<br/>
<input type="checkbox" name="q2" value="d"/>选项D<br/>

:::

