# 3.6 插槽Slots

## 3.6.1 插槽内容与出口

```html
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```

```html
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>

<!-- 最终渲染 -->
<button class="fancy-btn">Click me!</button>

```

## 3.6.2 渲染作用域

:::tip
父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。
:::

## 3.6.3 默认内容

```html
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

## 3.6.4 具名插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

<!-- #default可以不写 -->
  <!-- <template #default> -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  <!-- </template> -->

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

## 3.6.5 条件插槽

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

## 3.6.6 动态插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 3.6.7 作用域插槽

### 具名作用域插槽

### 高级列表组件示例

### 无渲染组件
