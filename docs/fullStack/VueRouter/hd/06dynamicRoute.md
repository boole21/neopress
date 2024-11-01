# 第六章动态添加路由

## 01.为什么使用动态路由与项目介绍

**目的** 处理权限问题,根据不同的权限访问不同的页面

:sunny:

> vite.config.js

```javascript
// 更改端口
export default defineConfig({
  server: {
  host: "0.0.0.0",
  port: 3080,
  open: true,
 },
});
```

## 02.用户权限表与注册普通路由

> db.json

```json
{
 "permissions": ["about", "article"]
}
```

```bash
json-server --watch --port 3002 --host 127.0.0.1 db.json
```

## 03.动态路由管理 api

> Terms: addRoute(),getRoutes(),removeRoute()
> router/index.js

```javascript
router.addRoute({
 path: "/about",
 name: "about",
 component: () => import("@/views/about.vue"),
});
router.addRoute({
 path: "/article",
 name: "article",
 component: () => import("@/views/article.vue"),
});
router.removeRoute("article");
router.removeRoute("about");
console.log(router.getRoutes());
```

## 04.无权限用户访问时显示 404

> views/404.vue

```vue
<template>404,你访问的页面不存在</template>
<script setup></script>
<style lang="scss"></style>
```

> router>index.js

```javascript
  {
   path: "/:any(.+)",
   name: "notFound",
   component: () => import("@/views/404.vue"),
  },
```

## 05.动态渲染 router-link

> router>index.js

```javascript
 routes: [
  {
   path: "/",
   name: "home",
   meta: { title: "网站首页", isMenu: true },
   component: () => import("@/views/home.vue"),
  },
  {
   path: "/:any(.+)",
   name: "notFound",
   meta: { title: "404", isMenu: false },
   component: () => import("@/views/404.vue"),
  },
 ],
```

> App.vue

```html
<div v-for="route of $router.getRoutes()" :key="route.name">
 <router-link :to="{ name: 'home' }" v-if="route.meta?.isMenu && route.meta.title">{{ route.meta.title }}</router-link>
</div>
```

## 06.配置基础路由列表

- 可用...routes 来连接路由配置

> router/routes.js

```javascript
const routes = [
 { path: "/about", name: "about", meta: { title: "关于我们", permission: ["about"] }, component: () => import("@/views/about.vue") },
 {
  path: "/article",
  name: "article",
  meta: { title: "文章列表", permissions: ["article"] },
  component: () => import("@/views/article.vue"),
 },
];
export default routes;
```

> router/index.js

```javascript
import routes from "@/router/routes";
const router = createRouter({
 history: createWebHistory(),
 routes: [
  ...routes,
  {
   path: "/",
   name: "home",
   meta: { title: "网站首页", isMenu: true },
   component: () => import("@/views/home.vue"),
  },
  {
   path: "/:any(.+)",
   name: "notFound",
   meta: { title: "404", isMenu: false },
   component: () => import("@/views/404.vue"),
  },
 ],
});
```

> router/service.js

```javascript
//处理路由服务
import routes from "./routes";
```

## 07.过滤掉没用权限的路由

> router/service.js

```javascript
import routes from "./routes";

const getRoutes = async () => {
 const permissions = await fetch(`http://127.0.0.1:3002/permissions`).then((r) => r.json());
 console.log(permissions);
 return routes.filter((route) => {
  return route.meta.permissions?.every((p) => permissions.includes(p));
 });
};

export { getRoutes };
```

> router/index.js

```javascript
import { getRoutes } from "./service";

getRoutes();
```

## 08.完成动态路由注册

> router/index.js

```javascript
import { getRoutes } from "./service";

let isAddRoute = false;
router.beforeEach(async (to, from, next) => {
 const routes = await getRoutes();
 console.log("routes", routes);
 if (isAddRoute === false) {
  console.log("router", router.getRoutes());
  routes.forEach((route) => {
   router.addRoute(route);
  });
  isAddRoute = true;
  return next(to.fullPath);
 } else {
  next();
 }
});
```

> App.vue

```html
<suspense>
 <div>
  <div class="router-view">
   <router-view #default="{ Component }">
    <div class="link">
     <span v-for="route of $router.getRoutes()" :key="route.name">
      <router-link :to="{ name: route.name }" v-if="route.meta?.title">{{ route.meta.title }}</router-link>
     </span>
    </div>
    <component :is="Component" />
   </router-view>
  </div>
 </div>
</suspense>
```
