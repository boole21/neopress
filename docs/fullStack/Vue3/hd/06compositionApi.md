# 第六章 composition api 基础

## 1.创建 vue3 项目

> Terms:选项 Api,组合 Api

## 2.ref:使用 ref 处理响应数据

> Terms: ref,num.value

- setup 中的值使用 ref 进行包装 ref(2),获取变量的值时使用 num.value,在元素中只要使用 num 即可
- 使用 setup 语法,组合 api 后,就可以按原生 js 中一样使用变量和函数了

```javascript
import { ref } from "vue";
export default {
  setup() {
  let num = ref(2);
  let add = () => {
   num.value++;
   console.log(num.value);
  };
  return { num, add };
 },
};
```

## 3.watch:watch 监听在 setup 中的使用

```javascript
import { watch } from "vue";
export default {
 setup() {
  watch(num, (v) => {
   if (v < 0) num.value = 0;
  });
 },
};
```

## 4.watchEffect:watchEffect 监听数据

> Terms: watchEffect,

:::tip

1. 第一启动时会执行一次
2. 当 watchEffect 中使用了响应式数据时将自动执行,不需要手动传入响应式数据newValue
3. 使用`let stop=` 让监听失效`stop()`

:::

```javascript
import { watchEffect } from "vue";
export default {
 setup() {
  watchEffect(() => {
   if (num.value < 0) num.value = 0;
  });
 },
};
```

```javascript
const stop = watchEffect(() => {
 if (num.value < 0) num.value = 0;
});
stop();
```

## 5.props:props 在 setup 中的使用

```javascript
  props: {
    init: { type: Number, default: 3 }
  },
  setup(props) {
    let num = ref(props.init)
 }
```

## 6.emits:setup 中数组事件调用

```javascript
export default {
 props: {
  init: { type: Number, default: 3 },
 },
 emits: ["change"],
 setup(props, context) {
  console.log("context", context);
  const { emit } = context;
  let num = ref(props.init);
  let add = () => {
   num.value++;
   emit("change", num.value);
  };
  let sub = () => {
   num.value--;
   emit("change", num.value);
  };
  const stop = watchEffect(() => {
   if (num.value < 0) num.value = 0;
   //初始化时触发
   emit("change", num.value);
  });

  stop();
  return { num, add, sub };
 },
};
```

## 7.父组件操作子组件与 expose 限定

> Terms: onMounted,?.,expose

:::tip

1. `const countComponent = ref();`读取组件元素

2. countComponent.value?.num 其中?.为没有 num 就不读取,有 num 再读取
3. 父组件中可以读取子组件中的全部内容,使用 expose 限定父组件读取子组件的内容

:::

```vue
<template>
 <div>
  <count :init="3" @change="changeHandle" ref="countComponent" />
 </div>
 {{ count }}
</template>

<script>
 import Count from "./components/Count.vue";
 import { ref, onMounted } from "vue";

 export default {
  components: { Count },
  setup() {
   let count = ref(0);
   let countComponent = ref();
   onMounted(() => {
    // 可以获取到组件中的值
    console.log(countComponent.value.num);
   });
   const changeHandle = (v) => (count.value = v);
   return { count, changeHandle, countComponent };
  },
 };
</script>
```

```vue
<!-- changeHandle传递子组件返回父组件中的内容,也执行changeHandle()函数 -->
<template>
 <div>
  <count :init="3" @change="changeHandle" ref="countComponent" />
 </div>
 <!-- {{ count }} -->
 {{ changeHandle() }}
</template>

<script>
 import Count from "./components/Count.vue";
 import { ref, onMounted } from "vue";

 export default {
  components: { Count },
  setup() {
   let count = ref(0);
   let countComponent = ref();
   const changeHandle = () => {
    console.log("countComponent.value", countComponent.value);
    return countComponent.value?.num;
   };
   return { count, changeHandle, countComponent };
  },
 };
</script>
```

```javascript
//父组件
onMounted(() => {
 console.log("num", countComponent.value.num);
});
// 子组件
const { expose } = context;
expose({ num });
```

## 8.attrs,slots:组件 slots 与 attrs 处理

> Terms:attrs

:::tip

1. $attrs 全部接,$attrs.style 接一个
2. slot中使用`<component :is="defaults[0]" />`来读取插槽中的内容

:::

```vue
<template>
 <span :style="attrs.style">{{ num }}</span>
</template>
<script>
 export default {
  // 如果有多个标签$attrs默认不知道放哪里,会报错
  inheritAttrs: false,
  setup(context) {
   const { attrs } = context;
   return { attrs };
  },
 };
</script>
```

```vue
<template>
 <component :is="defaults[0]"></component>
 <component :is="defaults[2]"></component>
</template>
<script>
 export default {
  setup(context) {
   const { slots } = context;
   const defaults = slots.default();
   return { slots };
  },
 };
</script>
```

## 9.computed 与生命周期函数定义

:::tip

1. setup 中没有 beforeCreate,created 什么周期,可以认为 setup 中就是 created()
2. onMounted,onBeforeMount,onBeforeUpdate,onUpdated,onUnmounted,onBeforeUnmounted

:::

```javascript
import { ref, watch, watchEffect, computed } from "vue";
let sum = computed(() => num.value + 100);
return { num, add, sub, attrs, defaults, sum };
```

## 10.provide 与 inject

:::tip

1. 在子组件中使用`const updateUser = inject("updateUser");`来获取父组件中的内容

:::
> App.vue

```javascript
import { provide } from "vue";
export default {
 setup() {
  provide("user", user);
  provide("updateUser", (newValue) => {
   user.value = newValue;
  });
 },
};
```

```vue
<template>
 <button @click="updateUser('后盾人')">{{ user }}</button>
</template>
<script>
 import { inject } from "vue";
 export default {
  setup() {
   const user = inject("user", "后盾人-向军");
   const updateUser = inject("updateUser");
   return { user, updateUser };
  },
 };
</script>
```

## 11.reactive 对比 ref

:::tip

1. 使用ref需要加value，引用类型可使用reactive不用加value
2. reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的,当`hd={};hd.name="向军"`时，reactive()返回的 Proxy 对象的 name 属性是响应式的，而原始对象 hd 的 name 属性不是响应式的，所以模板中不会正常显示name.

:::

> Terms: reactive

```vue
<!-- 使用ref来使用引用类型 -->
<template>
 <button @click="change">
  {{ hd }}
 </button>
</template>

<script>
 import { ref } from "vue";
 export default {
  setup() {
   const hd = ref([]);
   const change = () => hd.value.push(100);
   return { hd, change };
  },
 };
</script>
```

```vue
<!-- 使用reactive简化来使用引用类型数组和对象 -->
<template>
 <button @click="change1">
  {{ hd1 }}
 </button>
</template>

<script>
 import { ref, reactive } from "vue";
 export default {
  setup() {
   const hd = reactive([]);
   const hd1 = reactive({ name: "后盾人" });
   const change = () => hd.push(100);
   const change1 = () => (hd1.name = "向军");
   return { hd, change, hd1, change1 };
  },
 };
</script>
```

## 12.toRefs 是怎么用的

> Terms:toRefs

:::tip

1. 使用toRefs可以把返回的值变为响应式数据

:::

```vue
<!-- 把返回的值变为响应式数据 -->
<template>
  <button @click="change">
    {{name}}
  </button>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  setup() {
    const hd = reactive({ name: '后盾人' })
    const change = () => hd.name = '向军'
    return { ...toRefs(hd), change }
  }
}
```
