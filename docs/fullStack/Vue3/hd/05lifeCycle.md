# 第五章 生命周期

## 1.生命周期的概念理解

## 2.beforeCreate 与 created

:::tip

1. beforeCreate()未获取数据，未创建DOM
2. created()已获取数据，未创建DOM

:::

```javascript
  data() {
    return {
      hd: '向军大叔'
    }
  },
  beforeCreate() {
    console.log(this.hd);
    console.log(this.$refs.el);
  },
  created() {
    // 已获得数据,可以在这里发送网路请求获得数据
    // 但未渲染,无法获取元素
    console.log(this.hd);
    console.log(this.$refs.el);
  }
```

## 3.beforeMount 与 mounted

- 先执行 beforeMount()后执行子组件中的什么周期,然后在执行 mounted()

:::tip
父组件beforeCreate
父组件created向军大叔
父组件beforeMount向军大叔
子组件beforeCreate
子组件created子组件
子组件beforeMount子组件
子组件mount子组件 `<div>​向军大叔​</div>`​
父组件mount向军大叔 `<div>​向军大叔​</div>​`
:::

## 4.beforeUpdate 与 updated

:::tip

1. 在数据进行更新后,执行 beforeUpdate 和 updated
2. 可用于聊天室中添加新消息时,让最新的消息保持在底部
3. 子组件的隐藏消失，父组件的 beforeUpdate 和 updated 会执行，
   1. beforeUpdate 有子组件，updated 为 null
   2. 点击显示 beforeUpdate 为 null，updated 有子组件

:::

:::tip
父组件beforeCreate
父组件created向军大叔
父组件beforeMount向军大叔
父组件mount向军大叔
父组件beforeUpdate后盾人(setTimeout触发了重新渲染,并在组件中有调用hd)
父组件updated后盾人
:::

```javascript
// 使用setTimeout来进行页面更新,调用了beforeUpdate和updated
  created() {
    console.log('父组件created' + this.hd);
    setTimeout(() => {
      this.hd = '后盾人'
    }, 1000)
  },
  beforeUpdate() {
    console.log(`父组件beforeUpdate` + this.hd);
  },
  updated() {
    console.log(`父组件update` + this.hd);
  }
```

```javascript
// 子组件child更新,点击隐藏或显示子组件
// 点击隐藏beforeUpdate有child,updated为null,
// 点击显示beforeUpdate为null,updated有child
<button @click="show = !show">控制</button>
<child v-if="show" ref="child" />

  beforeUpdate() {
    console.log(`父组件beforeUpdate` + this.hd);
    console.log(this.$refs.child);
  },
  updated() {
    console.log(`父组件update` + this.hd);
    console.log(this.$refs.child);
  }
```

## 5.beforeUnmount 与 unmounted

- 用于视频播放,点击一个视频后再点击视频,卸载掉前面的视频,不然有多个声音
- 用于定时器 setInterval,在 unmounted 时执行 clearInterval(this.timeId),否则会一直执行

```javascript
  created() {
    console.log('子组件created' + this.hd);
    this.timeId = setInterval(() => {
      console.log('后盾人');
    }, 500)
  },
  beforeUnmount() {
    console.log(`子组件beforeUnmount` + this.hd);
  },
  unmounted() {
    console.log(`子组件unmounted` + this.hd);
    clearInterval(this.timeId)
  }
```
