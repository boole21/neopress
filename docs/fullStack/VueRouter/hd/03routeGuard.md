# 第三章路由守卫

## 1.什么是路由守卫

> Terms: 路由守卫,路由钩子函数

## 2.完成项目的创建

```bash
yarn create vite vue --template vue
cd vue
yarn add vue-router
yarn add add -D sass
yarn
yarn dev
```

> router/index.js

```javascript
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
 routes: [{}],
});
export default router;
```

> main.js

```javascript
import router from "./router";

app.use(router);
```

## 3.完成项目的路由配置

> vite.config.js

```javascript
// 设定别名
import path from "path";
export default defineConfig({
 plugins: [vue()],
 resolve: {
  alias: { "@": path.resolve(__dirname, "src") },
 },
});
```

> router/index.js

```javascript
import home from "@/views/home.vue";
import about from "@/views/about.vue";
const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: "/home", name: "home", component: home },
  { path: "/about", name: "about", component: about },
 ],
});
```

## 4.完成页面布局

> main.js

```javascript
import "@/assets/global.scss";
```

> App.vue

```vue
<template>
 <div>
  <div>
   <router-link :to="{ name: 'home' }">Home</router-link>
   <router-link :to="{ name: 'about' }">About</router-link>
  </div>
  <div class="view">
   <router-view />
  </div>
 </div>
</template>
<script setup></script>
<style lang="scss">
 a {
  display: inline-block;
  color: #fff;
  background-color: #e67e22;
  padding: 10px;
 }
 .view {
  background-color: #f3f3f3;
  padding: 20px;
  margin-top: 20px;
 }
</style>
```

## 5.beforeEach 的 Promise

> Terms: beforeEach,全局前置守卫

- 可以在全局路由守卫,也可以针对某个路由进行守卫,也可以单个页面进行守卫
- 什么都不返回,或返回 true,就是放行,返回 false,就是不放行,就不会继续渲染页面了
- beforeEach 是异步的

```javascript
router.beforeEach((to, from) => {
 console.log(from.name, to.name);
 return false; // undefined about
 // return true; // home about
});
```

```javascript
router.beforeEach((to, from) => {
 console.log(from.name, to.name);
 return new Promise((resolve) => {
  resolve(); // home about
  // resolve();//undefined about
 });
});
```

```javascript
router.beforeEach((to, from) => {
 console.log(from.name, to.name);
 return new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 2000);
 });
});
```

```javascript
router.beforeEach(async (to, from) => {
 console.log(from.name, to.name);
 return await new Promise((resolve) => {
  resolve(false); // undefined about
  // resolve(true); // home about
 });
});
```

## 6.路由拦截体验与 next 方法

:::tip

1. next,若使用第三参数 next,至少要使用一次 next(),
2. next(true)放行,next(false)不放行
3. 如果不使用next，使用`return '/login'`也可以

:::

> router/index.js

```javascript
// 判断权限,用户登录的时候可以进入
router.beforeEach((to, from, next) => {
 if (to.name == "about") return next("/login");
 return next();
});
```

```javascript
router.beforeEach((to, from) => {
 if (to.name == "about") return "/login";
});
```

```javascript
// 返回原来页面,即无法跳转,
router.beforeEach((to, from) => {
 if (to.name == "about") return from;
});
```

## 7.beforeResolve 与 afterEach 守卫

> Terms: beforeResolve,全局解析守卫,afterEach,全局后置钩子

- afterEach 不会改变导航本身,用于分析,更改页面标题,声明页面等辅助功能

```javascript
router.beforeResolve((to, from) => {
 console.log("beforeResolve");
});
const routes = [];
router.afterEach((to, from, fail) => {
 console.log("afterEach"); // 都会被执行
 // if (!fail) console.log("路由解析成功");
 if (!fail) {
  console.log("路由解析成功");
  routes.push(to.path);
  localStorage.setItem("routes", JSON.stringify(routes));
 }
});
```

## 8.路由守卫 beforeEnter 与 meta 元信息完成登录验证

> Terms: beforeEnter,to.meta.auth
> router/index.js

```javascript
  { path: "/home", name: "home", component: home, beforeEnter: [(to, from) => console.log(1), (to, from) => console.log(2)] },
```

```javascript
  { path: "/about", name: "about", component: about, meta: { auth: true }, beforeEnter: [loginCheck] },
```

> help.js

```javascript
const login = false;

const loginCheck = (to, from, next) => {
 // 没有登录并且元信息验证未通过,则跳到登陆页面
 // login 表示是否登录 true 登录 false 未登录
 // to.meta.auth表示是否需要验证是否登录 true 需要 false 不需要
 if (!login && to.meta.auth) next("/login");
 else next();
};

export { loginCheck };
```

## 9.beforeRouteEnter 获取数据

