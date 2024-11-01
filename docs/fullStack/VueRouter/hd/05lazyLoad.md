# 第五章 路由懒加载

## 01.项目介绍

## 02.使用 build 与 serve 查看生产环境文件大小

```bash
yarn build
yarn preview
```

## 03.路由懒加载体验

> 动态加载模块,()=>import('@/views/login.vue')

- es6 动态加载模块,
  - component:login 会把所有的组件打包成一个组件,体积大
  - component:()=>import('@/views/login.vue')会根据访问的页面进行加载

> router/index.js

```javascript
   {
   path: "/login",
   name: "login",
   // component: login
   component: () => import("@/views/login.vue"),
  },
```

## 04.vite 合并打包优化

- 使用 vite 可以把某个特定的模块合并

> vite.config.js

```javascript
export default defineConfig({
 build: {
  rollupOptions: {
   output: {
    manualChunks: {
     // 把home.vue,about.vue,article.vue三个文件编译到一个文件hd中,另login文件单独编译
     hd: ["./src/views/home.vue", "./src/views/about.vue", "./src/views/article.vue"],
    },
   },
  },
 },
});
```
