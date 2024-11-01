# 第七章 composition 之 script-setup

## 1.创建 vue3 项目

```bash
// 安装测试数据
yarn add -D mockjs
```

```vue
<template>
  <div>
  {{ hd }}
 </div>
</template>

<script setup>
 import { ref } from "vue";
 const hd = ref(99);
</script>
```

## 2.json-server与mockjs创建测试数据

- 选择json-server中的版本,使用cjs，若使用js格式会报错

```bash
npm install -g json-server@0.17.4
npm uninstall json-server # 卸载
json-server --watch --port 3002 --host 127.0.0.1 db.cjs # 
```

## 3.fetch 与 onMounted 读取数据

```vue
<template>
 <div>
  {{ todos }}
 </div>
</template>

<script setup>
 import { ref, onMounted } from "vue";
 const todos = ref([]);
 onMounted(async () => {
  todos.value = await fetch("http://127.0.0.1:3003/news").then((res) => res.json());
 });
</script>

<style lang="scss" scoped>
 div {
  color: #fff;
 }
</style>
```

## 4.suspense 处理全局异步

> Terms: suspense

:::tip

1. setup 中可以省略`onMounted(async () => {}`,而使用 suspense(目前测试阶段),可 减少代码
2. 可通过suspense的`#fallback`插槽来处理骨架屏

:::

> App.vue

```vue
<template>
 <div>
  <!-- suspense:在异步完成后再渲染里面的内容 -->
  <suspense>
   <template #default>
    <div>
     <todo />
    </div>
   </template>
   <template #fallback> loading... </template>
  </suspense>
 </div>
</template>
```

> Todo.vue

```vue
<template>
 <h2>向军大叔</h2>
 <div>
  {{ todos }}
 </div>
</template>

<script setup>
 import { ref } from "vue";
 const todos = ref([]);
 // onMounted(async () => {
 // 没有async也没有报错,但会提示<Suspense></Suspense>
 // 先执行suspense中的#fallback插槽,在执行默认插槽#default
 todos.value = await fetch("http://127.0.0.1:3003/news").then((res) => {
  return new Promise((resolve) => {
   setTimeout(() => resolve(res.json()), 2000);
  });
 });
 // });
</script>

<style lang="scss" scoped>
 div {
  color: #fff;
 }
</style>
```

## 5.defineProps 处理 props 数据

> defineProps

- 在 setup 语法中简化了,不需要 import defineProps,可直接使用
- 不需要 return,不需要声明 components,不需要 import defineEmits,

> Item.vue

```vue
<template>
 <div>
  <input :value="todo.title" type="text" />
 </div>
</template>

<script setup>
 // 不需要import defineProps
 defineProps({
  todo: { type: Object, required: true },
 });
</script>

<style lang="scss" scoped>
 input {
  margin: 10px;
 }
</style>
```

## 6.子组件样式优化

- 建议每个组件样式不使用 scope,而是在 div 中添加一个类比如.item.定义 div.item

```vue
<style lang="scss">
 div.item {
  display: flex;
  input {
   padding: 10px;
  }
 }
</style>
```

## 7.defineEmits 自定义事件完成删除操作

> Terms: defineEmits,
> Item.vue

```html{11-14}
<!-- @click="del" -->
<template>
 <div class="item">
  <input :value="todo.title" type="text" />
  <button @click="del">删除</button>
 </div>
</template>

<script setup>
 // defineProps返回所有props过来的对象集合,可使用{}来赋值解析
 const { todo } = defineProps({
  todo: { type: Object, required: true },
 });
 const emit = defineEmits(["del"]);
 console.log("emit", emit);
 console.log("todo.id", todo.id);
 const del = async () => {
  await fetch(`http://127.0.0.1:3003/news/${todo.id}`, {
   method: "delete",
  });
  emit("del");
 };
</script>
```

> Todo.vue

```vue
<!-- @del="del" -->
<template>
 <div class="todo">
  <item :todo="todo" @del="del" v-for="todo in todos" :key="todo.id" />
 </div>
</template>

<script setup>
 const del = async () => {
  todos.value = await fetch("http://127.0.0.1:3003/news").then((res) => res.json());
 };
</script>
```

## 8.封装 fetch 网络请求

> useRequest.js

```javascript
export default () => ({
 async request(url = "", options = { method: "get" }) {
  return await fetch(`http://127.0.0.1:3003/news/${url}`, options).then((r) => r.json());
 },
 async get(url) {
  return this.request(url);
 },
 async del(url) {
  return this.request(url, { method: "delete" });
 },
});
```

> Todo.vue

```vue
<script setup>
 import useRequest from "../composables/useRequest";

 const request = useRequest();
 todos.value = await request.get();
 const del = async () => {
  todos.value = await request.get();
 };
</script>
```

> Item.vue

```vue
<script setup>
 import useRequest from "../composables/useRequest";
 const request = useRequest();

 const del = async () => {
  await request.del(todo.id);
 };
</script>
```

## 9.useTodo 复用数据维护

- 把todo的数据维护抽离出来,复用,放到文件 useRequest.js 中

> /composables/useTodo.js

```js
import { ref } from "vue";
import useRequest from "../composables/useRequest";
export default async () => {
 const request = useRequest();
 const todos = ref([]);
 todos.value = await request.get();
 return { todos };
};
```

> views/Todo.vue

```html
<script setup>
 import useTodo from "../composables/useTodo";
 const { todos } = await useTodo();
</script>
```

## 10.使用 vue 的 composition 抽离代码

:::tip

1. 使用composition,把代码抽离到单独的文件中,比如 useTodo.js可以精简代码

:::

## 11.使用 composition 完成任务添加

## 12.添加排序组件与样式优化

## 13.完成任务的排序功能

- 对Proxy对象，代理一个数组，进行排序

```js
 watch(orderBy, (value) => {
  todos.value = Array.prototype.sort.call(todos.value, (a, b) => {
   return orderBy.value == "asc" ? a.id - b.id : b.id - a.id;
  });
  console.log(todos.value);
 });
```
