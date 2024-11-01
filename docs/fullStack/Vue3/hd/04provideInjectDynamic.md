# 第四章 provide-inject 与动态组件

## 1.component:动态组件的使用案例

> Terms: component :is=,
:::tip

1. 动态调用组件 `<component :is="currentComponent" />`  

```vue
<template>
  <main>
  <div
   v-for="(component, index) in components"
   :key="index"
   @click="currentComponent = component.name"
  >
   {{ component.title }}
  </div>
 </main>
 <!-- 动态的调用组件 -->
 <component :is="currentComponent" />
</template>

<script>
 import Wexin from "./components/Wexin.vue";
 import Pay from "./components/Pay.vue";
 export default {
  components: { Wexin, Pay },
  data() {
   return {
    currentComponent: "wexin",
    components: [
     { title: "微信管理", name: "wexin" },
     { title: "在线支付", name: "pay" },
    ],
   };
  },
 };
</script>

<style lang="scss" scoped>
 main {
  display: flex;

  div {
   border: solid 1px #ddd;
   padding: 10px;
   margin-right: 20px;
   cursor: pointer;
  }
 }
</style>
```

## 2.全局组件注册与样式优化

> Terms: 全局组件注册
> main.js
:::tip

1. 注册全局组件`app.component("card", Card);`
2. 激活当前标题样式`:class="{ active: component.name == currentComponent }"`

:::

```javascript
// 注册完全局组件,就可以直接使用<card />调用了
import Card from "./components/Card.vue";
const app = createApp(App);
app.component("card", Card);
app.mount("#app");
```

> components/Card.js

```vue
<!-- 全局组件Card -->
<template>
 <div>
  <header>
   <slot name="header" />
  </header>
  <main>
   <slot />
  </main>
 </div>
</template>

<script>
 export default {};
</script>

<style lang="scss" scoped>
 div {
  border: solid 1px #ddd;
  margin-top: 20px;
  border-radius: 5px;

  header {
   border-bottom: solid 1px #ddd;
   padding: 10px;

   background-color: #f3f3f3;
  }

  main {
   padding: 10px;
  }
 }
</style>
```

```javascript
// 被选中的class为active
:class="{ active: component.name == currentComponent }"
```

> components/Wexin.vue

```html
<card>
 <template #header>微信</template>
 <div>支付的表单...</div>
</card>
```

> components/Pay.vue

```html
<card>
 <template #header>支付</template>
 <div>支付的表单...</div>
</card>
```

## 3.全局 XInput 组件定义

```vue
<template>
 <label>
  <div>{{ title }}</div>
  <input />
 </label>
</template>

<script>
 export default {
  props: ["title", "modelValue"],
 };
</script>

<style lang="scss" scoped>
 label {
  display: flex;
  align-items: center;

  div {
   color: #666;
   font-size: 16px;
   margin-right: 10px;
  }

  input {
   border: solid 2px #ddd;
   padding: 5px 10px;
   color: #666;
   outline: none;
  }
 }
</style>
```

## 4.自定义 input:XInput 数据绑定

:::tip

1. 通过修改 x-input 组件中的内容,可以统一定义 input 的样式,就比如 element-plus 中定义的 input
2. 通过 v-model 的原理来封装 input 组件,在子组件中使用 `props:['modelValue'],emits:['update:modelValue']`
3. 或使用watch监听content,当content变化时,通过`this.$emit("update:modelValue", v);`来修改父组件中的数据

:::

```html
<!-- 在父组件中使用 -->
<x-input title="微信号" v-model="appName" />
```

```vue
<template>
 <label>
  <div>{{ title }}</div>
  <input v-model="content" />
  {{ content }}
 </label>
</template>

<script>
 export default {
  props: ["title", "modelValue"],
  emits: ["update:modelValue"],
  data() {
   return {
    content: this.modelValue,
   };
  },
  watch: {
   content(v) {
    this.$emit("update:modelValue", v);
   },
  },
 };
</script>

<style lang="scss" scoped>
 label {
  display: flex;
  align-items: center;

  div {
   color: #666;
   font-size: 16px;
   margin-right: 10px;
  }

  input {
   border: solid 2px #ddd;
   padding: 5px 10px;
   color: #666;
   outline: none;
  }
 }
</style>
```

## 5.使用 provide 与 inject 完成数据穿透

> Terms: provide,inject,数据穿透

:::tip

1. provide,inject 为祖孙关系
2. 常量`provide: { webname: "向军大叔" },`
3. data中值`provide() { return { webname: this.teacher } },`
4. 响应式
   1. 计算属性`provide(){return {webname:computed(()=>this.teacher)}}`
   2. 引用类型`provide(){return {webname:this.teacher}}` `teacher:{name:'向军大叔'}`

:::

```javascript
// 祖先
provide: {
 webname: "向军大叔";
}
// 祖先使用自定义数据
provide() { return { webname: this.teacher } },

// 子孙
inject: ["webname"];
```

```javascript
// 若想祖孙数据响应,可使用传递引用类型
provide(){return {webname:this.teacher}}
// 响应数据为引用类型
teacher:{name:'向军老师'}

// 子孙中使用
inject: ['webname'],
{{ webname.name }}

```

```javascript
// 也可以使用计算属性computed
import { computed } from 'vue'

provide() { return { webname: computed(() => this.teacher) } },
teacher: '向军老师',
// main.js中打开
app.config.unwrapInjectedRef = true
```

## 6.自定义 XTextarea 文本域

```vue
<template>
 <label>
  <div>{{ title }}</div>
  <textarea
   v-model="content"
   :rows="rows"
   @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
 </label>
</template>

<script>
 export default {
  props: {
   title: { type: String, required: true },
   modelValue: String,
   rows: {
    type: Number,
    default: 3,
   },
  },
  emits: ["update:modelValue"],
  inject: ["webname"],
  data() {
   return {
    content: this.modelValue,
   };
  },
 };
</script>

<style lang="scss" scoped>
 label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  div {
   color: #666;
   font-size: 16px;
   margin-right: 10px;
   width: 100px;
  }

  textarea {
   border: solid 2px #ddd;
   padding: 5px 10px;
   color: #666;
   outline: none;
  }
 }
</style>
```

## 7. 使用 provide 和 inject 管理配置

```javascript
  provide() { return { webname: computed(() => this.teacher), config: this.config } },
  inject: ['config'],
```

## 8.站点全局配置示例

```vue
<template>
 <card>
  <template #header>站点信息</template>
  <div>
   <x-input title="网站名称" v-model="config.site.title" />
   <x-textarea title="站点介绍" v-model="config.site.desc" />
  </div>
 </card>
 {{ config }}
</template>

<script>
 export default {
  inject: ["config"],
 };
</script>
```

## 9.keep-alive 缓存组件

**目的:** 解决切户标签,保存更改组件中的数据

> Terms: keep-alive

```html
<keep-alive>
 <component :is="currentComponent" />
</keep-alive>
```

## 10 使用 ref 操作组件

> Terms: ref,this.$ref,

:::tip

- 可以在父组件中通过 this.$refs.来选取子组件,并使用子组件中的方法

:::

```vue
<template>
 <button @click="callComponent">调用组件</button>
 <input type="text" ref="input" />
 <keep-alive>
  <component :is="currentComponent" ref="component" />
 </keep-alive>
</template>
<script>
 export default {
  methods: {
   callComponent() {
    // this.$refs.input.value = "向军大叔";
    this.$refs.component.show();
   },
  },
 };
</script>
```
