# lama dev beginners

## 1.安装

```bash
npx create-next-app@latest
```

> jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 2.基本页面

> error.jsx必须是“use client"

### 2.1 获取当前页面的路径

```jsx
import { usePathname } from "next/navigation";
 const pathName = usePathname();
```

### 2.2 使用第三方的图片

> next.config.js

```js
export const images = {
  domains: ["www.example.com"],
};
```

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "images.pexels.com",
   },
   {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
   },
  ],
 },
};

module.exports = nextConfig;
```

### 2.3 获取当前页面的参数

```jsx
import { useRouter } from "next/router";
const router = useRouter();
const { id } = router.query;
```

### 2.4 获取当前页面的参数

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "images.pexels.com",
   },
  ],
 },
};

module.exports = nextConfig;
```

### 2.5 使用@/路径
>
> jsconfig.json或tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

### 2.6 使用Image

css中object-fit的使用

1. fill: 默认值，图片被拉伸填充整个容器，不保持原始比例。
2. contain: 图片保持原始比例，同时缩放以适应容器，可能留有空白区域。
3. cover: 图片保持原始比例，同时缩放以覆盖整个容器，可能部分图片会被裁剪。
4. none: 图片保持原始比例，不缩放，可能超出容器。
5. scale-down: 图片保持原始比例，如果原始比例小于容器比例，则缩放以适应容器，否则保持原始比例。

```jsx
   <div className={styles.imgContainer}>
    <Image src="/about.png" alt="About Image" fill className={styles.img} />
   </div>
```

```css
.imgContainer {
 flex: 1;
 position: relative;
}

.img {
 object-fit: contain;
}

```

### 2.7 把彩色图片变灰色

```css
.brands {
 filter: grayscale(1);
}
```

### 2.8 使用服务器渲染时

1. 不能用use hooks
2. 不能用onClick等事件

### 2.9 处理hydration问题

```jsx
import dynamic from "next/dynamic";
const HydrationTestNoSSR = dynamic(() => import("@/components/HydrationTest"), { ssr: false });
<HydrationTestNoSSR />
```

```jsx
<div suppressHydrationWarning>{a}</div> 
```

### 2.10 当我用客户端组件包装服务器端组件时仍然是服务器端组件

## 3. Navigation

/navigationTest/page.jsx

```jsx
import { usePathname, useRouter, useSearchParams } from "next/navigation";

 const router = useRouter(); // 获取router,可以用来跳转页面back,forward,push,refresh
 const pathname = usePathname(); //  '/navigationTest'
 const query = useSearchParams(); // 获取url中的参数
 router.push("/"); // 会留下历史记录
router.replace("/"); // 不会留下历史记录
router.refresh("/"); // 会重新请求页面
router.back("/"); // 会返回上一个页面
```

/app/blog/[slug]/page.jsx

```jsx
const SinglePostPage = ({ params, searchParams  }) => {
 console.log(params); // { slug: 'my-post' }
 console.log(searchParams); // ?page=2 // { page: '2' }
}
```

## 4. fake api

> <https://jsonplaceholder.typicode.com/posts>

```jsx
const getData = async (slug) => {
 const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
 if (!res.ok) {
  throw new Error("Something went wrong");
 }
 console.log(res);
 return res.json();
};
```

## 5. fake data

```js
// TEMPORARY DATA

const users = [
 { id: 1, name: "John" },
 { id: 2, name: "Jane" },
];

const posts = [
 { id: 1, userId: 1, title: "Post 1", body: "This is post 1" },
 { id: 2, userId: 1, title: "Post 2", body: "This is post 2" },
 { id: 3, userId: 2, title: "Post 3", body: "This is post 3" },
 { id: 4, userId: 2, title: "Post 4", body: "This is post 4" },
];

export const getPosts = async () => {
 return posts;
};

export const getPost = async (id) => {
 return posts.find((post) => post.id === +id);
};

export const getUser = async (id) => {
 return users.find((user) => user.id === +id);
};

```

## 6. mongodb

> .env

```env
MONGO = mongodb+srv://bolepan21:admin8888@neopan21dev.npgletw.mongodb.net/next14tutorial?retryWrites=true&w=majority&appName=neopan21dev
```

> /src/lib/utils.js

```js
const { default: mongoose } = require("mongoose");

const connection = {};

export const connectToDb = async () => {
 try {
  if (!connection.isConnected) {
   console.log("Using existing connection");
   return;
  }
  const db = await mongoose.connect(process.env.MONGO);
  connection.isConnected = db.connections[0].readyState;
 } catch (error) {
  throw new Error(error);
 }
};

```

> 使用在线数据库<https://cloud.mongodb.com/v2/660ebc1e1ae3c10ec4726537#/overview>

1. Database Access-> Add New Database User
2. Network Access -> Add Ip Address -> 0.0.0.0/0 任何人都可以访问
3. Database -> Create -> next14tutorial

