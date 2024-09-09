# 3.3 组件事件

## 3.3.1 触发与监听事件

```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
<MyComponent @some-event="callback" />
<MyComponent @some-event.once="callback" />
```

## 3.3.2 事件参数

```html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>

<MyButton @increase-by="(n) => count += n" />

```

```vue
<script setup>
function increaseCount(n) {
  count.value += n
}
</script>
<template>
  <MyButton @increase-by="increaseCount" />
</template>
```

## 3.3.3 声明触发的事件

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

> 支持对象语法，通过 TypeScript 为参数指定类型，允许我们对触发事件的参数进行验证

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

## 3.3.4 事件验证

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
