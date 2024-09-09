# 2.6 条件渲染

## 2.6.1 v-if

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

## 2.6.2 v-else

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

## 2.6.3 v-else-if

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else-if="ok">Oh well</h1>
<h1 v-else>Oh no 😢</h1>
```

## 2.6.4 `<template>`上的v-if

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## 2.6.5 v-show

```html
<h1 v-show="awesome">Vue is awesome!</h1>
```

## 2.6.6 注意

1. v-show = display:none
2. v-if,v-for不一起使用
