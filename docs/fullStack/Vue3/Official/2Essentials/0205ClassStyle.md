# 2.5 Class 与 Style 绑定

## 2.5.1 绑定 HTML Class

### 绑定对象

```vue
<script setup>
const isActive = ref(true)
const hasError = ref(false) 
</script>
<template>
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

<!-- 渲染的结果会是： -->
<div class="static active"></div>
</template
```

```vue
<!-- 对象 -->
<script setup>
  const classObject = reactive({
    active: true,
    'text-danger': false
  })
</script>
<template>
  <div :class="classObject"></div>
</template>
```

```vue
<!-- 计算属性 -->
 <script setup>
  const isActive = ref(true)
  const error = ref(null)

  const classObject = computed(() => ({
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal'
  }))
</script>
<template>
  <div :class="classObject"></div>
</template>
```

### 绑定数组

```vue
<!-- 绑定一个数组渲染多个Css class -->
<script setup>
const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>
<template>
  <div :class="[activeClass, errorClass]"></div>
</template>
<!-- 渲染结果 -->
<template>
 <div class="active text-danger"></div>
</template>
```

```template
<!-- 有条件渲染 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

```template
<!-- 数组中嵌套对象 -->
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

### 在组件上使用

```template
<MyComponent class="baz" />

<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

## 2.5.2 绑定内联样式:`:style`

### 1 绑定对象

```template
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```vue
<script setup>
const activeColor = ref('red')
const fontSize = ref(30)
</script>
<template>
  <div :style="styleObject"></div>
</template>
```

### 2 绑定数组

```template
<div :style="[baseStyles, overridingStyles]"></div>
```