> Terms: beforeRouteEnter,beforeRouteUpdate,beforeRouteLeave

- next 中 通过 `vm` 访问组件实例

> views/about.vue

```vue
<template>
 <div>About...{{ title }}</div>
</template>
<script>
 export default {
  data() {
   return {
    title: "向军",
   };
  },
  beforeRouteEnter(to, from, next) {
   // console.log(to.name, from.name);
   // next("/login");
   // next({ name: "login" });
   // next();
   new Promise((resolve) => {
    setTimeout(() => {
     next((vm) => (vm.title = "yahoo"));
    }, 3000);
   });
  },
 };
</script>
<style lang="scss"></style>
```

## 10.使用 beforeRouteLeave 保护数据

```javascript
  beforeRouteUpdate(to, from) {
   console.log("beforeRouteUpdate");
  },
  beforeRouteLeave(to, from, next) {
   // 防止用户离开页面后,编辑的资料丢失了
   if (confirm("真的要离开吗?离开数据就没了")) next();
   console.log("beforeRouteLeave");
  },
```

## 11.体验守卫执行流程

- 当我们路由改变时,所有守卫都会被执行,
- 同样渲染当前页面,只是参数改变时,只会执行全局中的三个守卫和组件中的更新守卫

| No. | 守卫              | 介绍         |
| --- | ----------------- | ------------ |
| 1   | beforeRouteLeave  | 组件离开守卫 |
| 2   | beforeEach        | 全局前置守卫 |
| 3   | beforeRouteUpdate | 组件更新守卫 |
| 4   | beforeEnter       | 路由守卫     |
| 5   | beforeRouteEnter  | 组件守卫     |
| 6   | beforeResolve     | 全局解析守卫 |
| 7   | afterEach         | 全局后置守卫 |

> views/about.vue

```html
about-<router-link :to="{ name: 'about', query: { id: 199 } }">{{ title }}</router-link>
```

## 12.使用路由守卫获取路由

**目的** 通过 beforeRouteUpdate 来实现下一页的功能,获取 query 值

```vue
<template>
 <ul>
  <li v-for="article of articles" :key="article.id">{{ article.title }}</li>
 </ul>
 <router-link :to="{ name: 'article', query: { id: Math.random() } }">下一页</router-link>
</template>
<script>
 const load = async () => {
  return await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());
 };
 export default {
  data() {
   return {
    articles: [],
   };
  },
  async beforeRouteUpdate(to, from) {
   console.log("beforeRouteUpdate");
   // this.articles = await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());
   this.articles = await load();
  },
  beforeRouteEnter(to, from, next) {
   next(async (vm) => {
    // vm.articles = await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());
    vm.articles = await load();
    console.log(vm.articles);
   });
   // console.log(this);
  },
 };
</script>
<style lang="scss"></style>
```

## 13.setup 中守卫处理

> Terms: onBeforeRouteUpdate,onBeforeRouteLeave
> views/article.vue

```vue
<template>
 <ul>
  <li v-for="article of articles" :key="article.id">{{ article.title }}</li>
 </ul>
 <router-link :to="{ name: 'article', query: { id: Math.random() } }">下一页</router-link>
</template>
<script setup>
 import { ref } from "vue";
 import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
 const articles = ref([]);
 articles.value = await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());

 onBeforeRouteUpdate(async (to, from) => {
  console.log("beforeRouteUpdate");
  articles.value = await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());
 });
</script>
```

## 14.使用 watch 监听路由

- 获取路由参数 import {useRoute} from 'vue-route';const route=useRoute();route.params.id
- 常用 route.name,route.params.id,route.query
- watch(route,()=>{})
- setup 中 watch 在组件渲染是就进行执行{immediate:true}

```javascript
import { watch } from "vue";
import { route } from "vue-route";

watch(
 route,
 async (route) => {
  if (route.name == "article") {
   article.value = await fetch(`http://127.0.0.1:3003/article`).then((r) => r.json());
  }
 },
 { immediate: true }
);
```

## 15.watch 监听页码获取数据

> Terms: ??

- 获取数据的方式
  - 1.通过 watch 监听路由 route.query
  - 2.通过 watch 监听页码 page
- route.query.page ?? 1 如果 route.query.page 存在则选择 route.query.page 否则选择 1

```vue
<template>
 <ul>
  <li v-for="article of articles" :key="article.id">{{ article.title }}</li>
 </ul>
 <button @click="page = 2">下一页{{ page }}</button>
</template>
<script setup>
 import { watch, ref } from "vue";
 import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
 const articles = ref([]);
 const route = useRoute();
 const page = ref(route.query.page ?? 1);
 console.log("route", route);

 watch(
  page,
  async (page) => {
   articles.value = await fetch(`http://127.0.0.1:3003/article?page=${page}`).then((r) => r.json());
  },
  { immediate: true }
 );
</script>
```
