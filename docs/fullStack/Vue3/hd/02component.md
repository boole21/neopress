# 后盾 Vue3 教程

## 第二章组件化开发

### 1.代码视频:代码与视频获取方式

url:<https://gitee.com/houdunren/v2021/tree/master/video/vue3>

### 2.全局组件:cdn 开发方式全局组件与 x-template 技巧

> Terms:x-template,app.component

- 定义组件 hdXj,使用组件的方式`<hd-xj />`

```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/3.2.31/vue.global.prod.js"></script>
<body>
  <div id="app">
  <!-- <div>根目录 - <hd-xj /></div> -->
  <!-- 需要使用<hd-xj />规范,<hdXj>将失败 -->
 </div>
 <script type="text/x-template" id="hdTemplate">
  <h2>后盾人-<hd-xj /></h2>
 </script>
 <script>
  //sea require.js vite webpack vue-cli --》 app.js
  const app = Vue.createApp({
   template: `<div>根目录 - <hd-xj /></div>`,
  });
  app.component("hd", {
   template: "#hdTemplate",
  });
  app.component("hdXj", {
   template: `<div>向军大叔 <hd /></div>`,
  });
  app.mount("#app");
 </script>
</body>
```

### 3.局部组件:cdn 开发方式局部组件的声明语法

- 如果对象中的 key 和 value 相同 可以写在一起 {todo:todo} =>{todo}

```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/3.2.37/vue.global.prod.js"></script>
<body>
 <div id="app">
  <todo />
 </div>
 <script>
  const todo = {
   data() {
    return {
     title: "后盾人",
    };
   },
   template: `<div>{{title}}</div>`,
  };
  const app = Vue.createApp({
   components: { todo },
  });
  app.mount("#app");
 </script>
</body>
```

### 4.构建原理:使用 es6 模块构建 VUE3 项目—-模拟工具原理

> hd.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>后盾人</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.2.31/vue.global.prod.js"></script>
</head>
<body>
    <div id="app">
        <div v-for="data in db" :key="db.id">
            <todo :data="data">
        </div>
        <!-- {{title}} -->
        <!-- <todo /> -->
    </div>
    <script type="module">
        import main from './main.js'
    </script>
</body>
</html>
```

> main.js

```javascript
import App from "./App.js";
export default Vue.createApp(App).mount("#app");
```

> App.js

```javascript
import Todo from "./components/Todo.js";
import db from "./data/db.js";
export default {
 components: { Todo },
 data() {
  return {
   // title: '后盾人',
   db,
  };
 },
};
```

> components/todo.js

```javascript
export default {
 // data() {
 //     return {
 //         content: 'todo',
 //     }
 // },
 // template: `<div>{{content}}</div>`,
 props: ["data"],
 template: `<div style="background-color: #2c3e50;color: #fff;margin-bottom: 30px;padding: 10px;">{{data.title}}</div>`,
};
```

> data/db.js

```javascript
export default [
 {
  id: 1,
  title: "录制视频是一个很费时的工作，老师需要时间录制更多高质量的视频教程。",
 },
 {
  id: 2,
  title:
   "不可能做到随时解答问题，我们希望大家可以互相帮助提升技术，而不是直接简单的获取答案。",
 },
];
```

### 5.文件结构:vite 创建项目的文件结构详解

- public 不需要编译的文件如图片放到这里

```bash
yarn create vite vue --template vue
cd vue
yarn
yarn dev // 开发阶段
yarn build // 生成dist文件夹,压缩后的代码
yarn preview // 预览编译的结果
```

### 6.type,default:按钮组件 props

- props 下的属性 type,default
- type: String/Boolean/Number/Function/Object
- default: '确定'/default(){return ['1,2',3]}
- default 根组件没有传递参数才为空,即是否有:content="确定",而非判断"确定"是否为空

> components/Button.vue

```vue
<template>
 <div>{{ content }}</div>
 {{ arr }}
</template>

<script>
 export default {
  props: {
   content: {
    type: String, //Boolean Number Function Object
    default: "确定",
   },
   arr: {
    type: Number,
    default() {
     return ["1,2", 3];
    },
   },
  },
 };
</script>

<style lang="scss" scoped>
 div {
  background-color: #27ae60;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  opacity: 0.6;
  transition: 1s;
  display: inline-block;
  cursor: pointer;
  &:hover {
   opacity: 1;
  }
 }
</style>
```

> App.vue

```vue
<template>
 <!-- <hd-button :content="btContent" /> -->
 <hd-button />
</template>

<script>
 import hdButton from "./components/Button.vue";
 export default {
  components: { hdButton },
  data() {
   return {
    btContent: "保存提交",
   };
  },
 };
