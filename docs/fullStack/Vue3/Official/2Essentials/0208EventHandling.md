# 2.8 事件处理

## 2.8.1 监听事件: `v-on` `@`

## 2.8.2 内联事件处理器

> foo() 和 count++ 会被视为内联事件处理器

```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

### 2.8.2.1 在内联处理器中调用方法

```vue
<script setup>
function say(message) {
  alert(message)
}
</script>
<template>
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
</template>
```

### 2.8.2.2 在内联事件处理器中访问事件参数

> 有时我们需要在内联事件处理器中访问原生 DOM 事件。你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数

```vue
<script setup>
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
</script>
<template>
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
</template>
```

## 2.8.3 方法事件处理器

> foo、foo.bar 和 foo['bar'] 会被视为方法事件处理器

```vue
<!-- 方法事件处理器同event.target自动接收原生 DOM 事件并触发执行。 -->
<script setup>
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
</script>
<template>
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
</template>
```

## 2.8.4 事件修饰符

- .stop
- .prevent
- .self
- .capture
- .once
- .passive

## 2.8.5 按键修饰符

```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />

<input @keyup.page-down="onPageDown" />
```

### 2.8.5.1 按键别名

- .enter
- .tab
- .delete (捕获“Delete”和“Backspace”两个按键)
- .esc
- .space
- .up
- .down
- .left
- .right

### 2.8.5.2 系统按键修饰符

- .ctrl
- .alt
- .shift
- .meta

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

- .exact 修饰符

```html
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```

### 2.8.6 鼠标按键修饰符

- .left
- .right
- .middle
