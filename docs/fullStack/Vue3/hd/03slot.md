# 第三章插槽 slot 使用技巧

## 1.什么 vue.js 的插槽 slot

## 2.插槽的基本使用

- 可以在插槽中放多个插槽
- 在组件 card 放另一个组件 button,

> App.vue

```vue
<template>
  <div>
  <!-- - 在组件 card 放另一个组件 button, -->
  <card>
   <hd-button></hd-button>
  </card>
 </div>
</template>

<script>
 import Card from "./components/Card.vue";
 import HdButton from "./components/Button.vue";
 export default {
  components: { Card, HdButton },
 };
</script>
```

> components/Card.vue

```html
<div>
 <h2>向军大叔</h2>
 <div style="color: red">
  <!-- 可以在插槽中放多个插槽 -->
  <slot />
  <slot />
  <slot />
 </div>
</div>
```

> components/Button.vue

```html
<button>向军大叔的按钮</button>
```

## 3.插槽的作用域

- 插槽中的事件是父组件中的事件

```html
<!-- 父组件中的调用子组件card,其中的插槽div有click事件,执行的是父组件中的内容 -->
<card>
 <div @click="show">插槽</div>
</card>
```

## 4.slot 的后备内容

:::tip

1. 父组件 `<hd-button>保存</hd-button>`
2. 子组件后备内容`<slot>提交</slot>`

:::

```html

<!-- 默认内容 -->
<slot>保存</slot>
```

## 5.具名插槽的使用

> Terms:具名插槽,v-slot:default,#header

:::tip

1. v-slot:header 可简写为#header
2. `<template #default>可简写为<div>`
3. `<slot />`默认插槽name="default"

:::

> App.vue

```html
<card :content="content">
 <template v-slot:header>社区小贴</template>
 <template #default>后盾人是一个主张友好、分享、自由的技术交流社区。</template>
 <!-- <div>后盾人是一个主张友好、分享、自由的技术交流社区。</div> -->
 <template #footer>后盾人 人人做后盾</template>
</card>
```

> components/Card.vue

```html
<header>
 <slot name="header" />
</header>
<main>
 <slot name="default" />
</main>
<footer>
 <slot name="footer" />
</footer>
```

## 6.创新新项目准备体验作用域插槽

## 7.删除:插槽 props 实例操作

- 默认插槽可以写为 v-slot="{id}" 或#default="{id}"

> 在父组件中删除
:::tip

1. `<template v-slot:default="slotProps">`可获取插槽中的暴露出来的数据
1. `<template v-slot:default="{content,title}">`可获取插槽中的暴露出来的数据
2. `<slot content="向军" title="后盾人" />`暴露的数据 content和title

:::

```vue
<template>
 <div>
  <lesson v-for="lesson in lessons" :key="lesson.id" :lesson="lesson">
   <button @click="del(lesson)">删除</button>
  </lesson>
 </div>
</template>

<script>
 import Lesson from "./components/Lesson.vue";
 import lessons from "./db";
 export default {
  components: { Lesson },
  data() {
   return {
    lessons,
   };
  },
  methods: {
   del(lesson) {
    const index = this.lessons.findIndex((l) => l.id == lesson.id);
    this.lessons.splice(index, 1);
   },
  },
 };
</script>
```

```vue
<template>
 <div>
  {{ lesson.title }}
  <slot />
 </div>
</template>

<script>
 export default {
  props: ["lesson"],
 };
</script>

<style lang="scss" scoped>
 div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
 }
</style>
```

> 子组件传递 props 数据 id 进行删除

```vue
<template>
 <div>
  <lesson v-for="lesson in lessons" :key="lesson.id" :lesson="lesson">
   <!-- 通过#default="{id}"来赋值解析接受slot传递过来的props -->
   <template #default="{ id }">
    <button @click="del(id)">删除</button>
   </template>
  </lesson>
 </div>
</template>

<script>
 import Lesson from "./components/Lesson.vue";
 import lessons from "./db";
 export default {
  components: { Lesson },
  data() {
   return {
    lessons,
   };
  },
  methods: {
   del(id) {
    const index = this.lessons.findIndex((l) => l.id == id);
    this.lessons.splice(index, 1);
   },
  },
 };
</script>
```

```vue
<template>
 <div>
  {{ lesson.title }}
  <!-- 传递content,title给父组件 -->
  <!-- <slot content="向军大叔" title="后盾人" /> -->
  <slot :id="lesson.id" />
 </div>
</template>

<script>
 export default {
  props: ["lesson"],
 };
</script>

<style lang="scss" scoped>
 div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
 }
</style>
```

## 8.独占默认插槽

- 如果只有一个默认插槽,可以以 v-slot="{ id }"或#default="{ id }"方式
- 默认插槽中不能嵌入其他插槽

```html
<lesson
 v-for="lesson in lessons"
 :key="lesson.id"
 :lesson="lesson"
 v-slot="{ id }"
>
 <button @click="del(id)">删除</button>
</lesson>
```
