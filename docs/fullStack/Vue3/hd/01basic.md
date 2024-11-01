# 第一章 新手入门启航篇

## 0.视频代码:视频与代码获取方式

[vue3 代码 url](https://cdn.bootcdn.net/ajax/libs/vue/3.2.31/vue.global.prod.js)

## 1.简史:开发简史与为什么要学习 vue.js

## 2.开发环境:开发环境的配置

- 安装nvm`brew install nvm`

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
# nvm用于控制node版本
node -v
nvm install 14
nvm use
npm config set registry https://registry.npm.taobao.org
npm install -g yarn
```

## 3.vscode:vscode 插件安装

## 4.chrome,devtools:浏览器与 vue3 Devtools 开发者工具

## 5.SPC:什么是单页面开发及优势

terms: SPC,单页面组件

## 6.文档:学习建议与 vue 文档及 Github

[vue3 文档](https://v3.cn.vuejs.org/guide/introduction.html)

## 7.CDN:使用 CDN 创建第一个 Vue 应用

> hd.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
   <meta charset="UTF-8" />
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.global.js"></script>
  <title>后盾人</title>
 </head>
 <body>
  <!-- <h1>向军大叔</h1> -->
  <div id="app">
   <h1>{{title}}</h1>
  </div>
  <script src="hd.js"></script>
 </body>
</html>
```

> hd.js

```javascript
Vue.createApp({
 data() {
  return {
   title: "后盾人",
  };
 },
 // template: `
 // <div>houdunren.com -
 // {{title}}
 // </div>`,
}).mount("#app");
```

## 8 {{}}:后台数据读取方法

> 术语: v-for,window.lessons

```html
<body>
 <!-- <h1>向军大叔</h1> -->
 <div id="app">
  <!-- <h1>{{lessons}}</h1> -->
  <h2 v-for="lesson in lessons">{{lesson.title}}</h2>
 </div>
 <script>
  // window.lessons = <?php echo json_encode(); ?>
  window.lessons = [
   { title: "第五章 装饰器 Decorators" },
   { title: "第四章 泛型 Generices" },
  ];
 </script>
 <script src="hd.js"></script>
</body>
```

> hd.js

```javascript
Vue.createApp({
 data() {
  return {
   lessons: window.lessons,
  };
 },
}).mount("#app");
```

## 9.template:应用与实践的实例剖析

> 术语：const，data，template

```html
<body>
 <div id="app"></div>
 <script src="hd.js"></script>
</body>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "根组件-父亲",
  };
 },
 template: `<div>{{name}}-<xj /></div>`,
});
app.component("xj", {
 data() {
  return {
   name: "向军大叔",
  };
 },
 template: `<h2 style="background-color: red; color: white;" >{{name}}</h2>`,
});
const vm = app.mount("#app");
// console.log(vm.name)
```

## 10.v-text:文本数据操作

> 术语：v-text,v-html,vm.$data.name

- 可使用vm.name或者vm.$data.name来获取数据,来实现数据双向绑定
- `<div>{{name}}</div>`与`<div v-text="name"></div>`效果相同
- 使用v-html来显示

```html
<body>
 <div id="app">
  <!-- {{name}} -->
  <!-- <div v-text="name"></div> -->
  {{html}}
  <!-- <div v-html="html">{{html}}</div> -->
 </div>
 <script src="hd.js"></script>
</body>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "根组件-父亲",
   html: `<div style="color: red">houdunren.com</div>`,
  };
 },
});

const vm = app.mount("#app");
// console.log(vm.app)
setTimeout(() => {
 vm.$data.name = "向军大叔";
}, 3000);
```

## 11.v-bind[]:动态属性也指令基础

> 术语: 动态属性,v-bind,v-show,v-once,动态控制属性名字[arg]

- `:[arg]="value"`其中[arg]是动态属性名，[value]是动态属性值,渲染为id="yahoo"

```html
<div id="app">
 <!-- <div v-bind:id="id">{{name}}</div> -->
 <!-- <div :id="id">{{name}}</div> -->
 <!-- {{n==1?'后盾人':'向军'}} -->
 <!-- <div v-show="false">{{name}}</div> -->
 <!-- <div v-show="true">{{name}}</div> -->
 <!-- <div v-once>{{name}}</div>
      <div>{{name}}</div> -->
 <a :[arg]="value">{{name}}</a>
