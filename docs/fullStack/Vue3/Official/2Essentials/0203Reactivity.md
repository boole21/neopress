# 2.3 响应式基础

## 2.3.1 声明响应式状态

### 2.3.1.1 `ref()`

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### 2.3.1.2 `<script setup>`

### 2.3.1.3 深层响应性

::: tip
Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。
:::

``` js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

### 2.3.1.4 DOM更新时机nextTick

> 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API：

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

## 2.3.2 reactive()

### 2.3.2.1 代理Proxy

:::tip
ref
() 和 reactive() 都返回响应式对象，但 ref() 返回的响应式对象是通过 .value 属性访问的，而 reactive() 返回的响应式对象是通过对象属性访问的。
***由于这些限制，我们建议使用 ref() 作为声明响应式状态的主要 API。***
:::

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

```template
<button @click="state.count++">
  {{ state.count }}
</button>
```

- reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的

### 2.3.2.2 局限性

1. 有限的值类型,只能用于对象类型(对象，数组，Map，Set),不用于原始类型(string,number,boolean)
2. 不呢替换整个对象
3. 对解构操作不友好

## 2.3.3 额外的 ref 解包细节

```js
const count = ref(0)
const object = { id: ref(1) }
const { id } = object//{{ id + 1 }}=2
```
