# 2.4 计算属性

## 2.4.1 基本示例

> 计算属性值会基于其响应式依赖被缓存

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'

})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

## 2.4.2 最佳实践

1. Getter 不应有副作用: 不要改变其他状态、在 getter 中做异步请求或者更改 DOM！
2. 避免直接修改计算属性值