</script>
```

### 7.自定义样式:自定义按钮样式$attrs.style

> terms: $attrs.style

- :class="[type]"其中[]可以放不同的类名
- :style="$attrs.style"当子组件中有多层标签时,指定给确定的标签

> App.vue

```vue
<template>
 <hd-button :content="btContent" type="success" style="margin-right: 10px" />
 <hd-button content="删除" type="danger" style="margin-right: 10px" />
 <hd-button content="反馈" type="info" />
 <!-- <hd-button /> -->
</template>

<script>
 import hdButton from "./components/Button.vue";
 export default {
  components: { hdButton },
  data() {
   return {
    btContent: "保存提交",
   };
  },
 };
</script>
```

> components/Buttons.vue

```vue
<template>
 <div :class="[type]" :style="$attrs.style">{{ content }}</div>
 <span></span>
 <!-- {{ arr }} -->
</template>

<script>
 export default {
  props: {
   content: {
    type: String,
    default: "确定",
   },
   // arr: {
   //  type: Number,
   //  default() {
   //   return ["1,2", 3];
   //  },
   // },
   type: {
    type: String,
    default: "info",
   },
  },
 };
</script>

<style lang="scss" scoped>
 div {
  background-color: #27ae60;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  opacity: 0.6;
  transition: 1s;
  display: inline-block;
  cursor: pointer;
  &:hover {
   opacity: 1;
  }
  &.info {
   background-color: #ddd;
  }
  &.success {
   background-color: #27ae60;
  }
  &.danger {
   background-color: #e74c3c;
  }
 }
</style>
```

### 8.validator:validator 验证与 disabled 禁用按钮

> terms: validator

- validator 用于验证传递过来的值是否允许
- :class="[type,{disabled}]" 生成多个类名

```vue
<template>
 <div :class="[type, { disabled }]" :style="$attrs.style">{{ content }}</div>
</template>
<script>
 export default {
  props: {
   type: {
    type: String,
    default: "info",
    validator(v) {
     return ["success", "danger", "info"].includes(v);
    },
   },
  },
 };
</script>
```

```html
  <hd-button
   content="编辑"
   :disabled="true"
   type="abc"
   style="margin-right: 16px"
  />
 </div>
```

### 9.json 传数据:v-bind 批量设置 props 与命名规范

- template 中建议使用 hd-button 格式来写组件名与变量名

```html
<!-- 子组件中可用josn格式传递数据 -->
<hd-button
 v-bind="{ content: '保存', type: 'success', style: 'margin-right: 16px' }"
/>
```

### 10.required:required 验证

```javascript
 content: {
  type: String,
  required: true,
 }
```

### 11.单项数据流:单项数据流

- props 是父组件向子组件单向传递数据，不要当做响应式数据进行使用
- 不要修改props
- 如果传递的是数组和对象的引用类型，更改子组件会对父组件影响

> 父组件

```vue
<template>
 <hd-button :content="btContent" type="success" />
 <hr />
 <button @click="btContent = '向军大叔'">父组件</button>
 {{ btContent }}
</template>
<script>
 export default {
  data() {
   return {
    btContent: "反馈",
   };
  },
 };
</script>
```

> 子组件

```vue
<template>
 <div>{{ content }}</div>
 <hr />
 <button @click="content = '后盾人'">子组件</button>
 {{ content }}
</template>
<script>
 export default {
  props: {
   content: { type: String },
  },
 };
</script>
```

### 12.响应方式:子组件中正确的使用 prop 响应的方式

- props 只是用来父组件向子组件传递数值,而非响应式数据.正确的方式赋值给响应式数据

```javascript
data() {
 return {
  text: this.content,
 };
}
```

### 13.watch 监听:使用 watch 监听 prop

- 当 props 中的值改变时,不改变响应数据 text,此时可用 watch 来监听 props 中的值的变化来改变响应式数据

:::tip

1. 实现子元素中的响应式数据，定义一个text接收props中的content，使用 text实现响应式
2. 实现通过修改父元素中的content，子元素中的text也发生改变，使用watch监听props中的content的变化，当content发生变化时，text也发生改变
3. 使用引用类型

:::

```javascript
watch: {
 content(v) {
  this.text = v;
 },
}
```

### 14.class,id:非 props 属性传递技巧 inheritAttrs.,$attrs.id

> terms: inheritAttrs,$attrs.id

- 如果只有一层,class,id 直接放到该层中
- 指定放置,比如放第二层,先禁用 inheritAttrs:false,再在指定的层中放置:id="$attrs.id"

```vue
<template>
 <section>
  <div :id="$attrs.id" :class="[type, { disabled }]" @click="onClick">
   {{ text }}
  </div>
  <!-- <div v-bind="$attrs" :class="[type, { disabled }]" @click="onClick">{{ text }}</div> -->
 </section>
