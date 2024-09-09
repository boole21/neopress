---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Javascript"
  text: "常用命令操作等"
  tagline: 学习现代javascript
  actions:
    - theme: brand
      text: 现代JavaScript教程
      link: https://zh.javascript.info/
    - theme: alt
      text: 后盾人
      link: https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/js/1%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html
features:
  - title: 第一部分 编程语言
    link: /fullStack/Javascript/Part1
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第二部分 浏览器 文档，事件，接口
    link: /fullStack/Javascript/Part2
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第三部分 其它文章
    link: /fullStack/Javascript/Part3
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
  import XmindViewer from '../../components/xmind/XmindViewer.vue'
</script>

<XmindViewer url="./Javascript.xmind"/>
