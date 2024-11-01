# 第4章 创建布局和页面

## 4.1 page.tsx

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=1920&q=75)

- 只有page.tsx的页面才能访问

## 4.2 layout.tsx

- /app/dashboard/layout.tsx
- <Layout />组件接收children属性。此子项可以是页面或其他布局。在您的情况下，/dashboard中的页面将自动嵌套在<Layout />中，如下所示：

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fshared-layout.png&w=1920&q=75)

- 好处:在导航时，只有页面组件更新，而布局不会重新呈现。这称为部分渲染.
![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&w=1920&q=75)

/app/layout.tsx 这是root layout,必须的

```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```
