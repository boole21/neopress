# 2.2 模板语法

## 2.2.1 文本插值: `\{\{}}` 双括号

```html
<span>Message: {{msg}}</span>
```

## 2.2.2 原始 HTML: `v-html`

```template
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

## 2.2.3 Attribute 绑定: `v-bind`

```template
<div v-bind:id="dynamicId"></div>
<!-- 简写 -->
<div :id="dynamicId"></div> 

<!-- 与 :id="id" 相同 -->
<div :id></div>

<!-- 这也同样有效 -->
<div v-bind:id></div>

<!-- 布尔 -->
<button :disabled="isButtonDisabled">Button</button>
```

> 动态绑定多个值

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```

```template
<div v-bind="objectOfAttrs"></div>
```

## 2.2.4 使用 JavaScript 表达式:`\{\{number+1\}\}`

> Js表达式适用场景

1. {{}}
2. v-开头的特殊attribute

```template
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

```template
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

## 2.2.5 指令Directives

### 2.2.5.1 参数Arguments: `:href`,`@click`

```template
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>

<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

### 2.2.5.2 动态参数:[attributeName]

```template
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething"> ... </a>
```

### 2.2.5.3 修饰符Modifiers:`.prevent`

```template
<!-- 触发事件调用event.preventDefault() -->
<form @submit.prevent="onSubmit">...</form>
```
