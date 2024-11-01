# 第四章路由动画与滚动效果

## 1.创建项目

```bash
yarn create vite animation --template vue
cd animation
yarn
yarn add vue-router
yarn add -D sass
yarn dev
```

> App.vue

```vue
<template>
  <div>
  <router-view />
 </div>
</template>
<script setup></script>
<style lang="scss"></style>
```

> main.js

```javascript
import router from "./router";
createApp(App).use(router).mount("#app");
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

## 2.路由跳转与样式声明

> vite.config.js

```javascript
import path from "path"

export default defineConfig({
 resolve:{alias:{'@',path.resolve(__dirname,'src')}}
})
```

> router/index.js

```javascript
import { createRouter, createWebHistory } from "vue-router";
import about from "@/views/about.vue";
import home from "@/views/home.vue";

const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: "/home", name: "home", component: home },
  { path: "/about", name: "about", component: about },
 ],
});

export default router;
```

> App.vue

```vue
<template>
 <div class="link">
  <router-link :to="{ name: 'home' }">Home</router-link>
  <router-link :to="{ name: 'about' }">About</router-link>
 </div>

 <div class="router-link">
  <router-view />
 </div>
</template>
<script setup></script>
<style lang="scss">
 .link {
  a {
   display: inline-block;
   background-color: #16a085;
   color: #fff;
   margin-right: 20px;
   text-align: center;
   padding: 10px;
  }
 }
 .router-link {
  margin-top: 20px;
 }
</style>
```

> main.js

```javascript
import "./assets/global.scss";
```

> assets/global.scss

```css
body {
 width: 100vw;
 height: 100vh;
 padding: 30px;
 color: #666;
}
* {
 box-sizing: border-box;
 padding: 0;
 margin: 0;
}

a {
 text-decoration: none;
}
```

## 3.实现路由动画

## 4.不同模式的动画效果

## 5.animate.css 快速实现路由动画

## 6.不同路由页面自定义动画

## 7.创建文章页面

## 8.获得文章列表

## 9.通过 watch 获取文章内容

## 10.scrollBehavior 处理路由滚动

## 11.behavior 平滑滚动

## 12.指定滚动元素

## 13.不同路由自定义滚动效果

## 14.使用 Promise 异步处理滚动效果
