# 4 高级类型

## 4.1 class类

***TS 中的 class，不仅提供了 class 的语法功能，也作为一种类型存在***

### 4.1.1 初始化

```ts
class Person {}
// 初始化
class Person {
  age: number
  gender = '男'
}

const p = new Person()
```

### 4.1.2 构造函数

```ts
// 构造函数
class Person{
  age:number
  gender:string
  constructor(age:number,gender:string){
    this.age = age
    this.gender = gender
  }
}
```

### 4.1.3 实例方法

```ts
class Point {
 x = 10;
 y = 10;
 scale(n: number): void {
  this.x *= n;
  this.y *= n;
 }
}

```

### 4.1.4 类继承

#### extends(继承父类)

```ts
class Animal {
 move() {
  console.log("Moving along!");
 }
}

class Dog extends Animal {
 bark() {
  console.log("Woof! Woof!");
 }
}

const dog = new Dog();

```

#### implements(实现接口)

```ts
interface Singable {
 sing(): void;
}
class Person implements Singable {
 sing() {
  console.log("唱歌");
 }
}

```

### 4.1.5 类成员可见性

#### 1 public：表示公有的、公开的，公有成员可以被任何地方访问，默认可见性

```ts
class Animal{
  public move(){
    console.log('Moving along！');
  }
}
```

#### 2 protected：表示受保护的，仅对其声明所在类和子类中（非实例对象）可见

```ts
class Animal {
 protected move() {
  console.log("Moving along!");
 }
}
class Dog extends Animal {
 bark() {
  console.log("wow!");
  this.move();
 }
}

```

#### 3 private: 表示私有的，只在当前类中可见，对实例对象以及子类也是不可见的

```ts
class Animal {
 private move() {
  console.log("Moving along!");
 }
 walk() {
  this.move();
 }
}

```

#### 4 readonly:表示只读，用来防止在构造函数之外对属性进行赋值

- 只能修饰属性不能修饰方法
- 接口或者 {} 表示的对象类型，也可以使用 readonly。

```ts
class Person {
 readonly age: number = 18;// 若不加number，则类型为18(字面量)
 constructor(age: number) {
  this.age = age;
 }
}

```

## 4.2 类型兼容性

### 4.2.1 class兼容性

:::tip
> 结构化类型系统

1. TS 采用的是结构化类型系统，也叫做 duck typing（鸭子类型），类型检查关注的是值所具有的形状。也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

:::

#### 成员相同

```ts
class Point{x:number;y:number}
class Point2D {x:number;y:number}

const p:Point=new Point2D()
```

#### 成员不同

- 更准确的说法：对于对象类型来说，y 的成员至少与 x 相同，则 x 兼容 y（成员多的可以赋值给少的）。

```ts
// p的类型原来只有两个属性，当有三个属性的p3赋值给p后，p可以有3个属性，如果只有一个属性的p0赋值给p，p则需要删除掉一个属性，导致信息缺失。
class Point {
 x: number;
 y: number;
}

class Point3D {
 x: number;
 y: number;
 z: number;
}

let p3 = new Point3D();
p3 = { x: 1, y: 2, z: 3 };
let p: Point = p3;
console.log(p); // {x:1,y:2,z:3}
```

### 4.2.2 接口兼容性

> 类似class,class和interface之间也可以兼容

```ts
interface Point {
 x: number;
 y: number;
}
interface Point2D {
 x: number;
 y: number;
}

let p1: Point = { x: 1, y: 1 };
let p2: Point2D = p1;

interface Point3D {
 x: number;
 y: number;
 z: number;
}

let p3: Point3D = { x: 1, y: 1, z: 1 };

p2 = p3;
console.log(p2);
```

### 4.2.3 函数兼容性

#### 1 参数个数

> 参数个数，参数多的兼容参数少的（或者说，参数少的可以赋值给多的）。

```ts
type F1 = (a: number) => void;
type F2 = (a: number, b: number) => void;

let f1: F1 = (a) => console.log(a);
let f2: F2 = f1;
```

> 例子forEach()

```ts
const arr = ["a", "b", "c"];
arr.forEach(() => {});
arr.forEach((item) => {});
```

#### 2 参数类型

> 参数类型，相同位置的参数类型要相同（原始类型）或兼容（对象类型）。
>
##### 原始类型

