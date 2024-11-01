# 第一章 vue-router 基础知识

## 1.什么是路由

## 2.自己开发路由 router-view

- 不按照 vue-router 实现 RouterView,RouterLink 的功能

```bash
yarn create vite base --template vue
```

## 3.路由配置文件

> Terms: `<component :is="view" />`

- 通过识别地址栏中的连接来确定跳转到的页面
- App.vue-->RouterView.vue-->route/index.js--->Home.vue

> App.vue

```vue
<template>
 <router-view />
</template>

<script setup>
 import RouterView from "./components/RouterView.vue";
</script>
```

> /components/RouterView.vue

```vue
<template>
  <component :is="view" />
</template>

<script setup>
 import { computed } from "vue";
 import router from "../route";
 const view = computed(() => {
  console.log(34);
 });
</script>
```

> /route/index.js 配置文件

```javascript
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const router = {
 routes: [
  { path: "/", component: Home },
  { path: "/about", component: About },
 ],
};
export default router;
```

> /views/Home.vue

```vue
<template>Home...</template>
```

## 4.路由识别 URL 渲染页面

> Terms: window.location.pathname

- 获取地址栏中的地址 window.location.pathname

> /components/RouterView.vue

```javascript
const view = computed(() => {
 const path = window.location.pathname;
 const route = router.routes.find((item) => item.path == path);
 return route.component;
});
```

> App.vue

```vue
<template>
 <a href="/">home</a>
 <a href="/about">about</a>
 <hr />
 <div>
  <router-view />
 </div>
</template>

<style lang="scss">
 a {
  display: inline-block;
  margin-right: 20px;
 }
</style>
```

## 5.手写 router-link 组件基础

```javascript
// 注册全局组件,
import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import RouterView from "./components/RouterView.vue";
import RouterLink from "./components/RouterLink.vue";

const app = createApp(App);
app.component("RouterView", RouterView);
app.component("RouterLink", RouterLink);
app.mount("#app");
```

> App.js

```vue
<template>
 <router-link to="/">home</router-link>
</template>
```

> /components/RouterLink.vue

```vue
<template>
 <a href="/" @click.prevent="push">
  <slot />
 </a>
</template>

<script setup>
 const prop = defineProps({
  to: { type: String, required: true },
 });
 const push = () => {
  alert("click");
 };
</script>
```

## 6.完成 router-link 跳转功能

**目的** 使用 router-link 来实现 a 的功能,但不用页面跳转,实现组件之间的切换

- 建立响应式数据 const path = ref(window.location.pathname),若要读取响应式数据中的内容,须用 path.value
- 如何手动书写 vue-router 中 RouterView 和 RouterLink
  - 1.全局化 RouterView 和 RouterLink
  - 2.配置文件 router/index.js
    - 2.1.引入 Home,About 组件
    - 2.2.创建响应式数据 path 和创建路由对象 router(保存路径信息,用于 component 进行切换)
    - 2.3.使用 export default router 到处 router,使用 export {path}到处响应式数据 path
  - 3.运行
    - 3.1.配置文件中 router/index.js 中响应式数据 path 默认为链接地址,RouterView 中的组件为默认组件(如"/")
    - 3.2.App.vue 中 a 标签(跳转)改为`<router-link />`(不跳转),点击后更改 path.value,同时影响到 router/index.js 中的 path(如"/about")
    - 3.3.通过响应式数据 path 的变化,改变 RouterView 中的 path.value,通过 computed 属性改变 view 的值(如 About)
    - 3.4.最终通过`<component :is="view" />`更改组件(如 About)
    - 3.5.实现不使用跳转更改组件的目的

## 7.搭建 vue-router 项目

```bash
yarn create vite vue --template vue
yarn add -D sass
yarn add -D vue-router@4
yarn dev
```

## 8.完成 vue-router 的初始配置

- main.js 中引用全局时,引用全局组件使用 app.component('RouterView',RouterView),引用全局对象时使用 app.use(router)

> router/index.js 初始配置

```javascript
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Article from "../views/Article.vue";

const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: "/", component: Home },
  { path: "/article", component: Article },
 ],
});

export default router;
```

> main.js

```javascript
import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

> App.vue

```vue
<template>
 <!-- 最终渲染的页面 -->
 <router-view />