</div>
<script src="hd.js"></script>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "后盾人",
   // id: 'hd',//如果是null,undefined,则不设置id
   n: 1,
   value: "yahoo",
   arg: "id",
  };
 },
});

const vm = app.mount("#app");

setTimeout(() => {
 // vm.id = 'houdunren.com'
 // vm.n = 100
 vm.name = "向军大叔";
 vm.arg = "href";
 vm.value = "https://www.houdunren.com";
}, 2000);
```

## 12.methods:方法的使用细节

> terms: v-on,@,event,event.preventDefault

1. `v-on:click="add"`与`@click="add"`效果相同
2. `@[event]="add"`动态绑定事件,用的少
3. `event.preventDefault()`链接不跳转了@click.prevent
4. `@click.prevent="go($event,'向军')"`方法中go(event,title){},这里需要使用$event绑定事件可添加
4. `@click.prevent="go('向军')"`方法中go(title){}

```html
<div id="app">
 <!-- <div v-on:click="add">{{name}}</div> -->
 <!-- <div @click="add">{{name}}</div> -->
 <!-- <div @[event]="add">{{name}}</div> -->
 <!-- <a href="https://www.houdunren.com" @click="go">{{name}}</a> -->
 <!-- <a href="https://www.houdunren.com" @click.prevent="go($event,'向军')">{{name}}</a> -->
 <button @click="desc">减少</button>
 {{num}}<button @click="add">增加</button>
 <div style="background-color: red; color: white" v-if="error">
  提示：{{error}}
 </div>
</div>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "后盾人",
   // event: 'click',
   // event: 'mouseenter',
   num: 1,
   error: "",
  };
 },
 methods: {
  add(event) {
   this.error = "";
   // alert(3)
   if (this.num < 10) {
    this.num++;
   } else {
    this.error = "不能超过10";
   }
  },
  desc(event) {
   this.error = "";
   if (this.num > 0) {
    this.num--;
   } else {
    this.error = "不能小于0";
   }
  },
  go(event, title) {
   // event.preventDefault()//不跳转了
   alert(title);
  },
 },
});

const vm = app.mount("#app");
```

## 13.computed:计算属性 computed 使用

> terms: computed,get,set

:::tip

- computed计算属性error需要根据响应式数据this.num动态计算
- 使用 computed`{{error}}` 与 methods`{{error()}}` 功能等同,但 computed 性能更改,computed 只用动态数据发送变化才进行渲染
- 比如可用于价格排序
- watch,computed 各自处理的数据关系的场景不同.watch(一个数据影响多个数据)computed(一个数据受多个数据影响)

:::

```html
<div id="app">
 <!-- {{error}} -->
 <!-- <h2 v-text="error"></h2> -->
 <button @click="desc">减少</button>
 {{num}}<button @click="add">增加</button>
 <div style="background-color: red; color: white" v-if="error">
  提示：{{error}}<!-- 使用computed的函数跟使用属性一样不用带() -->
 </div>
</div>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "后盾人",
   num: 1,
  };
 },
 computed: {
  error() {
   // return this.num //响应式数据，点击后值跟着变
   // return new Date
   // const t =new Date().getTime()
   // return t + this.num
   return this.num == 0 ? "不能小于0" : this.num == 10 ? "不能超过10" : "";
  },
 },
 methods: {
  add(event) {
   if (this.num < 10) {
    this.num++;
   }
  },
  desc(event) {
   if (this.num > 0) {
    this.num--;
   }
  },
 },
});

