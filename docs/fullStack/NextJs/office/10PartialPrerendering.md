# 第10章 部分预渲染PPR

## 10.1 静态路由与动态路由

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard-static-dynamic-components.png&w=1920&q=75)

## 10.2

next.config.mjs

```js
/** @type {import('next').NextConfig} */
 
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
};
 
export default nextConfig;
```

/app/dashboard/layout.tsx

```tsx
import SideNav from '@/app/ui/dashboard/sidenav';
 
export const experimental_ppr = true;
```

> Next.js将预先呈现路由的静态部分，并延迟动态部分，直到用户请求它们。

## 优化数据获取总结

1. 已在与应用程序代码相同的区域中创建数据库，以减少服务器和数据库之间的延迟。已在与应用程序代码相同的区域中创建数据库，以减少服务器和数据库之间的延迟。
2. 使用React Server Components在服务器上获取数据。这允许您将昂贵的数据获取和逻辑保留在服务器上，减少客户端JavaScript包，并防止数据库机密暴露给客户端。使用React Server Components在服务器上获取数据。这允许您将昂贵的数据获取和逻辑保留在服务器上，减少客户端JavaScript包，并防止数据库机密暴露给客户端。
3. 使用SQL只获取所需的数据，减少了每个请求传输的数据量和转换内存中数据所需的JavaScript量。
4. 使用JavaScript优化数据获取-在有意义的地方这样做。
5. 实现了流式传输，以防止缓慢的数据请求阻塞整个页面，并允许用户开始与UI交互，而无需等待加载所有内容。
6. 将数据提取向下移动到需要它的组件，从而隔离路由的哪些部分应该是动态的。
