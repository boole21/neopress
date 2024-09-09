# 1 第一天 JSX基础

## 1.1 React介绍

## 1.2 开发环境建设

```bash
npx create-react-app react-basic
# 或者
pnpm create vite react-basic --template react-ts

cd react-basic
npm run start
```

:::tip
 访问路径: App.js->index.js->public/index.html
:::

### 概念和本质

> UI模板

```jsx
const message = "this is message"

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {message}
    </div>
  )
}
```

## 1.3 高频场景

### JSX中使用JS表达式

1. 引号传递字符串 `{'this is message'}`
2. 使用JavaScript变量`{count}`
3. 函数调用和方法调用`{getName()}`
4. 使用JavaScript对象`{new Date().getDate()}`

:::warning
注意：if语句、switch语句、变量声明属于语句，不是表达式，不能出现在{}中
:::

### 列表渲染

```jsx
const list = [
  {id:1001, name:'Vue'},
  {id:1002, name: 'React'},
  {id:1003, name: 'Angular'}
]

function App(){
  return (
    <ul>
      {list.map(item=><li key={item.id}>{item}</li>)}
    </ul>
  )
}
```

### 条件渲染

```jsx
const flag = true
const loading = false

function App(){
  return (
    <>
      {flag && <span>this is span</span>}
      {loading ? <span>loading...</span>:<span>this is span</span>}
    </>
  )
}
```

### 复杂的条件渲染

```jsx
const type = 1  // 0|1|3

function getArticleJSX(){
  if(type === 0){
    return <div>无图模式模版</div>
  }else if(type === 1){
    return <div>单图模式模版</div>
  }else(type === 3){
    return <div>三图模式模版</div>
  }
}

function App(){
  return (
    <>
      { getArticleJSX() }
    </>
  )
}
```

## 1.4 事件绑定

### 1.4.1 基础实现

```jsx
function App(){
  const clickHandler = ()=>{
    console.log('button按钮点击了')
  }
  return (
    <button onClick={clickHandler}>click me</button>
  )
}
```

### 1.4.2 使用事件参数

```jsx
function App(){
  const clickHandler = (e)=>{
    console.log('button按钮点击了', e)
  }
  return (
    <button onClick={clickHandler}>click me</button>
  )
}
```

### 1.4.3 传递自定义参数

```jsx
function App(){
  const clickHandler = (name)=>{
    console.log('button按钮点击了', name)
  }
  return (
    <button onClick={()=>clickHandler('jack')}>click me</button>
  )
}
```

:::warning
注意：不能直接写函数调用，这里事件绑定需要一个函数引用
:::

### 1.4.4 同时传递事件对象和自定义参数

```jsx
function App(){
  const clickHandler = (name,e)=>{
    console.log('button按钮点击了', name,e)
  }
  return (
    <button onClick={(e)=>clickHandler('jack',e)}>click me</button>
  )
}
```

## 1.5 React中的组件

### 1.5.1 组件基础使用

```jsx
// 1. 定义组件
function Button(){
  return <button>click me</button>
}

// 2. 使用组件
function App(){
  return (
    <div>
      {/* 自闭和 */}
      <Button/>
      {/* 成对标签 */}
      <Button></Button>
    </div>
  )
}
```

## 1.6 组件状态管理useState

### 1.6.1 基础使用

```jsx
function App(){
  const [ count, setCount ] = React.useState(0)
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>{ count }</button>
    </div>
  )
}
```

### 1.6.2 状态的修改规则

> 在React中状态被认为是只读的，我们应该始终`替换它而不是修改它`, 直接修改状态不能引发视图更新

```tsx
let [count,seCount] = useState(0)
const handleClick=()=>{
  setCount(count+1)
}
```

### 1.6.3 修改对象状态

```jsx
const [form,setForm] = useState({name:'jack'})

const handleChangeName = ()=>{
  setForm({
    ...form,
    name:'john'
  })
}
```

## 1.7 组件的基本样式处理

### 行内样式

```jsx
<div style={{ color:'red'}}>this is div</div>
```

### class类名控制

```jsx
import './index.css'

function App(){
  return (
    <div>
      <span className="foo">this is span</span>
    </div>
  )
}
```