</template>
```

## 9.createWebHistory:createWebHistory 与 createWebHashHistory 的选择

> Terms:createWebHistory(),createWebHashHistory()

```javascript
 history: createWebHistory(),// localhost:5173/
 history: createWebHistory("shop"), // localhost:5173/shop/
 history: createWebHashHistory(),// localhost:5173/#
 history: createWebHashHistory("shop"),// localhost:5173/shop/#
```

## 10.name:路由命名与布局分析

- 给路由设置 name,当路径名改后,不改变 name 中的内容

> App.vue

```vue
<template>
 <router-link :to="{ name: 'home' }">home</router-link>
 <router-link :to="{ name: 'article' }">article</router-link>
</template>
```

> index.js

```javascript
 routes: [
  { path: "/", name: "home", component: Home },
  { path: "/content", name: "article", component: Article },
 ],
```

## 11.生成 mockjs 测试数据

- 如果 json-server 命令不能用,可把 package.json 中的"type":"module"给去掉

```bash
yarn add -g json-server
yarn add -D mockjs
json-server --watch --port 3003 --host 127.0.0.1 ./db.js
```

> db.js

```javascript
const Mock = require("mockjs");
//Mock.Random 是一个工具类，用于生成各种随机数据
const Random = Mock.Random;

module.exports = () => {
 //定义json-server数据结构
 let data = { article: [], user: [] };

 for (let i = 1; i <= 10; i++) {
  data.article.push({
   id: i,
   title: Random.cword(10, 20),
   content: Random.cparagraph(100),
  });
  data.user.push({
   name: Random.word(3),
   avatar: Random.image("200x200", "#f39c12", Random.word(1)),
  });
 }
 return data;
};
```

> api.js

```javascript
const host = `http://127.0.0.1:3003/article`;

const all = () => {
 return fetch(host).then((r) => r.json());
};
export { all };
```

## 12.全局异步获取数据

> App.vue

```vue
<template>
 <suspense>
  <template #default>
   <div>
    <router-view />
   </div>
  </template>
 </suspense>
</template>
```

> views/Home.vue

```vue
<template>
 <div>{{ articles }}</div>
</template>

<script setup>
 import { ref } from "vue";
 // api.js
 import api from "../api.js";
 const articles = ref(await api.all());
</script>
```

## 13.提取列表元素组件

> views/Home.vue

```vue
<template>
 <list-item v-for="article in articles" :key="article.id" :article="article" />
</template>
```

## 14.linkActiveClass 与 linkExactActiveClass 定义当前路由样式

- RouterLink 中被选中的项中添加 class,

  - 1.router-link-active,若点击父类(父),若点击子类(父子)
  - 2.router-link-exact-active 若点击父类(父),若点击子类(子)

- 更改被选中的样式 2>1

  - 1.全局 router 中 linkExactActiveClass:'exact'
  - 2.局部`<router-link exact-active-class="hd" />`

- 在组件父子中添加 class 是一样的

| 样式                     | router               | router-link        |
| ------------------------ | -------------------- | ------------------ |
| router-link-active       | linkActiveClass      | active-class       |
| router-link-exact-active | linkExactActiveClass | exact-active-class |

```javascript
linkExactActiveClass: "exact";
```

```vue
<!-- 更改被选中的类名 exact-active-class="hd" router-link-exact-active被替换成hd -->
<template>
 <router-link exact-active-class="hd" :to="{ name: 'home' }">home</router-link>
 <router-link exact-active-class="hd" :to="{ name: 'article' }">article</router-link>
</template>
```

```html
<navigation class="navigation" />
```

## 15.设置 router-view 背景样式

> App.vue

```vue
<template>
 <suspense>
  <template #default>
   <div>
    <navigation class="navigation" />
    <router-view class="router-view" />
   </div>
  </template>
 </suspense>
</template>

<script setup>
 import Navigation from "./components/Navigation.vue";
</script>

<style lang="scss">
 .navigation {
  margin-bottom: 20px;
 }
 .router-view {
  background-color: #f3f3f3;
  padding: 20px;
 }
</style>
```

## 16.根据 meta 动态设置页面样式

- meta 额外的信息 router.meta?.a
- 在 route 中添加 meta 信息,可通过 meta 来区分 router-view 中的不同组件

> router/index.js

```javascript
 routes: [
  { path: "/", meta: { class: "home" }, name: "home", component: Home },
  { path: "/content", meta: { class: "article" }, name: "article", component: Article },
 ],