## 7. meta title description

```tsx
export const metadata = {
 title: "Next App Title",
 description: "Next.js starter app Description",
};
```

/layout.js

```tsx
export const metadata = {
 title: {
  default: "Next.js 14 Homepage",
  template: "%s | Next.js 14",
 },
 description: "Next.js starter app Description",
};
```

/blog/first

```tsx
export const generateMetadata = async ({ params }) => {
 const { slug } = params;

 const post = await getPost(slug);
 return {
  title: post.title,
  description: post.desc,
 };
};

```

## 8. Server Actions

```jsx
const ServerActionTestPage = () => {
 return (
  <div>
   <form action={addPost}>
    <input type="text" placeholder="title" value="title" name="title" />
    <input type="text" placeholder="desc" value="desc" name="desc" />
    <input type="text" placeholder="slug" value="slug" name="slug" />
    <input type="text" placeholder="userId" value="userId" name="userId" />
    <button>Create</button>
   </form>
   <form action={deletePost}>
    <input type="text" placeholder="postId" name="id" />
    <button>Delete</button>
   </form>
  </div>
 );
};
```

```jsx
"use server";
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";

export const addPost = async (formData) => {
 const { title, desc, slug, userId } = Object.fromEntries(formData);

 try {
  connectToDb();
  const newPost = new Post({ title, desc, slug, userId });
  await newPost.save();
  console.log("saved to db");
  revalidatePath("/blog");
 } catch (err) {
  console.log(err);
  return { error: "Something went wrong" };
 }
};

export const deletePost = async (formData) => {
 const { id } = Object.fromEntries(formData);

 try {
  connectToDb();
  await Post.findByIdAndDelete(id);
  console.log("deleted from db");
  revalidatePath("/blog");
 } catch (err) {
  console.log(err);
  return { error: "Something went wrong" };
 }
};

```

## 9. Api router

创建

### 9.1 /app/api/blog/route.js

```js
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
 try {
  connectToDb();
  const posts = await Post.find();
  return NextResponse.json(posts);
 } catch (err) {
  console.log(err);
  throw new Error("Failed to fetch posts!");
 }
};

```

```jsx
// FETCH DATA WITH AN API
const getData = async (slug) => {
 const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
 if (!res.ok) {
  throw new Error("Something went wrong");
 }
 console.log(res);
 return res.json();
};
```

### 9.2 /app/api/blog/\[slug\]/route.js

```js
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
 const { slug } = params;
 try {
  connectToDb();
  const post = await Post.findOne({ slug });
  return NextResponse.json(post);
 } catch (err) {
  console.log(err);
  throw new Error("Failed to fetch post!");
 }
};

export const DELETE = async (request, { params }) => {
 const { slug } = params;
 try {
  connectToDb();
  await Post.deleteOne({ slug });
  return NextResponse.json("Post deleted");
 } catch (err) {
  console.log(err);
  throw new Error("Failed to delete post!");
 }
};

```

## 10 Authentication

1. <https://authjs.dev/getting-started/installation?framework=Next.js>
2. url:<https://authjs.dev/getting-started/authentication/oauth>
3. client,server

> client

```jsx
"use client";
import { signIn } from "next-auth/react";
import React from "react";
const LoginPage = () => {
 return (
  <div>
   <button onClick={() => signIn("google", { callbackUrl: "/my-account" })}>Login with Google</button>
   <button onClick={() => signIn("github", { callbackUrl: "/my-account" })}>Login with Github</button>
  </div>
 );
};

export default LoginPage;

```

> server

```jsx
import { auth, signIn } from "@/auth/authSetup";

const LoginPage = async () => {
 const session = await auth();
 console.log("session", session);
 const handleGithubLogin = async () => {
  "use server";
  console.log("signIn", await signIn());
  await signIn("github");
 };
 return (
  <div>
   <form action={handleGithubLogin}>
    <button>Login with Github</button>
   </form>
   {/* <form
    action={async () => {
     "use server";
     await signIn("google");
    }}
   >
    <button type="submit">Signin with Google</button>
   </form> */}
  </div>
 );
};

export default LoginPage;

```

> auth/authSetup.js

```js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
 providers: [Google, Github],
 callbacks: {
  authorized: async ({ auth }) => {
   // Logged in users are authenticated, otherwise redirect to login page
   return !!auth;
  },
 },
 pages: {
  signIn: "/login",
 },
});

```

> .env.local

```bash
MONGO = mongodb+srv://lamadev:lamadev@lamadev.p3umv.mongodb.net/next14tutorial?retryWrites=true&w=majority&appName=lamadev

AUTH_SECRET="02h****" # Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_URL = http://localhost:3000/api/auth

AUTH_GITHUB_ID="*****"
AUTH_GITHUB_SECRET="****"

AUTH_GOOGLE_ID="****"
AUTH_GOOGLE_SECRET="****"
```
