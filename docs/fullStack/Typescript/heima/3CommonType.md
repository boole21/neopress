# 3 常用类型

## 3.1 类型注解

```ts
let age:number = 18
```

## 3.2 常用基础类型概述

1. JS已有类型
    - 原始类型: number/string/boolean/null/undefined/symbol
    - 对象类型: object(数组，对象，函数)
2. TS新增类型
    - 联合类型，自定义类型(类型别名),接口，元组，字面量类型，枚举，void，any

## 3.3 原始类型

- 原始类型: number/string/boolean/null/undefined/symbol

    ```ts
    let age: number = 18;
    let myName: string = "刘老师";
    let isLoading: boolean = false;
    ```

## 3.4 数组类型

- 对象类型: object(数组，对象，函数)

1. 对象类型，每个具体的对象都有自己的类型语法

2. 数组类型，两种写法

```ts
let arr1: number[] = [1, 2, 3];// 推荐
let arr2: Array<number> = [1, 2, 3];

let arr3: (number | string)[] = [1, "2", 3];
let arr4: Array<number | string> = [1, "2", 3];
```

:::tip
解释：| （竖线）在 TS 中叫做`联合类型`（由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种）。
:::

## 3.5 类型别名type

类型别名（自定义类型）：为任意类型起别名。

```ts
type CustomArray = (number | string)[];

const arr1: CustomArray = [1, "a", 3, "b"];
const arr2: CustomArray = ["x", "y", 6, 7];
```

## 3.6 函数类型

- 函数的类型实际上指的是：函数参数和返回值的类型。

### 3.6.1 为函数指定类型

1. 单独指定参数、返回值的类型：

    ```ts
    function add(num1: number, num2: number): number {
    return num1 + num2;
    }

    const add1 = (num1: number, num2: number): number => {
    return num1 + num2;
    };
    ```

2. 同时指定参数、返回值的类型：

    ```ts
    const add2: (num1: number, num2: number) => number = (num1, num2) => {
    return num1 + num2;
    };
    ```

### 3.6.1 返回值，可选参数

1. 无返回值void

    > 如果函数没有返回值，那么，函数返回值类型为：void。

    ```ts
    function greet(name: string): void {
    console.log("Hello", name);
    }
    ```

2. 可选参数?

***注意：可选参数只能出现在参数列表的最后，也就是说可选参数后面不能再出现必选参数***
    ```ts
        function mySlice(start?: number, end?: number): void {
    console.log("起始索引:", start, "结束索引", end);
    }
    ```

## 3.7 对象类型

***JS 中的对象是由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构（有什么类型的属性和方法）***

### 3.7.1 写法

```ts
let person: { name: string; age: number; say(): void } = {
 name: "jack",
 age: 19,
 say() {},
};

let person: { name: string; age: number; say: () => void } = {
 name: "jack",
 age: 19,
 say() {},
};
```

### 3.7.2 可选属性

```ts
function myAxios(config: { url: string; method?: string }) {
 console.log(config);
}
```

## 3.8 接口interface

### 3.8.1 使用

```ts
interface IPerson {
 name: string;
 age: number;
 sayHi(): void;
}

let person: IPerson = {
 name: "john",
 age: 19,
 sayHi() {},
};
```

### 3.8.2 type与interface不同点

1. 接口，只能为对象指定类型。
2. 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名。

### 3.8.3 接口继承

```ts
interface Point2D {
 x: number;
 y: number;
}
interface Point3D extends Point2D {
 z: number;
}
const point3D: Point3D = { x: 1, y: 2, z: 3 }; // OK
```

## 3.9 元组Tuple

***元组类型是另一种类型的数组，它确切地知道包含多少个元素，以及特定索引对应的类型***

```ts
let position: number[] = [39.5427, 116.2317];// 数组

let position2: [number, number] = [39.5427, 116.2317];//元组
```

## 3.10 类型推论

***发生类型推论的地方尽量省略***

## 3.10.1 常见场景

1. 声明变量并初始化时

    ```ts
    let age:number
    let age = 18  //推荐
   ```

2. 决定函数返回值时。

    ```ts
    function add(num1:number,num2:number):number
    function add(num1:number,num2:number){return num1+num2}//推荐
    ```

## 3.11 类型断言

```ts
const aLink = document.getElementById('link') as HTMLAnchorElement // 推荐

const aLink = <HTMLAnchorElement>document.getElementById('link')
```

:::tip
技巧：使用console.dir()可以快速查看对象类型
:::

## 3.12 字面量类型

### 3.12.1 基本使用

***除字符串外，任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用***

```ts
let str1 = 'Hello TS'// 类型string
const str2 = 'Hello Ts'//类型‘Hello TS’
```

### 3.12.2 与联合类型

```ts
function changeDirection(direction:'up'|'down'|'left'|'right'){
  console.log(direction);
}
```

## 3.13 枚举

***枚举的功能类似于字面量类型+联合类型组合的功能，也可以表示一组明确的可选值***

```ts
enum Direction{Up,Down,Left,Right}

function changeDirection(direction:Direction){
  console.log(direction);
}
changeDirection(Direction.Up);
```

### 3.13.1 数字枚举

- 默认从0开始自增
- 也可初始化值

```ts
enum Direction{Up,Down,Left,Right} // Right=3
enum Direction{Up=2,Down=4,Left=8,Right} // Right=9
```

### 3.13.2 字符串枚举

***注意：字符串枚举没有自增长行为，因此，字符串枚举的每个成员必须有初始值。***

```ts
enum Direction {
 Up = "UP",
 Down = "DOWN",
 Left = "LEFT",
 Right = "RIGHT",
}
```

### 3.13.2 值

- 枚举可作类型，可提供值（枚举成员都是有值的）
- 推荐使用字面量类型+联合类型组合的方式

## 3.14 any类型

***不推荐使用any!,最多临时使用***

```ts
let obj:any = {x:0} //显示声明
let a;//隐式声明any
function(num1,num2){} //隐式声明
```

## 3.15 typeof

- TS中的typeof,根据已有变量的值，获取该值的类型，来简化类型书写。
- typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）

```ts
let p = { x: 1, y: 2 };

function formatPoint(point: { x: number; y: number }) {}
formatPoint(p);
function formatPoint2(point: typeof p) {}//同typeof 获取p的类型
```
