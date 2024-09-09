# 3.7 依赖注入: `provide`,`inject`

## 3.7.1 Prop逐级透传问题

## 3.7.2 Provide

```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

## 3.7.3 应用层Provide

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

## 3.7.4 Inject

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

### 注入默认值

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')

const value = inject('key', () => new ExpensiveClass(), true)
```

## 3.7.5 和响应式数据配合使用

***建议尽可能将任何对响应式状态的变更都保持在供给方组件中。***

> 可能需要在注入方组件中更改数据。推荐在供给方组件内声明并提供一个更改数据的方法函数(updateLocation)

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

### readonly()

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

## 3.7.6 使用Symbol作注入名
