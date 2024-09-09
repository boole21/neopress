# Medusa



## 一 使用icon图标

### 1.1 直接引入css文件

1. 下载“https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css”到本地

2. 在需要的文件中填写

   ```jsx
   import "./uicons-regular-straight.css"
   const Hero = async ()=>{
     return (
     	<>
             <i className="fi fi-rs-cross-small"></i>
      	</>
     )
   }
   ```

### 1.2 tailwindcss中使用

1. url: https://article.juejin.cn/post/7321410893680984101

   ```bash
   npm i @iconify/json @iconify/tailwind -D
   ```

2. 在 `tailwind.config.js` 中声明插件

   ```js
   // tailwind.config.js
   const { addDynamicIconSelectors } = require('@iconify/tailwind')
   export default {
     plugins: [addDynamicIconSelectors()]
   }
   ```

   

3. 使用

   ```html
   <i class="icon-[material-symbols--arrow-back-ios-new]"></i>
   ```

4. 搜索 https://yesicon.app

## 二 className的使用

> 使用模板字面量

```tsx
<div className={`${toggle ? "show-menu" : ""} nav__menu`}></div>
```

> 使用clsx

```tsx
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```



## 三 图片的使用

```tsx
import Image from "next/image"
import logo from "@modules/assets/img/logo.svg"

<Image src={logo} alt="" className="nav__logo-img" />

```

