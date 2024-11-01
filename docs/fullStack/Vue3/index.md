---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue3"
  text: "常用命令操作等"
  tagline: Vue3
  actions:
    - theme: brand
      text: Vue官网
      link: https://cn.vuejs.org/
    - theme: alt
      text: 后盾人
      link: https://www.houdunren.com/system/12
    - theme: alt  
      text: 常用练习
      link: /fullStack/Vue3/Exercise/index
features:
  - title: 第一部分 vue官网
    link: /fullStack/Vue3/Official/1Start/0101Introduce
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第二部分 hd
    link: /fullStack/Vue3/hd/01basic
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第三部分 其它文章
    link: /fullStack/Javascript/Part3
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
  import XmindViewer from '../../components/xmind/XmindViewer.vue'
</script>

<XmindViewer url="./Vue.xmind"/>