</template>
<script>
 export default {
  inheritAttrs: false,
 };
</script>
```

```html
<hd-button :content="btContent" type="success" class="hd" id="xj" />
```

### 15.事件传递:组件间的事件传递

- props 可以传递函数父组件:click="show"子组件@click="click",其中 show 的类型是 Function,即 show 为 function(){console.log("向军")}
  此时的父组件中的:click 可以改为@click,此时在子组件中可简化不写@click,而用 v-bind="$attrs",绑定所传递的事件
- 父组件中@click="show",但该点击事件是在子组件中发生
- 如何让父组件中的事件传递到子组件指定的层中,1.先禁用 inheritAttrs: false2.绑定事件 v-bind="$attrs"

> App.vue

```vue
<template>
 <!-- 通过:click来传递函数 -->
 <hd-button
  class="hd"
  id="hd"
  :content="btContent"
  type="success"
  :click="show"
 />
</template>

<template>
 <!-- 在父组件中@click,将传递事件给子组件并在子组件中触发该事件 -->
 <hd-button
  class="hd"
  id="hd"
  :content="btContent"
  type="success"
  @click="show"
 />
</template>
```

> components/Button.vue

```vue
<template>
 <section>
  <div :class="[type, { disabled }]">
   {{ text }}
  </div>
  <!-- 再绑定事件 -->
  <h2 v-bind="$attrs">向军</h2>
 </section>
</template>
<script>
 export default {
  // 先禁用继承
  inheritAttrs: false,
 };
</script>
```

### 16.event:创建 event 事件项目

- 图片放到/public 中,在 build 后的路径一样,如/public/images/ts.jpg 下的图片,路径用/images/ts.jp

```vue
<template>
 <div v-for="item in db" :key="item.id">
  <img :src="item.preview" alt="" />
 </div>
</template>

<script>
 import db from "../data/db.js";
 export default {
  data() {
   return {
    db,
   };
  },
 };
</script>
```

### 17.课程列表:使用 grid 布局课程列表

> App.vue

```vue
<template>
 <div class="lesson">
  <lesson v-for="item in db" :key="item.id" :lesson="item" />
 </div>
</template>

<script>
 import db from "../data/db.js";
 import Lesson from "./components/Lesson.vue";
 export default {
  data() {
   return {
    db,
   };
  },
  components: { Lesson },
 };
</script>

<style lang="scss" scoped>
 .lesson {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
 }
</style>
```

> components/Lesson.vue

```vue
<template>
 <div>
  <img :src="lesson.preview" :alt="lesson.title" />
  <h3>{{ lesson.title }}</h3>
  <span>x</span>
 </div>
</template>

<script>
 export default {
  props: ["lesson"],
 };
</script>

<style lang="scss" scoped>
 div {
  border: solid 1px #ddd;
  text-align: center;
  transition: 1s;

  &:hover {
   box-shadow: 0 0 20px #aaa;
  }

  h3 {
   padding: 0 0 20px 0;
   margin: 0;
  }

  img {
   width: 100%;
  }
 }
</style>
```

### 18.删除按钮:添加课程的删除按钮

> components/Lesson.vue

```css
div {
 border: solid 1px #ddd;
 text-align: center;
 transition: 1s;
 position: relative;

 &:hover {
  box-shadow: 0 0 20px #aaa;

  > span {
   opacity: 1;
  }
 }

 span {
  display: block;
  background-color: #666;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: 1s;
 }

 h3 {
  padding: 0 0 20px 0;
  margin: 0;
 }

 img {
  width: 100%;
 }
}
```

### 19.删除:事件传递原理分析

> App.vue

```vue
<!-- click放到子组件上,默认点击子组件的任何地方都可以删除选项 -->
<template>
 <div class="lesson">
  <lesson
   v-for="item in db"
   :key="item.id"
   :lesson="item"
   @click="show(item)"
   class="hd"
  />
 </div>
</template>
<script>
 import db from "../data/db";
 import Lesson from "./components/Lesson.vue";
 export default {
  data() {
   return {
    db,
   };
  },
  components: { Lesson },
  methods: {
   show(item) {
    // 删除被点击的项
    const index = this.db.findIndex((l) => l.id == item.id);
    this.db.splice(index, 1);
   },
  },
 };