```ts
// 原始类型：相同位置的参数类型相同
type F1 = (a: number) => string;
type F2 = (a: number) => string;

let f1: F1 = (a) => a.toString();
let f2: F2 = f1;
```

#### 对象

```ts
// 对象类型: 兼容
interface Point2D {
 x: number;
 y: number;
}
interface Point3D {
 x: number;
 y: number;
 z: number;
}
type F2 = (p: Point2D) => void;
type F3 = (p: Point3D) => void;

let f2: F2 = (p) => console.log(p);
let f3: F3 = f2;
console.log(f3);
```

:::tip
技巧：将对象拆开，把每个属性看做一个个参数，则，参数少的（f2）可以赋值给参数多的（f3）。
:::

### 4.2.4 返回值类型

#### 原始类型: 类型要一致

```ts
type F5 = () => string;
type F6 = () => string;

let f5: F5 = () => "a";
let f6: F6 = f5;
```

#### 对象： 要兼容，成员多的可以赋值给成员少的

```ts
type F7 = () => { name: string };
type F8 = () => { name: string; age: number };

let f8: F8 = () => ({
 name: "Pete",
 age: 30,
});
let f7: F7 = f8;
```

## 4.3 交叉类型

> 交叉类型（&）：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）。

### 属性

```ts
interface Person {
 name: string;
}
interface Contact {
 phone: string;
}

type PersonDetail = Person & Contact;
// 相当于type PersonDetail = {name:string;phone:string}
let obj: PersonDetail = {
 name: "jack",
 phone: "133....",
};
```

### 参数
  
> 实现`重载`

```ts
interface A {
 fn: (value: number) => string;
}
interface B {
 fn: (value: string) => string;
}
type C = A & B;

let c: C = {
 fn: (value: number | string) => value.toString(),
};

```

## 4.4 泛型

### 4.4.1 基本

> 泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现`复用`，常用于：函数、接口、class 中。

```ts
function id<Type>(value: Type): Type {
 return value;
}
const num = id<number>(10);
const str = id<string>("hello");

// 简化: 类型参数推断
const num = id(10)
```

### 4.4.2 泛型函数

#### 泛型约束

> 泛型约束：默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这导致无法访问任何属性。

```ts
// 出错 Type无法保证一定存在length属性
function id<Type>(value: Type): Type {
 console.log(value.length);
 return value;
}
```

##### 1 指定更加具体的类型

```ts
function id<Type>(value: Type[]): Type[] {
 console.log(value.length);
 return value;
}
```

##### 2 添加约束

```ts
interface ILength {
 length: number;
}
function id<Type extends ILength>(value: Type): Type {
 console.log(value.length);
 return value;
}
```

#### 多个类型变量

:::tip

 1. keyof 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型。
 2. keyof Type即：'name' | 'age'
 3. Key extends keyof Type：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性。

:::

```ts
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
 return obj[key];
}

let person = { name: "jack", age: 18 };
getProp(person, "name");

```

### 4.4.3 泛型接口

> 使用泛型接口时，需要显式指定具体的类型（比如，此处的 IdFunc`<number>`）。

```ts
interface IdFunc<Type> {
 id: (value: Type) => Type;
 ids: () => Type[];
}
let obj: IdFunc<number> = {
 id: (value) => value,
 ids: () => [1, 3, 5],
};
```

```ts
// JS中的数组在TS中就是一个泛型接口
const strs = ['a','b','c']
strs.forEach(item=>item)

const nums = [1,3,5]
nums.forEach(item=>item)
```

### 4.4.4 泛型类

```ts
interface IState {
 count: number;
}
interface IProps {
 maxLength: number;
}

class InputCount extends React.Component<IProps, IState> {
 state: IState = { count: 0 };
 render() {
  return <div>{this.props.maxLength}</div>;
 }
}
```

> 创建泛型类

```ts
class GenericNumber<NumType> {
 defaultValue: NumType;
 add: (x: NumType, y: NumType) => NumType;
}
const myNum = new GenericNumber<number>();
```

### 4.4.5 泛型工具类型

#### 1 Partial

> `Partial<Type>` 的作用就是将某个类型里的属性全部变为可选项。

