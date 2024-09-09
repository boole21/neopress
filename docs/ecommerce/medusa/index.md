# Medusa电商系统

## 1. 安装

url:<https://docs.medusajs.com/create-medusa-app>

```bash
# 安装后台管理系统
pnpm dlx create-medusa-app@latest
```

```bash
# 安装流程
mkdir medusa-test
cd medusa-test
pnpm dlx create-medusa-app@latest
npx create-medusa-app@latest
# 按需求填写
? What's the name of your project? lei
? Enter an email for your admin dashboard user admin@medusa-test.com
? Would you like to create the Next.js storefront? You can also create it later Yes N
? Enter your Postgres username postgres
? Enter your Postgres password [hidden]

storefront另外装这里通常不成功，会卡住
npx create-next-app -e https://github.com/medusajs/nextjs-starter-medusa lei-storefront
cd lei-storefront
mv .env.template .env.local
前台
cd lei
pnpm run dev 
yarn dev
运行http://localhost:8000
后台
cd lei-storefront
```

```bash
后台地址：http://localhost:7001/
后台账号:admin@medusa-test.com
后台登录密码：admin8888


http://localhost:8000/us
前台账号
用户:bole pan
email:1111@gmail.com
phone:17777777777
password:admin8888
```

Medical-care
<admin@medusa-test.com>



```jsx
pnpm add @medusajs/medusa-cli -g
medusa new my-medusa-store # or npx @medusajs/medusa-cli new
cd my-medusa-store
medusa develop # or npx medusa develop

默认用户，密码
"user": "admin@medusa-test.com",
"password": "supersecret"

curl localhost:9000/store/products

npx medusa user --email bolepan21@gmail.com --password admin8888
medusa seed --seed-file=data/seed.json
```



### 安装postgresql

> url: <https://juejin.cn/post/7239990044333801533>

```bash
# 使用docker安装postgres
docker pull postgres
docker pull postgres:alpine # 体积小
docker volume create postgre-data
docker run -id --name=medusa3 -v postgre-data3:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=123456 -e LANG=C.UTF-8 postgres
```

卸载本地机子上安装的postgreshttps://blog.csdn.net/STK_tianwen/article/details/17757393

```bash
open /Library/PostgreSQL/16/uninstall-postgresql.app
rm -rf /Library/PostgreSQL
```



## 2. 安装shadcn

### 官网：<https://ui.shadcn.com/docs/installation/next>

```bash
pnpm dlx shadcn-ui@latest init

pnpm dlx shadcn-ui@latest add button

```

```js
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

## 3. 使用api

### 前台使用 store Api

> 在Medusa JS Client中使用

```bash
npm install @medusajs/medusa-js
```

### postman

url: <https://docs.medusajs.com/api/store>
可下载openapi.yaml在postman中导入

1. 在`{{baseUrl}}/store/auth/token`中获取token
    {
    "email": "<bolepan21@gmail.com>",
    "password": "admin8888"
    }
  
2. 在需要token的api中填入Auth->Type(Bearer Token)->Token

### 使用api

```js
import { medusaClient } from "@lib/config"

const Hero = async () => {
  const { products, limit, offset, count } = await medusaClient.products.list()
  console.log(products)
  return(
    <div>
      {products.length}
    </div>
  )
}
```

### 安装demo

1. 安装后台

```bash
pnpm add @medusajs/medusa-cli -g # 全局安装medusa命令
medusa new my-medusa-store # or npx @medusajs/medusa-cli new
#默认z密码


cd my-medusa-store
medusa develop # or npx medusa develop

medusa seed --seed-file=data/seed.json # 安装demo
# or npx medusa seed --seed-file=data/seed.json


```

2. 安装前台

```bash
npx create-next-app -e https://github.com/medusajs/nextjs-starter-medusa my-medusa-storefront

cd my-medusa-storefront
mv .env.template .env.local

pnpm run dev

```

### 安装字体

#### css中使用自定义字体var(--body-fonts)

```ts
import { Inter, Roboto_Mono } from 'next/font/google'
import styles from './global.css'
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

```css
html {
  font-family: var(--font-inter);
}
 
h1 {
  font-family: var(--font-roboto-mono);
}
```

#### 直接使用字体

```ts
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 添加图片

```tsx
import Image from "next/image"
import logo from "@modules/assets/img/logo.svg"
 
