# 2.5 数据类型

## 2.5.1 八种基本数据类型

### 2.5.1.1 七种原始数据类型(基本数据类型)

#### (1) Number:`Integer`,`float`,`Infinity`,`-Infinity`,`NaN`

::: tip

1. NaN \*\* 0 = 1,NaN 与其他运算都是 NaN
   :::

#### (2) BigInt: 范围 ±(2<sup>53</sup>-1)

::: info
尾部 n 表示 BigInt
bigInt = 1234567890123456789012345678901234567890n;
:::

#### (3) String:`双引号""`,`单引号''`,`反引号` ``

#### (4) Boolean:`true`,`false`

#### (5) null: `nothing,empty,value unknown`

#### (6) undefined: 变量已声明但未赋值

#### (7) Symbol

### 2.5.1.2 1 种引用类型

#### (1) object

## 2.5.2 typeof

```js
typeof undefined; // "undefined"

typeof 0; // "number"

typeof 10n; // "bigint"

typeof true; // "boolean"

typeof "foo"; // "string"

typeof Symbol("id"); // "symbol"

typeof Math; // "object"  (1)

typeof null; // "object"  (2)

typeof alert; // "function"  (3)
```

::: warning
typeof(x) 与 typeof x 相同
:::