</script>
```

> components/Lesson.vue

```vue
<!-- 使用v-bind="$attrs"后,把删除事件绑定到span上,但这种做法所有的事件都绑定到这上面了 -->
<template>
 <div>
  <img :src="lesson.preview" :alt="lesson.title" />
  <h3>{{ lesson.title }}</h3>
  <span v-bind="$attrs">x</span>
 </div>
</template>
<script>
 export default {
  inheritAttrs: false,
  props: ["lesson"],
  data() {
   return {};
  },
 };
</script>
```

### 20.触发 emit:$emit 触发自定义事件

> Terms: 自定义事件,$emit,

:::tip

1. 触发自定义事件流程:父组件调用子组件中自定义事件@del,传递 del 给子组件,子组件接受并定义 `emits:['del']`
2. 当子组件触发事件@click 时,则可执行`$emit('del',lesson)`,并传递参数 lesson
3. 此时的参数 lesson 将传递回给父组件@del(show)中的 show 函数,并通过 show(lesson)来执行函数
4. `const index = this.db.findIndex((l) => l.id == item.id);`找寻被点击的项item
5. `this.db.splice(index, 1);`删除被点击的项

:::

```vue
<template>
 <div class="lesson">
  <lesson
   v-for="item in db"
   :key="item.id"
   :lesson="item"
   @del="show"
   class="hd"
  />
 </div>
</template>
<script>
 import db from "../data/db";
 import Lesson from "./components/Lesson.vue";
 export default {
  data() {
   return {
    db,
   };
  },
  components: { Lesson },
  methods: {
   show(item) {
    // console.log(item);
    const index = this.db.findIndex((l) => l.id == item.id);
    this.db.splice(index, 1);
   },
  },
 };
</script>
```

```vue
<template>
 <div>
  <img :src="lesson.preview" :alt="lesson.title" />
  <h3>{{ lesson.title }}</h3>
  <!-- <span @click="$emit('del',lesson)"></span> -->
  <span @click="del">x</span>
 </div>
</template>
<script>
 export default {
  inheritAttrs: false,
  props: ["lesson"],
  emits: ["del"],
  methods: {
   del() {
    this.$emit("del", this.lesson);
   },
  },
 };
</script>
```

### 21.验证 emit:验证自定义事件

```javascript
export default {
 inheritAttrs: false,
 props: ["lesson"],
 // emits: ["del"],
 emits: {
  // 在这里验证自定义事件,在v传递回父组件前进行验证
  del(v) {
   if (/^\d+$/.test(v)) {
    return true;
   }
   // console.error('del emit 需要数值参数')
   throw new Error("del emit 需要数值参数");
  },
 },
 methods: {
  del() {
   // this.$emit('del', this.lesson.id)
   // this.$emit('del', 'abc')
   this.$emit("del", 12);
  },
 },
};
```

### 22.input 同步:自己实现 v-model 功能$event.target.value

> Terms: @input,@change,@blur,event.target.value,

- 在函数中用 event.target.value,在元素中用$event.target.value

```html
<input type="text" :value="title" @input="input" /> {{ title }}
```

```javascript
input(event) {
 console.log(event.target.value);
 this.title = event.target.value
}
```

### 23.v-model 实现原理

**目标:** v-model 简化

- [\$event](https://blog.csdn.net/violateer/article/details/108900251) 的使用

:::tip

1. 用 v-model:value="title" 简化 :value="title" @update:value="title=$event"

:::

```vue
<template>
 <div class="lesson">
  <!-- <hd-input :value="title" @update:value="change" /> -->
  <!-- <hd-input :value="title" @update:value="title = $event" /> -->
  <hd-input v-model:value="title" />
 </div>
 <hr />
 {{ title }}
</template>
<script>
 import HdInput from "./components/HdInput.vue";
 export default {
  data() {
   return {
    title: "后盾人",
   };
  },
  components: { HdInput },
  methods: {
   // change(v) {
   //  this.title = v;
   // },
  },
 };
</script>
```

> components/HdInput.vue

```vue
<template>
 <div>
  <input type="text" :value="content" @input="change" />
  {{ content }}
 </div>
</template>

<script>
 export default {
  props: ["value"],
  emits: ["update:value"],
  data() {
   return { content: this.value };
  },
  methods: {
   change(event) {
    this.content = event.target.value;
    this.$emit("update:value", this.content);
   },
  },
 };