export default function Page() {
  return (
    <Image src={logo} alt="" className="nav__logo-img" />
  )
}
```

### 使用图标

Url:https://article.juejin.cn/post/7321410893680984101

```html
<i className="icon-[solar--4k-bold]" />
```

```bash
npm i @iconify/json @iconify/tailwind -D
pnpm add -D @iconify/json @iconify/tailwind

yarn add -D @iconify/json @iconify/tailwind
```

```jsx
// tailwind.config.js
const { addDynamicIconSelectors } = require('@iconify/tailwind')
export default {
  plugins: [addDynamicIconSelectors()]
}
```

> 图标库： https://yesicon.app/

### a链接和class类判断

```tsx
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {  clx } from "@medusajs/ui"
<LocalizedClientLink
  className={clx(
    "hover:text-ui-fg-base",
    children && "txt-small-plus"
  )}
  href={`/categories/${c.handle}`}
  data-testid="category-link"
>
  {c.name}
</LocalizedClientLink>
```

### 颜色

```tsx
<div className="text-ui-fg-muted"></div>
```

Url: https://docs.medusajs.com/ui/colors/overview

### 启用categories功能

在.env文件中添加`MEDUSA_FF_PRODUCT_CATEGORIES=true`

### h1,h2(Heading)

```tsx
         <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            Ecommerce Starter Template
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            Powered by Medusa and Next.js
          </Heading>
```

### 段落元素P

```tsx
import { Button, Heading, Text, clx } from "@medusajs/ui"           
<Text className="txt-compact-small text-ui-fg-base" data-testid="address-company">
   {address.company}
</Text>
```

### 使用shadcn

```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button

npx shadcn-ui@latest init




```

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

覆盖tailwind.config.js,应先复制一份，然后合并

```js
const path = require("path")
const { addDynamicIconSelectors } = require("@iconify/tailwind")
module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-radix")(), addDynamicIconSelectors()],
}

```

覆盖/src/styles/globals.css，因先复制一份然后再合并

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer utilities {
  /* Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    @apply -translate-y-2 text-xsmall-regular;
  }

  input:focus ~ label {
    @apply left-0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #212121;
    -webkit-text-fill-color: #212121;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
}

@layer components {
  .content-container {
    @apply max-w-[1440px] w-full mx-auto px-6;
  }

  .contrast-btn {
    @apply px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors duration-200 ease-in;
  }

  .text-xsmall-regular {
    @apply text-[10px] leading-4 font-normal;
  }

  .text-small-regular {
    @apply text-xs leading-5 font-normal;
  }

  .text-small-semi {
    @apply text-xs leading-5 font-semibold;
  }

  .text-base-regular {
    @apply text-sm leading-6 font-normal;
  }

  .text-base-semi {
    @apply text-sm leading-6 font-semibold;
  }

  .text-large-regular {
    @apply text-base leading-6 font-normal;
  }

  .text-large-semi {
    @apply text-base leading-6 font-semibold;
  }

  .text-xl-regular {
    @apply text-2xl leading-[36px] font-normal;
  }

  .text-xl-semi {
    @apply text-2xl leading-[36px] font-semibold;
  }

  .text-2xl-regular {
    @apply text-[30px] leading-[48px] font-normal;
  }

  .text-2xl-semi {
    @apply text-[30px] leading-[48px] font-semibold;
  }

  .text-3xl-regular {
    @apply text-[32px] leading-[44px] font-normal;
  }

  .text-3xl-semi {
    @apply text-[32px] leading-[44px] font-semibold;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```



### className样式设置

```tsx
import { clx } from "@medusajs/ui"

          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
```

### 价格

```tsx
cheapest {
  calculated_price_number: 12332,
  calculated_price: '$123.32',
  original_price_number: 12332,
  original_price: '$123.32',
  price_type: 'default',
  percentage_diff: '0'
}
```

### region

区域可以直接从源头带过来，可以说一直都有

```tsx
export default function TabItems({ region }: { region: Region }) {

```

### 分类中商品的信息

用于商品列表显示

/src/lib/util/transform-product-preview.ts

type在/src/types/global.ts

### Button 样式

```tsx
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || !variant || !!disabled || isAdding}
              variant="primary"
              className=" btn px-0 py-0 shadow-buttons-none hover:bg-ui-button-transparent"
              isLoading={isAdding}
              data-testid="add-product-button"
            >
```

### 使用它toast

url:https://react-hot-toast.com/docs

```tsx
npm install react-hot-toast
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

