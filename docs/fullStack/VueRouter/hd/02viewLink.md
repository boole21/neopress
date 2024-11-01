# 第二章布局视图与路由导向

## 1.项目介绍

## 2.命名视图:命名视图

> Terms: 视图,components,渲染导航

- components:{navigation:NavigationUser,default:User}

> App.vue

```html
<router-view name="navigation" #default="{ Component }">
 <!-- Component有的话用Component,否则用Navigation -->
  <component :is="Component ?? Navigation" />
</router-view>
```

> router/index.js

```javascript
{ path: "/user", meta: { class: "user" }, name: "user", components: { navigation: NavigationUser, default: User } },
```

## 3.嵌套视图:什么是嵌套视图

> Terms: 嵌套视图

## 4.嵌套路由:多模块嵌套路由

> Terms: 嵌套路由

**目的** 路由放到 layout 中,视图放到 views 中,layout 中的前台 front 对应 views 中的 front 文件夹

## 5.地址继承:url 地址继承

```javascript
 routes: [
  {
   path: "/xj",
   component: Front,
   children: [
    { path: "/", meta: { class: "home" }, name: "home", component: Home },
    { path: "content", meta: { class: "article" }, name: "article", component: Article },
   ],
  },
 ],
```

## 6.会员中心布局

> router/index.js

```javascript
{
 path: "/member",
 component: Member,
 children: [
  { path: "mobile", name: "member", component: Mobile },
  { path: "email", name: "email", component: Email },
 ],
},
```

```html
<router-link :to="{ name: 'member' }">会员中心</router-link>
```

## 7.会员中心路由跳转

**目的** 把前台的上下结构改成会员中心的左右结构

## 8.路由 css 样式响应

> router/index.js

```javascript
linkExactActiveClass: "link-active",
```

> components/Navigation.vue

```html
<router-link :to="{ name: 'article' }" :class="{ 'link-active': $route.path.includes('article') }">列表页</router-link> <router-link :to="{ name: 'user' }" :class="{ 'link-active': $route.path.includes('user') }">用户</router-link>
```

## 9.路由别名 alias 的使用

> Terms: alias
> router/index.js

```javascript
{ path: "mobile", name: "member", component: Mobile, alias: ["/m", "/hd"] },
{ path: "show/article-:id(\\d+).html", name: "article-show", component: Show, alias: "/:id(\\d+).html" },
```

> layout/Member.vue

```html
<router-link :to="{ path: '/hd' }">修改手机号</router-link>
```

> components/ListArticle.vue

```html
<router-link v-for="article in articles" :key="article.id" :to="`/${article.id}.html`" class="list-item">{{ article.title }}</router-link>
```
