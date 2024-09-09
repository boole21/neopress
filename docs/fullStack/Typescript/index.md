---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "TypeScript"
  text: "常用命令操作等"
  tagline: TypeScript
  actions:
    - theme: brand
      text: 黑马TypeScript
      link: https://www.bilibili.com/video/BV14Z4y1u7pi/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click
    - theme: alt
      text: 后盾人
      link: https://www.houdunren.com/system/11
features:
  - title: 第一部分 黑马
    link: /fullStack/Typescript/heima/1Introduction
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: 第二部分 后盾人
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