const vm = app.mount("#app");
```

```javascript
 computed: {
  error: {
   get() {
    this.message =
     this.num == 0 ? "不能小于0" : this.num == 10 ? "不能超过10" : "";
    if (this.message) return this.tip + this.message;
   },
   set(tip) {
    this.tip = tip;
   },
  },
 }
```

## 14.watch:侦听器 watch 的使用

> terms: optionApi,选项 Api,watch,newValue,oldValue

```html
<div id="app">
 <button @click="desc">减少</button>
 {{num}}<button @click="add">增加</button>
 <div style="background-color: red; color: white" v-if="error">
  提示：{{error}}
 </div>
</div>
```

```javascript
const app = Vue.createApp({
 data() {
  return {
   name: "后盾人",
   num: 1,
   error: "",
  };
 },
 watch: {
  num(newValue, oldValue) {
   console.log(newValue, oldValue);
   this.error =
    newValue == 0 ? "不能小于0" : newValue == 10 ? "不能超过10" : "";
  },
 },
 methods: {
  add(event) {
   if (this.num < 10) this.num++;
  },
  desc(event) {
   if (this.num > 0) this.num--;
  },
 },
});

const vm = app.mount("#app");
```

## 15.构建工具:vue-cli 与 vite 构建项目:构建工具,cli

> terms vite,vue-cli,npm,yarn

```bash
yarn global add @vue/cli # 全局安装vue-cli

vue create b1
npm run serve

npm install vue@next
npm install -D @vue/compiler-sfc
npm install -g @vue/cli
```

> 使用 npm 来创建项目

```bash
npm init vite my-project
cd my-project
npm install -D tailwindcss postcss autoprefixer
npm run dev
```

> 使用 yarn 创建项目

```bash
yarn create vite b2 --template vue
cd b2
yarn
yarn dev
```

## 16.文件结构:vue 项目文件结构介绍

## 17.样式 css:全局样式与组件样式

```bash
yarn add -D sass
main.js 添加import './assets/global.scss’ //使用全局的样式
```

### 18.组件隔离:组件样式隔离的方式

> term: components,sass,scss,scoped

scoped 可以把改组件中的样式与其他组件隔离开.
建议不使用 scoped,而在外面包一层`<div class="classComponent">`

```vue
<template>
 <div>
  <class-component />
 </div>
</template>

<script>
 import ClassComponent from "./components/ClassComponent.vue";
 export default {
  components: { ClassComponent },
 };
</script>

<style lang="scss" scoped></style>
```

- 推荐使用这种，减少性能开销

```vue
<template>
 <div class="classComponent">
  <div class="hd">后盾人</div>
 </div>
</template>

<script>
 export default {};
</script>

<style lang="scss">
 .classComponent {
  .hd {
   color: red;
  }
 }
</style>
```

## 19.处理样式:CSS 样式的多种处理:class

:class 可使用对象{},数组[],数组[{},{}],属性 active

```vue
<template>
 <div class="classComponent">
  <!-- <div class="hd" :class="{ current: active, hd: active }">后盾人</div> -->
  <!-- <div class="hd" :class="['current', 'xj']">后盾人</div> -->
  <!-- <div class="hd" :class="[classLists]">后盾人</div> -->
  <!-- <div class="hd" :class="[classLists,'package']">后盾人</div> -->
  <!-- <div class="hd" :class="classLists">后盾人</div> -->
  <div class="hd" :class="[{ current: active }, { xj: active }, 'package']">
   后盾人
  </div>
 </div>
</template>

<script>
 export default {
  data() {
   return {
    // current: "current",
    active: true,
    classLists: {
     current: true,
    },
   };
  },
 };
</script>

<style lang="scss" scoped>
 .classComponent {
  .hd {
   color: red;
  }
  .current {
   background: black;
  }
  .xj {
   border: solid 20px #ddd;
  }
  .package {
   font-weight: bold;
  }
 }