</script>
```

### 24.简写:v-model 简写格式

**目标:** v-model 的原理是由原来 props 单向传值与自定义事件 emits 传回值一步步简化而来

> Terms: v-model:modelValue,@update:value

- 原 v-model:value 改为 v-model:modelValue 时可以简写为 v-model.父组件传递给子组件的 prop 应一起改为 modelValue,emit 改为 update:modelValue

```html
<hd-input :value="title" @update:value="title = $event" />
=>
<hd-input v-model:value="title" />
=>
<hd-input v-model:modelValue="title" />
=>
<hd-input v-model="title" />
```

```vue
<template>
 <div>
  <input type="text" :value="content" @input="change" />
  {{ content }}
 </div>
</template>

<script>
 export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
   return { content: this.modelValue };
  },
  methods: {
   change(event) {
    this.content = event.target.value;
    this.$emit("update:modelValue", this.content);
   },
  },
 };
</script>
```

### 25.双击修改:vueDevTools 使用与双击修改课程

**目标:** 使用@dblclick()双击可以修改文字,使用@keyup.enter()回车键@blur 光标离开输入框变回文字

> Terms: @dblclick(),@keyup.enter(),@blur()

- 父子组件中响应数据:1.引用特性,2.v-model,

```html
<!-- 双击文本变输入框,失去焦点或回车变回文本 -->
<!-- 使用引用类型lesson时,在子组件中更改时,父组件也会跟着改变,因引用类型共有内存空间 -->
<h3 @dblclick="inputShow = true">
 <input
  v-if="inputShow"
  v-model="lesson.title"
  @keyup.enter="inputShow = false"
  @blur="inputShow = false"
 />
 <strong v-else>{{ lesson.title }}</strong>
</h3>
```

- 自定义组件中使用 v-model,
  - 父组件中使用 v-model="item.title"
  - 子组件中 props: ["modelValue"],emits: ["update:modelValue"]
  - 子组件中元素使用$emit("update:modelValue",$event.target.value)
  - 子组件中传回父组件 db[0].title,如点击的是第一项,传回来的值$event.target.value 即为子组件中被点击的 input 事件的值

> 父组件

```html
<lesson
 v-for="item in db"
 :key="item.id"
 :lesson="item"
 @del="show"
 class="hd"
 v-model="item.title"
/>
{{ db[0].title }}
```

> 子组件

```html
<input
 v-if="inputShow"
 :value="lesson.title"
 @input="$emit('update:modelValue', $event.target.value)"
 @keyup.enter="inputShow = false"
 @blur="inputShow = false"
/>
```

```javascript
  props: [ "modelValue"],
  emits: {
    'update:modelValue': null,
  },
```

### 26.price:多个 v-model 的使用

**目标:** 同时使用两个 v-model,例如 v-model:title,v-model:price

> 父组件

```html
<!-- 添加了v-model:price -->
<lesson
 v-for="item in db"
 :key="item.id"
 :lesson="item"
 @del="show"
 class="hd"
 v-model="item.title"
 v-model:price="item.price"
/>
```

> 子组件

```html
<h3 @dblclick="inputPriceShow = true">
 <input
  v-if="inputPriceShow"
  :value="lesson.price"
  @input="$emit('update:price', $event.target.value)"
  @keyup.enter="inputPriceShow = false"
  @blur="inputPriceShow = false"
 />
 <strong v-else>{{ lesson.price }}</strong>
</h3>
```

```javascript
  props: ["price"],
  data() {
    return {
      inputPriceShow: false
    }
  },
  emits: {
    'update:price': null,
  },
```

### 27.修饰器:自定义 v-model 修饰器

**目标:** 在使用 v-model 后面添加自定义的修饰器大写 toupper,截断 2 位 substr_2  
v-model.toupper.substr_2

> Terms: 修饰器,自定义修饰符,modelModifiers
:::tip

1. v-model.toupper默认修饰符modelModifiers
2. v-model:title.toupper修饰符titleModifiers
3. 内置修饰符.trim,.number,.lazy

:::

> 父组件

```html
<!-- v-model:title.toupper.substr_5 -->
<lesson
 v-for="item in db"
 :key="item.id"
 :lesson="item"
 @del="show"
 class="hd"
 v-model:title.toupper.substr_5="item.title"
 v-model:price="item.price"
/>
```

> 子组件,自定义修饰符

```javascript
// titleModifiers是根据v-model:title.toupper.substr_5来确定的
props: ["lesson", "title", "price", "titleModifiers"]

// 在元素中调用@input="changeTitle"
changeTitle($event) {
 let value = $event.target.value
 if (this.titleModifiers.toupper) {
  value = value.toUpperCase()
 }
 const substr = Object.keys(this.titleModifiers).find(m => /^substr_/.test(m));
 if (substr) {
  let info = substr.split('_');
  value = value.substr(0, info[1])
 }
 this.$emit('update:title', value)
}
```
