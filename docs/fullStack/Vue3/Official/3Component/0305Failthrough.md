# 3.5 透传Attributes

## 3.5.1 Attributes 继承

> 指class,style,id

```html
<!-- <MyButton> 的模板 -->
<button class="btn">Click Me</button>

<MyButton class="large" />

<!-- 渲染结果 -->
<button class="btn large">Click Me</button>
```

### `v-on`监听器继承

```html
<MyButton @click="onClick" />
```

## 3.5.2 禁用Attributes继承

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
<template>
  <span>Fallthrough attribute: {{ $attrs }}</span>

  <div class="btn-wrapper">
    <button class="btn" v-bind="$attrs">Click Me</button>
  </div>
</template>
```

## 3.5.3 多根节点的Attributes继承

```html
<CustomLayout id="custom-layout" @click="changeValue" />
```

```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## 3.5.4 在JavaScript中访问透传Attributes

> 可以在 `<script setup>` 中使用 useAttrs() API 来访问一个组件的所有透传 attribute

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```