</style>
```

## 20.v-for:控制列表的删除状态

:::tip

1. `<button @click="lesson.isDelete = !lesson.isDelete">删除</button>`点击切换删除样式

:::

> data/lessons.js

```javascript
export default [
 { id: 1, title: "Linux", isDelete: false, price: 199, comments: 189 },
 { id: 2, title: "CSS", isDelete: true, price: 80, comments: 528 },
 { id: 3, title: "Mysql", isDelete: false, price: 98, comments: 128 },
];
```

> components/ClassList.vue

```vue
<template>
 <div class="classList">
  <div v-for="(lesson, index) in lessons" :key="index">
   <!-- 根据属性的变化更改对应的样式 -->
   <span :class="{ 'is-delete': lesson.isDelete }">{{ lesson.title }}</span>
   <!-- 通过点击切换样式 -->
   <button @click="lesson.isDelete = !lesson.isDelete">删除</button>
  </div>
 </div>
</template>

<script>
 import lessons from "../../data/lessons";
 export default {
  data() {
   return {
    lessons,
   };
  },
 };
</script>

<style lang="scss">
 .classList {
  div {
   display: flex;
   justify-content: space-between;
   span {
    &.is-delete {
     text-decoration: line-through;
     background-color: red;
    }
   }
  }
 }
</style>
```

## 21.volar:分屏与热键定义

## 22.$attrs,Style:组件样式与 Style 行级样式

> terms: $attrs.class,backgroundColor

:::tip

1. \$attr.class当组件中的块有多个时,父组件传递的属性不知道要分配到哪一个,这是可以用$attr.class 来指定
2. `:style="{backgroundColor: 'green'}"`用行级样式时使用驼峰

:::

```html
<!-- 父组件 -->
<class-list class="hdxj" />
<!-- 子组件 -->
<section :class="$attrs.class"></section>
```

```vue
<template>
 <!-- <div style="color: red;" :style="{backgroundColor: 'green'}"> -->
 <!-- <div style="color: red;" :style="styles"> -->
 <div style="color: red;" :style="[styles, hdStyle]">后盾人</div>
</template>

<script>
 import { computed } from "@vue/runtime-core";
 export default {
  data() {
   return {
    hdStyle: {
     border: "solid 10px #333",
    },
   };
  },
  computed: {
   styles() {
    return { backgroundColor: "green" };
   },
  },
 };
</script>
```

## 23.v-if,v-show:使用区分 v-else-if,v-else

> terms: template,v-if,v-show

:::tip

1. template 不渲染到页面,但可以参与控制
2. 切换不多用v-if,切换多的话用v-show
3. template不支持v-show

:::

```vue
<template>
 <div v-for="(lesson, index) in lessons" :key="index">
  <div v-if="lesson.isDelete" style="background-color: red">
   {{ lesson.title }}
  </div>
  <div v-else-if="lesson.price > 100" style="background-color: green">
   {{ lesson.title }}
  </div>
  <template v-else>
   {{ lesson.title }}
  </template>
  <!-- <div v-show="lesson.isDelete" style="background-color: red;">{{lesson.title}}</div> -->
 </div>
</template>

<script>
 import lessons from "../../data/lessons";
 export default {
  data() {
   return {
    lessons,
   };
  },
 };
</script>
```

## 24.v-for:v-for 使用细节

> terms v-for(n in 8) :key="index"

:::tip

1. `<div v-for="(value,key,index) in obj" :key="key"></div>`
2. obj:{name:"后盾人",url:"houdunren.com"}其中key是name,value是后盾人
3. forof,forin都可以

:::

```vue
<template>
 <div>
  <!-- <div v-for="(value,key,index) in obj" :key="key">
            {{value}}--{{key}}---{{index}}
        </div> -->
  <!-- <div v-for="lesson in lessons" :key="lesson.id"> -->
  <div v-for="lesson of lessons" :key="lesson.id">
   <template v-if="!lesson.isDelete">{{ lesson.title }}</template>
  </div>
 </div>
