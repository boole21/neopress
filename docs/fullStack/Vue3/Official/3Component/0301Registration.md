# 3.1 组件注册

## 3.1.1 全局注册

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

## 3.1.2 局部注册

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## 3.1.3 组件名格式
>
> 使用 PascalCase 作为组件名的注册格式
