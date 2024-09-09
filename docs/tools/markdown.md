# [Markdown 教程](https://markdown.com.cn/)

## 基本语法
### 一. 标题

```markdown
# 一级标题h1

## 二级标题h2

### 三级标题h3

#### 四级标题h4

##### 五级标题h5

###### 六级标题h6
```

### 二. 段落
要创建段落，请使用空白行将一行或多行文本进行分隔。


```markdown
这是第一段。

这是第二段。
```
这是第一段。

这是第二段。

### 三. 换行

在一行的末尾添加两个或多个空格，然后按回车键,即可创建一个换行(<br>)。
```markdown
这是第一行。  
这是第二行。
```
这是第一行。  
这是第二行。

### 四. 强调

```markdown
**粗体文本** 两个星号
*斜体文本* 一个星号
***粗斜体文本*** 三个星号
```
**粗体文本** 两个星号  
*斜体文本* 一个星号  
***粗斜体文本*** 三个星号

### 五. 引用

```markdown
> 一行

> 块引用可以包含多个段落。为段落之间的空白行添加一个 > 符号。
>
> 多个段落

> 多层嵌套
>
> 多层嵌套
>
> > 多层嵌套

> #### 其他元素的块引用
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.
```
> 一行

> 块引用可以包含多个段落。为段落之间的空白行添加一个 > 符号。
>
> 多个段落

> 多层嵌套
>
> 多层嵌套
>
> > 多层嵌套

> #### 其他元素的块引用
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.


### 六.列表

#### 6.1 有序无序
缩进一个或多个列表项,四个空格可创建嵌套列表。
```markdown
- 无序列表
- 无序列表
- 无序列表

1. 有序列表
    1. 嵌套有序列表
    2. 嵌套有序列表
2. 有序列表
3. 有序列表
```
- 无序列表
- 无序列表
- 无序列表

1. 有序列表
    1. 嵌套有序列表
    2. 嵌套有序列表
2. 有序列表
3. 有序列表

#### 6.2 在列表中嵌套其他元素

要在保留列表连续性的同时在列表中添加另一种元素，请将该元素缩进四个空格或一个制表符，

```markdown
*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.
```
*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.


### 七. 代码

```markdown
`单词短语`
``转义反引号`code` in``
```
`单词短语`  
``转义反引号`code` in``

Note: 要创建不用缩进的代码块，请使用 围栏式代码块（三个反引号）.

### 八. 分隔线
```markdown
Try to put a blank line before...

---

...and after a horizontal rule.
```
Try to put a blank line before...

---

...and after a horizontal rule.

### 九. 链接
```markdown
这是一个链接 [Markdown语法](https://markdown.com.cn)。  
这是一个链接 [Markdown语法](https://markdown.com.cn "最好的markdown教程")。

<https://markdown.com.cn>  
<fake@example.com>

I love supporting the **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.  
See the section on [`code`](#code).  

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle

```
这是一个链接 [Markdown语法](https://markdown.com.cn)。  
这是一个链接 [Markdown语法](https://markdown.com.cn "最好的markdown教程")。

<https://markdown.com.cn>  
<fake@example.com>

I love supporting the **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.  
See the section on [`code`](#code).  

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle


### 十. 图片
```markdown
![这是图片](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Magic Gardens")
[![链接图片](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Shiprock")](https://markdown.com.cn)
```
![这是图片](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Magic Gardens")
[![链接图片](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Shiprock")](https://markdown.com.cn)


### 十一. 转义字符

要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 \ 。
```markdown
\,`,*,_,{},[],(),#,+,-,.,!,|
```
\\,\`,\*,\_,\{\},\[\],\(\),\#,\+,\-,\.,\!,\|

在 Markdown 的块级元素和内联元素中， < 和 & 两个符号都会被自动转换成 HTML 实体

### 十二. 内嵌HTML标签

```markdown
This **word** is bold. This <em>word</em> is italic.
```

This **word** is bold. This <em>word</em> is italic.

## 扩展语法

### 一. 表格
可以使用表格的HTML字符代码（&#124;）在表中显示竖线（|）字符。
```markdown
| Syntax      | Description | Test Text     |Test Text     |
| :---        |    :----:   |          ---: |  ----------- |
| Header      | Title       | Here's this   |Here's this   |
| Paragraph   | Text        | And more      |And more      |
```
| Syntax      | Description | Test Text     |Test Text     |
| :---        |    :----:   |          ---: |  ----------- |
| Header      | Title       | Here's this   |Here's this   |
| Paragraph   | Text        | And more      |And more      |

### 二. 围栏代码块

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### 三. 标题编号

```markdown
### My Great Heading {#custom-id}
```

### 四. 删除线

```markdown
~~世界是平坦的。~~ 我们现在知道世界是圆的。
```

~~世界是平坦的。~~ 我们现在知道世界是圆的。

### 五. 任务列表语法

```markdown
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
```

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

### 六. Emoji表情
```markdown
去露营了！ :tent: 很快回来。

真好笑！ :joy:
```

:tent:
:joy:

### 六. 自动网址链接
```markdown
http://www.example.com
`http://www.example.com`
```
http://www.example.com  
`http://www.example.com`