</template>

<script>
 import lessons from "../../data/lessons";
 export default {
  data() {
   return {
    lessons,
    obj: {
     name: "后盾人",
     url: "houdunren.com",
    },
   };
  },
 };
</script>
```

```javascript
export default [
 { id: 1, title: "Linux", isDelete: false, price: 199, comments: 189 },
 { id: 2, title: "CSS", isDelete: true, price: 80, comments: 528 },
 { id: 3, title: "Mysql", isDelete: false, price: 98, comments: 128 },
];
```

```javascript
// 组件中使用v-for,重复组件
 <v-for-comment v-for="n in 10" :key="n" />
```

## 25.例子:`<mark>课程排序案例</mark>`

- 点击高亮:class="{ 'order-type': orderBy == 'price' }"
- 升降序

:::tip

1. orderBy按价格或评论数排序,orderType是升序或降序
2. `<template v-for="lesson in lessonOrder()" :key="lesson.id">`通过使用methods方法通过orderBy,orderType的变化调用lessonOrder()方法
3. `<template v-for="lesson in lessonLists" :key="lesson.id">`通过computed属性lessonLists,通过orderBy,orderType的变化重新计算lessonLists属性
4. `:class="{ 'order-type': orderBy == 'price' }"` 通过orderBy的变化来控制class的变化

:::

```vue
<template>
 <div>
  <button
   @click="orderBy = 'price'"
   :class="{ 'order-type': orderBy == 'price' }"
  >
   价格
  </button>
  <button
   @click="orderBy = 'comments'"
   :class="{ 'order-type': orderBy == 'comments' }"
  >
   评论数
  </button>
  --
  <button
   @click="lessonLists = 'asc'"
   :class="{ 'order-type': orderType == 'asc' }"
  >
   升序
  </button>
  <button
   @click="lessonLists = 'desc'"
   :class="{ 'order-type': orderType == 'desc' }"
  >
   降序
  </button>
  {{ orderType }}
  {{ orderBy }}
  <!-- <template v-for="lesson in lessonOrder()" :key="lesson.id"> -->
  <template v-for="lesson in lessonLists" :key="lesson.id">
   <div>
    {{ lesson.title }}-价格:{{ lesson.price }}--评论数:{{ lesson.comments }}
   </div>
  </template>
 </div>
</template>

<script>
 import lessons from "../../data/lessons";
 export default {
  data() {
   return {
    lessons,
    orderBy: "price",
    orderType: "asc",
   };
  },
  computed: {
   // lessonLists(){
   //     return this.lessons.sort((a,b)=>{
   //         return a[this.orderBy] -b[this.orderBy]
   //     })
   // }
   lessonLists: {
    get() {
     return this.lessons.sort((b, a) => {
      return this.orderType == "asc"
       ? a[this.orderBy] - b[this.orderBy]
       : b[this.orderBy] - a[this.orderBy];
     });
    },
    set(type) {
     this.orderType = type;
    },
   },
  },
  methods: {
   lessonOrder() {
    return this.lessons.sort((a, b) => {
     return this.orderType == "asc"
      ? a[this.orderBy] - b[this.orderBy]
      : b[this.orderBy] - a[this.orderBy];
    });
   },
  },
 };
</script>

<style lang="scss" scoped>
 .order-type {
  background-color: red;
 }
</style>
```

## 26.数组:对数组的方法变更

```vue
<template>
 <!-- <div>{{obj.name}}</div> -->
 <div v-for="(a, index) in arr" :key="index">{{ a }}</div>
</template>

<script>
 const obj = { name: "后盾人" };
 const arr = ["houdunren.com", "向军"];
 // push shift unshift pop splice sort reverse
 export default {
  data() {
   return {
    obj,
    arr,
   };
  },
  mounted() {
   setTimeout(() => {
    // this.arr.push('向军')
    this.arr.splice(0, 1);
    // this.obj.name='向军'
   }, 2000);
  },
 };
