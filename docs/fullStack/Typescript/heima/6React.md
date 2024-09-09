# 6 在React中使用TypeScript

## 6.1 使用CRA创建支持TS的项目

```bash
npx create-react-app react-ts --template typescript
cd react-ts-basic
yarn start
```

:::tip
相对于非 TS 项目，目录结构主要由以下三个变化：

1. 项目根目录中增加了 tsconfig.json 配置文件：指定 TS 的编译选项（比如，编译时是否移除注释）。
2. React 组件的文件扩展名变为：*.tsx。
3. src 目录中增加了 react-app-env.d.ts：React 项目默认的类型声明文件

:::

### react-app-env.d.ts: React项目默认的类型声明文件

> 三斜线指令：指定依赖的其他类型声明文件，types 表示依赖的类型声明文件包的名称。

```ts
/// <reference types="react-scripts" />
```

:::tip
解释：告诉 TS 帮我加载 react-scripts 这个包提供的类型声明。
react-scripts 的类型声明文件包含了两部分类型：

1. react、react-dom、node 的类型
2. 图片、样式等模块的类型，以允许在代码中导入图片、SVG 等文件。
TS 会自动加载该 .d.ts 文件，以提供类型声明（通过修改 tsconfig.json 中的 include 配置来验证）。

:::

## 6.2 TS配置文件tsconfig.json

```bash
tsc --init
tsc hello.ts --target es6

tsc hello.ts # 忽略tsconfig.json文件
tsc # 启用tsconfig.json
```

## 6.3 React中常用类型

> React通过@types/react,@types/react-dom类型声明包，来提供类型

### 6.3.1 函数组件

#### 1. 函数组件的类型以及组件的属性

```ts
type Props = { name: string; age?: number }
const Hello: FC<Props> = ({name,age})=>(
  <div>你好， 我叫： {name}, 我{age}岁了</div>
)

// 推荐
const Hello = ({name,age}:Props)=>(
  <div>你好， 我叫： {name}, 我{age}岁了</div>
)
```

```html
<Hello name="jack" />
```

#### 2. 函数组件属性的默认值(defaultProps)

```ts
type Props = { name: string; age?: number }
const Hello: FC<Props> = ({name,age})=>(
  <div>你好， 我叫： {name}, 我{age}岁了</div>
)
Hello.defaultProps={age:18}

// 推荐
const Hello = ({name,age=18}:Props)=>(
  <div>你好， 我叫： {name}, 我{age}岁了</div>
)
```

#### 3. 事件绑定和事件对象

```html
<input onChange={e=>{}} />
```

> button

```html
<button onClick={onClick}>点赞</button>
```

```ts
const onClick = ()=>{}
const onClick1 = (e: React.MouseEvent<HTMLButtonElement>)=>{}
```

> input

```html
<input onChange={onChange} />
```

```ts
const onChange = (e: React.ChangEvent<HTMLInputElement>)=>{}
```

### 6.3.2 class组件