```

> App.vue

```vue
<template>
 <router-view class="router-view" #default="{ route, Component }">
  <component :class="route.meta?.class" :is="Component" />
 </router-view>
</template>
<style lang="scss">
 .navigation {
  margin-bottom: 20px;
 }
 .home {
  background-color: #9b59b6;
  padding: 20px;
 }
 .article {
  background-color: #f3f3f3;
  padding: 20px;
 }
</style>
```

## 17.:id,访问文章详情页

> Terms: :id

- <http://127.0.0.1:5173/show/1>

```javascript
 { path: "/show/:id", name: "show", component: Show },

```

## 18.展示文字内容

> Terms:useRoute(),route.params.id,route 路由信息,router 路由操作者
> api.js

```javascript
const host = `http://127.0.0.1:3003/article`;

const find = (id) => {
 return fetch(host + `/${id}`).then((r) => r.json());
};
export default { find };
```

> view/Show.vue

```vue
<template>
 <div class="show">
  <h2>{{ article.title }}</h2>
  <div>{{ article.content }}</div>
 </div>
</template>

<script setup>
 import api from "../api";
 import { useRoute } from "vue-router";

 const route = useRoute();
 console.log(route.params.id); //
 const article = await api.find(route.params.id);
 console.log(article);
</script>

<style lang="scss">
 .show {
  padding: 20px;
  background-color: #f3f3f3;
  div {
   color: #666;
   font-size: 0.8rem;
   line-height: 1.6rem;
  }
 }
</style>
```

## 19.?id=1:query 与 hash 参数使用

> Terms: route.query.id,$route.query,$route.hash

- :id -->route.params.id
- ?id=1 -->route.query.id
- <http://127.0.0.1:5173/show?id=1#ab>

> router/index.js

```javascript
 { path: "/show", name: "show", component: Show },
```

> view/Show.vue

```vue
<template>
 <div class="show">
  {{ $route.query }}
  {{ $route.hash }}
  <h2>{{ article.title }}</h2>
  <div>{{ article.content }}</div>
 </div>
</template>

<script setup>
 import api from "../api";
 import { useRoute } from "vue-router";

 const route = useRoute();
 console.log(route.query.id); //
 const article = await api.find(route.query.id);
 console.log(article);
</script>
```

## 20.为用户资源优化文件结构

**目的** 建文章列表组件 components/ListItem.vue

## 21.设置 vite 目录别名 alias

- 在 vite.config.js 的 defineConfig

> vite.config.js

```javascript
import path from "path";

export default defineConfig({
 resolve: {
  alias: { "@": path.resolve(__dirname, "src") },
 },
});
```

## 22.用户列表展示与单条显示

**目的** 添加用户 user 的列表与详情页

- components/Navigation.vue
- components/ListUser.vue
- router/index.js
- views/user/List.vue
- views/user/Show.vue

## 23.文章列表组件复用

**目的** 在文章展示页中显示文章列表

> components/Card.vue

```vue
<template>
 <div class="card">
  <header>
   <slot name="header" />
  </header>
  <main>
   <slot />
  </main>
 </div>
</template>

<script setup></script>

<style lang="scss">
 .card {
  header {
   background-color: #34495e;
   padding: 10px;
   color: #fff;
  }
 }
</style>
```

## 24.请求同一页面不刷新的问题

> views/article/Show.vue

```javascript
import { watch } from "vue";
const article = ref();
watch(route, async () => {
 article.value = await api.find(route.params.id);
});
```

## 25.灵活的定义路由地址

- 路由路径可由原来的<http://127.0.0.1:5173/show/1变为http://127.0.0.1:5173/show/article-4.html>
- 可自由的改变路由地址,并可通过正则自由限定的地址格式
- 尽量通过 name 来定义我们的路由

> router/index.js

```javascript
 { path: "/show/article-:id(\\d+).html", name: "article-show", component: Show },
```

> components/ListArticle.vue

```html
<router-link v-for="article in articles" :key="article.id" :to="{ name: 'article-show', params: { id: article.id } }" class="list-item">{{ article.title }}</router-link>
```

## 26.自定义 404 页面

> router/index.js

```javascript
{ path: "/:any(.*)", component: NotFound }
```

> views/common/NotFound.vue

```vue
<template>
 <div>404 你访问的页面不存在</div>
</template>

<script setup></script>

<style lang="scss"></style>
```