</script>
```

## 27.event:event 事件在 vue.js 中的基本使用 event,console.log

> terms: event,$event

- @click中event事件的获取`@click="ev(1, 1, 2, 3, 4, $event)"`
- 在methods中`ev(event)`多个`ev(...arg)`

```vue
<template>
 <div @click="ev"></div>
</template>
<script>
 export default {
  methods: {
   ev(event) {
    console.log(event);
   },
  },
 };
</script>
```

```vue
<template>
 <div @click="ev(1, 1, 2, 3, 4, $event)"></div>
</template>
<script>
 export default {
  methods: {
   ev(...arg) {
    console.log(arg);
    const event = arg.pop();
    console.log(event);
   },
  },
 };
</script>
```

## 28.事件修饰符:stop,capture,self,once,prevent

> terms: stop,capture,self,once,prevent

:::tip

1. 冒泡，先d2,后d1.捕获，先d1,后d2
2. 禁止冒泡在d2上使用`@click.stop="d2"`，此时点击d2时，不会触发d1
3. 捕获在d1上使用`@click.capture="d1"`,d2上使用`@click.capture="d2"`,先d1,后d2
4. self,在d1上使用`@click.self="d1"`,此时点击d2时，不会触发d1,看得见谁就触发谁

:::

```vue
<template>
 <!-- <div @click.capture="d1" style="background-color: green"> -->
 <!-- <div @click.self="d1" style="background-color: green"> -->
 <div @click="d1" style="background-color: green">
  <!-- <div @click.stop="d2" style="background-color: red; width: 200px">d2</div> -->
  <div @click.once="d2" style="background-color: red; width: 200px">d2</div>
 </div>
 <a href="https://www.houdunren.com" @click.prevent="link">后盾人</a>
</template>

<script>
 export default {
  methods: {
   d1() {
    console.log("d1");
   },
   d2() {
    console.log("d2");
   },
  },
 };
</script>
```

## 29.passive:passive 修饰符使用

terms: passive,scroll

```vue
<template>
 <a href="https://www.houdunren.com" @click.passive="link">后盾人</a>
</template>
<script>
 export default {
  methods: {
   link(event) {
    event.preventDefault(); // 因使用了passive修饰符,此时的preventDefault()失去效果
   },
  },
 };
</script>
```

```vue
<!-- scroll.passive中可以阻止每次判断preventDefault行为,以避免无用性能开销 -->
<template>
 <div
  @scroll.passive="d1"
  style="border: solid 10px green; height: 300px; overflow-y: auto"
 >
  <div @click="d2" style="background-color: red; height: 2000px">d2</div>
 </div>
</template>

<script>
 export default {
  methods: {
   d1() {
    console.log("d1");
   },
   d2() {
    console.log("d2");
   },
  },
 };
</script>
```

## 30.键盘事件:@keyup,@click.alt.exact

> terms: @keyup,@keyup.k,@keyup.ctrl.alt.enter,@click.alt.exact,event,event.key
:::tip

1. @keyup.k:按k才触发

:::

```vue
<template>
 <!-- enter esc tab space delete up down left right -->
 <div>按键事件</div>
 <input type="text" @keyup.ctrl.alt.enter="key" />
</template>

<script>
 export default {
  methods: {
   key(event) {
    console.log(event.key);
   },
  },
 };
</script>
```

## 31.表单:表单的基本使用 v-model,true-value,false-value

:::tip

1. text/textarea中v-model="form.title"

```template
  <input type="text" v-model="form.title" />
  <textarea v-model="form.content"></textarea>
```

2. checkbox单个中v-model="form.isPost",通过isPost的true/false来控制选中

```template
  <input type="checkbox" v-model="form.isPost" />
```

3. checkbox单个中v-model="form.isPost",通过isPost的true-value/false-value来控制选中,自定义选中和没选中的值

```template
<input type="checkbox" v-model="form.isPost" true-value="1" false-value="0" />
```

4. checkbox多个中v-model="form.lessons",通过form.lessons=['php','mysql','nest.js']来控制选中

```template
  <input type="text" v-model="form.title" />
  <textarea v-model="form.content"></textarea>
