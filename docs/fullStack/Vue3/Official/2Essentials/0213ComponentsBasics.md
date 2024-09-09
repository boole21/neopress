# 2.13 组件基础

## 2.13.1 定义一个组件

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
````

## 2.13.2 使用组件

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

## 2.13.3 传递props

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

```js
const props = defineProps(['title'])
console.log(props.title)
```

## 2.13.4 监听事件

```html
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

## 2.13.5 通过插槽来分配内容

```html
<AlertBox>
  Something bad happened.
</AlertBox>
```

```vue
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

## 2.13.6 动态组件

```html
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

## 2.13.7 DOM内模板解析注意事项

> blog-post-row组件在table中使用

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```
