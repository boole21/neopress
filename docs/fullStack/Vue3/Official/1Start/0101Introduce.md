# 1. 简介

## 1.1 术语

`Vue`,`声明式渲染`,`响应式`,`渐进式框架`,`SPA`,`SSR`,`SSG`,`单文件组件SFC`,`选项式Api(option)`,`组合式Api(composition Api)`

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

## 1.2 快速上手

- 创建一个Vue `$ pnpm create vue@latest`

```bash
$ pnpm create vue@latest 
cd vue-demo
pnpm install
pnpm run dev 
pnpm run build // 发布到生产环境
```

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```
