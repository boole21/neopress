# 5 TypeScript 类型声明文件

> 类型声明文件：用来为已存在的 JS 库提供类型信息。

## 5.1 TS中的两种文件类型

1. .ts 是 implementation（代码实现文件）；
2. .d.ts 是 declaration（类型声明文件）

## 5.2 已有的类型声明文件

### 5.2.1 内置类型声明文件

> Array.forEach,window,document
>
### 5.2.2 第三方库类型声明文件

1. 库自带类型声明文件 axios
2. 由DefinitelyTyped提供 @type/react,@type/lodash

## 5.3 创建自己的类型声明文件

### 5.3.1 项目内共享类型

### 5.3.2 为已有JS文件提供类型声明

> 在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明
> declare 关键字：用于类型声明，为其他地方（比如，.js 文件）已存在的变量声明类型，而不是创建一个新的变量。

:::tip

1. 对于 type、interface 等这些明确就是 TS 类型的（只能在 TS 中使用的），可以省略 declare 关键字。
2. 对于 let、function 等具有双重含义（在 JS、TS 中都能用），应该使用 declare 关键字，明确指定此处用于类型声明

:::
