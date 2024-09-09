# 2.9 表单输入绑定

## 2.9.1 基本用法

```html
<!-- 旧 -->
<input :value="text" @input="text=event.target.value">
<!-- 新 -->
<input v-model="text">
```

:::warning
v-model 会忽略任何表单元素上初始的 value、checked 或 selected attribute。
:::

### 1 文本text

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

### 2 多行文本textarea

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

*注意在 `<textarea>` 中是不支持插值表达式的。请使用 v-model 来替代*

### 3 复选框checkbox

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

### 4 单选按钮radio

```html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

### 5 选择器select

#### 单选

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

#### 多选

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

## 2.9.2 值绑定

1. 对于单选按钮，复选框和选择器选项，v-model 绑定的值通常是静态的字符串 (或者对复选框是布尔值)
2. 将该值绑定到当前组件实例上的动态数据

### 1 复选框

```html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

### 2 单选按钮

```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### 3 选择器选项

```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

## 2.9.3 修饰符

- .lazy
- .number
- .trim

### 1 .lazy

### 2 .number

### 3 .trim

## 2.9.4 组件上的v-model