```

:::

```vue
<template>
 <div>
  <!-- <input type="text" v-model="form.title" />
		<textarea v-model="form.content"></textarea> -->
  <!-- 多选中切换时form.isPost=>true/false -->
  <input type="checkbox" v-model="form.isPost" />
  <!-- 多选选中from.lesson=['php','mysql','nest.js'] -->
  <input type="checkbox" v-model="form.lessons" value="php" />php
  <input type="checkbox" v-model="form.lessons" value="mysql" />mysql
  <input type="checkbox" v-model="form.lessons" value="nest.js" />nest
  {{ form }}
 </div>
</template>

<script>
 const form = {
  title: "houdunren.com",
  content: "后盾人",
  isPost: false,
  lessons: [],
 };
 export default {
  data() {
   return {
    form,
   };
  },
 };
</script>
```

## 32.单选下拉列表:列表框与单选框的使用

> term: radio,select

:::tip

1. 单选框中要使用 value 来复制,使用 value 时选中的是 string,使用:value 时选中的是 number

```template
  <input type="radio" v-model="form.sex" :value="1" />男
  <input type="radio" v-model="form.sex" :value="2" />女
```

2. 多选下拉框中的值可使用对象,多选v-model 值为[],单选 v-model 值为'beijing'

```template
  <select v-model="form.citys" multiple>
   <option value>---请选择城市---</option>
   <option value="beijing">北京</option>
   <option value="wuhan">武汉</option>
  </select>
```

""""

```vue
<template>
 <div>
  <input type="radio" v-model="form.sex" :value="1" />男
  <input type="radio" v-model="form.sex" :value="2" />女
 </div>
</template>
<script>
 const form = { sex: 1 };
 export default {
  data() {
   return {
    form,
   };
  },
 };
</script>
```

```vue
<!-- 单选下拉框 -->
<template>
 <select v-model="form.city">
  <option value="">===请选择城市===</option>
  <option value="beijing">北京</option>
  <option value="wuhan">武汉</option>
  <!-- <option :value="{name:'北京'}">北京</option>
		<option :value="{name:'武汉'}">武汉</option> -->
 </select>
</template>
<script>
 const form = {
  city: "",
 };
 export default {
  data() {
   return {
    form,
   };
  },
 };
</script>
```

```vue
<!-- 多选下拉框 -->
<template>
 <select v-model="form.citys" multiple>
  <option value="">===请选择城市===</option>
  <option value="beijing">北京</option>
  <option value="wuhan">武汉</option>
 </select>
</template>
<script>
 const form = {
  citys: [],
 };
 export default {
  data() {
   return {
    form,
   };
  },
 };
</script>
```

## 33.lazy,trim:表单修饰符 v-model.lazy,v-model.number,v-model.trim

> terms: v-model.lazy, v-model.trim,v-model.number

- 使用 v-model.lazy 防抖,在光标离开 input 后才响应数据
- v-model.number 默认 v-model 中的数值为 string 格式,在使用 number 后更改为 number 格式
- v-model.trim 用来去除字符两端的空白,用 watch 来监控

```vue
<template>
 <input type="text" v-model.lazy="hd" />
 {{ hd }}
</template>
<script>
 export default {
  data() {
   hd: "houdunren.com";
  },
 };
</script>
```

```vue
<template>
 <input type="text" v-model.number="num" />
 {{ num + 100 }}
</template>
<script>
 export default {
  data() {
   num: 1;
  },
 };
</script>
```

```vue
<template>
 <input type="text" v-model.trim="title" />
</template>
<script>
 export default {
  data() {
   title: "后盾人";
  },
  watch: {
   title(n) {
    console.log(n.length);
    console.log(n);
   },
  },
 };
</script>
```
