---
slug: vue-base
title: 1. Vue基础
tags: [基础, Vue]
---

# Vue 基础

## 1.快速上手

**安装项目**

```shell
npm init vue@latest #安装项目


cd <your-project-name>   #进入项目文件夹
npm install  #安装依赖
npm run dev  #启动项目
```

## 2.模版语法

**状态绑定**

```jsx
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    },
    msg:"hello",
    num:87
  }
}
```

**文本插值的应用**

```jsx
<span>Message: {{ msg }}</span>
```

**原始 HTML 的应用**

```jsx
<span v-html="rawHtml"></span>
```

**状态插值的应用**

```jsx
<div v-bind:id="dynamicId"></div>
//或者
<div :id="dynamicId"></div>
<button :disabled="isButtonDisabled">Button</button>
```

**动态绑定多个值**

```jsx
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}


<div v-bind="objectOfAttrs"></div>

```

## 3.响应式部分与计算属性

### 3.1 响应式声明

:::info
选用选项式 API 时，会用 data 选项来声明组件的响应式状态。此选项的值应为返回一个对象的函数

要为组件添加方法，我们需要用到 methods 选项。它应该是一个包含所有方法的对象：
:::

```jsx
export default {
	data() {
		return {
			count: 0,
		};
	},
	methods: {
		increment() {
			this.count++;
		},
	},
	mounted() {
		// 在其他方法或是生命周期中也可以调用方法
		this.increment();
	},
};
```

### 3.1 计算属性

:::note 应用场景
简单的判断或计算可以在模版中使用三目或者表达式表示

但较为复杂的就需要再计算属性中解决了
:::

**小案例**

```jsx
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 一个计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向当前组件实例
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}

//下面是模版的使用的样子
<span>{{ publishedBooksMessage }}</span>
```

**计算属性与方法的不同**

| 特点     | 计算属性                 | 方法               |
| -------- | ------------------------ | ------------------ |
| 缓存性   | 具有缓存，依赖不变时复用 | 没有缓存           |
| 返回值   | 必须有返回值             | 可以没有返回值     |
| 适用场景 | 复杂逻辑或需要缓存的值   | 简单逻辑           |
| 重新求值 | 仅当依赖变化时重新求值   | 每次调用都求值     |
| 触发方式 | 在模板中使用             | 在模板或事件中使用 |
| 渲染次数 | 仅渲染一次               | 每次调用都渲染     |
| 使用方法 | `computed: { ... }`      | `methods: { ... }` |

:::danger 核心差异
主要差别就在于方法调用总是会在重渲染发生时再次执行函数。
:::

## 4.类名与样式绑定

### 4.1 类名绑定

:::note
就是使得可以动态的设置类名
:::

```jsx
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
//这样这个div就相当于下面这样
<div class="static active"></div>
```

**绑定数组（绑定多个类名）**

```jsx
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}


<div :class="[activeClass, errorClass]"></div>
//说明其实div也可以绑定单一变量的值
```

### 4.2 样式绑定

```jsx
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}



<div :style="styleObject"></div>
```

## 5.条件渲染与列表渲染

### 5.1 条件渲染

**小案例**

```jsx
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
//小案例1



<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
//小案例2




<h1 v-show="ok">Hello!</h1>
//小案例3
```

**V-show 与 v-if 的差别**

| 特点             | v-if                     | v-show                 |
| ---------------- | ------------------------ | ---------------------- |
| 渲染方式         | 惰性渲染                 | 非惰性渲染             |
| 切换成本         | 较高                     | 较低                   |
| 初始渲染条件为真 | 渲染元素                 | 显示元素               |
| 初始渲染条件为假 | 不渲染元素               | 隐藏元素               |
| 条件改变时的切换 | 创建/销毁元素和组件      | 修改 CSS 样式          |
| 频繁条件改变时   | 不适用                   | 适用                   |
| 推荐使用情况     | 条件不频繁变化，初始为假 | 条件频繁变化，初始为真 |

### 5.2 列表渲染

**小案例**

```jsx
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])


<li v-for="(item, index) in items" :key="item.id">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

**v-fory 与对象**

```jsx
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

<li v-for="(value, key, index) in myObject">
  第{{ index }}个元素是------ {{ key }}: {{ value }}
</li>
```

**v-fory 与 v-if 联合使用**

```jsx
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## 6.事件处理

### 6.1 基础时间处理

```jsx
const count = ref(0)

<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

### 6.2 事件传参与事件对象

```jsx
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>

function say(message) {
  alert(message)
}
//单一的事件传参


<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
//或者
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>



function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
//事件传参与获取事件对象
```

### 6.3 事件修饰符

:::info 原因
在处理事件时调用 event.preventDefault() 或 event.stopPropagation() 是很常见的,所以被直接封装进 Vue 里面了

类似

.stop
.prevent
.self
.capture
.once
.passive

:::

**小案例**

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

## 7.双向绑定

:::info
表单输入绑定:说白了就是自动获取表单的数据并更新状态信息
:::

**基础案例**

```jsx
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
//一般的输入框


<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
//多行文本框



<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
//单一的选择框

const checkedNames = ref([])



<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>

//多选框


<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
//单选按钮


<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
//单一选择器



<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
//多选 选择器

```

## 7.生命周期与侦听器

### 7.1 Vue3 的生命周期图

![](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

### 7.2 使用生命周期

:::tip
直接引入再直接写就可以了
:::

```jsx

	import {onMounted} from 'vue'

  onMounted(() =>{" "}
	{console.log(`the component is now mounted.`)})

```

### 7.3 侦听器

**基础案例**

```jsx
const x = ref(0);
const y = ref(0);

// 监听单个 ref
watch(x, (newX) => {
	console.log(`x is ${newX}`);
});

// getter 函数来监听
watch(
	() => x.value + y.value,
	(sum) => {
		console.log(`sum of x + y is: ${sum}`);
	}
);

// 对多个来源组成的数组进行监听
watch([x, () => y.value], ([newX, newY]) => {
	console.log(`x is ${newX} and y is ${newY}`);
});
```

:::danger
不能够直接监听对象的值，而是要使用 getter 函数
例如：

```jsx
const obj = reactive({ count: 0 });

// 提供一个 getter 函数
watch(
	() => obj.count,
	(count) => {
		console.log(`count is: ${count}`);
	}
);
```

:::
