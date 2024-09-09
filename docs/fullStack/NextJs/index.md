---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "NextJs"
  text: "常用命令操作等"
  tagline: NextJs
  actions:
    - theme: brand
      text: NextJs
      link: https://nextjs.org/learn
    - theme: alt
      text: 
      link: 
features:
  - title: 第一部分 官网练习
    link: /fullStack/NextJs/office/index
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第二部分 
    link: /fullStack/Javascript/Part2
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第三部分 其它文章
    link: /fullStack/Javascript/Part3
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
  import XmindViewer from '../../components/xmind/XmindViewer.vue'
</script>

<XmindViewer url="./Typescript.xmind"/>