```ts
interface Props {
 id: string;
 children: number[];
}

type PartialProps = Partial<Props>;

let p: PartialProps = { id: "a" };
let p1: PartialProps = { children: [1, 3, 5] };
```

#### 2 `Readonly<Props>`

> `Readonly<Props>`用来构造一个类型，将 Type 的所有属性都设置为 readonly（只读）

```ts
interface Props {
 id: string;
 children: number[];
}

type ReadonlyProps = Readonly<Props>;

let props: ReadonlyProps = { id: "1", children: [] };
props.id = "2"; //出错，无法为“id”赋值，因为它是只读属性。
```

#### 3 `Pick<Type,Keys>`

> `Pick<Type, Keys>` 从 Type 中选择一组属性来构造新类型。

```ts
interface Props{
 id:string
 title:string
 children:number[]
}

type PickProps = Pick<Props,'id' | 'title'>
```

#### 4 `Record<Keys,Type>`

> Record<Keys,Type> 构造一个对象类型，属性键为 Keys，属性类型为 Type。
> Record 工具类型有两个类型变量：1 表示对象有哪些属性 2 表示对象属性的类型

```ts
type RecordObj = Record<"a" | "b" | "c", string[]>;
let obj: RecordObj = {
 a: ["1"],
 b: ["2"],
 c: ["3"],
};

```

## 4.5 索引签名类型

### 4.5.1 对象中的索引

> 使用场景:当无法确定对象中有哪些属性（或者说对象中可以出现任意多个属性），此时，就用到索引签名类型了。

:::tip

1. 使用 [key: string] 来约束该接口中允许出现的属性名称。表示只要是 string 类型的属性名称，都可以出现在对象中。
2. 这样，对象 obj 中就可以出现任意多个属性（比如，a、b 等）。
3. key 只是一个占位符，可以换成任意合法的变量名称。

:::

```ts
interface AnyObject {
 [key: string]: number;
}

let obj: AnyObject = {
 a: 1,
 b: 2,
};

```

### 4.5.2 数组中的索引[]

> 数组的键(索引)是数值类型

```ts
interface MyArray<T> {
 [n: number]: T;
}

let arr: MyArray<number> = [1, 3, 5];
```

## 4.6 映射类型[]

### 4.6.1 基于联合类型创建新类型(对象类型)

:::tip

1. Key in PropKeys 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 forin(let k in obj)。
2. 注意：映射类型只能在类型别名中使用，不能在接口中使用。

:::

```ts
type PropKeys = "x" | "y" | "z";
type Type1 = { x: number; y: number; z: number };
type Type2 = { [Key in PropKeys]: number };
```

### 4.6.2 根据对象类型创建新类型（对象类型）

:::tip

1. 首先，先执行 keyof Props 获取到对象类型 Props 中所有键的联合类型即，'a' | 'b' | 'c'。
2. 然后，Key in ... 就表示 Key 可以是 Props 中所有的键名称中的任意一个。

:::

```ts
type Props = { a: number; b: string; c: boolean };
type Type3 = { [key in keyof Props]: number };
```

### 4.6.3 泛型工具类型Partial的实现

```ts
type Props = { a: number; b: string; c: boolean };

type Partial1<T>={
 [P in keyof T]?:T[P]
}
type PartialProps = Partial1<Props>

let p:PartialProps = {a:1,c:true}
let p1:PartialProps = {b:'a'}
```

:::tip

1. `keyof T` 即 keyof Props 表示获取 Props 的所有键，也就是：'a' | 'b' | 'c'。
2. 在 [] 后面添加 ?（问号），表示将这些属性变为可选的，以此来实现 Partial 的功能。
3. 冒号后面的 `T[P]` 表示获取 T 中每个键对应的类型。比如，如果是 'a' 则类型是 number；如果是 'b' 则类型是 string。
4. 最终，新类型 PartialProps 和旧类型 Props 结构完全相同，只是让所有类型都变为可选了。

:::

### 4.6.4 T[P]索引查询(访问)类型

```ts
type Props = {a:number;b:string;c:boolean}

type TypeA = Props['a'] // number
```

### 4.6.5 同时查询多个索引的类型

```ts
type Props = { a: number; b: string; c: boolean };

type TypeA = Props["a" | "b"];
type TypeB = Props[keyof Props]
```
