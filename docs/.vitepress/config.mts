import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Neo笔记文档",
	description: "个人的文档库,包括前端项目,英文学习,个人时间精力知识管理,电商建站营销等.",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{
				text: "前后端",
				items: [
					{ text: "Html5", link: "/fullStack/Html/index" },
					{ text: "Css3", link: "/fullStack/Css/index" },
					{ text: "Javascript", link: "/fullStack/Javascript/index" },
					{ text: "Typescript", link: "/fullStack/Typescript/index" },
					{ text: "Vue", link: "/fullStack/Vue3/index" },
					{ text: "VueRout", link: "/fullStack/VueRouter/hd/01basic" },
					{ text: "Pinia", link: "" },
					{ text: "Vite", link: "" },
					{ text: "React", link: "/fullStack/React/index" },
					{ text: "Shadcn", link: "" },
					{ text: "NextJs", link: "/fullStack/NextJs/index" },
					{ text: "NestJs", link: "" },
					{ text: "Vitepress", link: "/fullStack/Vitepress/index" },
					{ text: "Tailwindcss", link: "" },
					{ text: "Laravel", link: "/fullStack/Laravel/index" },
				],
			},
			{
				text: "电商",
				items: [
					{ text: "Medusa", link: "/ecommerce/medusa/index" },
					{
						text: "postgresql",
						link: "/ecommerce/postgre/index",
					},
				],
			},
			{
				text: "服务器",
				items: [
					{ text: "Git", link: "" },
					{ text: "Linux", link: "" },
					{ text: "Docker", link: "" },
				],
			},
			{
				text: "工具软件",
				items: [
					{ text: "常用快捷键", link: "/tools/keyboard" },
					{ text: "Mac", link: "/tools/mac" },
					{ text: "Git", link: "/tools/git" },
					{ text: "Vscode", link: "/tools/vscode" },
					{ text: "Markdown", link: "/tools/markdown" },
					{ text: "AeroSpace", link: "/tools/aerospace" },
				],
			},
			{
				text: "英语",
				items: [
					{ text: "Larry语法", link: "/english/Grammar/Larry" },
					{ text: "新概念", link: "/english/NCE3" },
					{ text: "旋元佑", link: "" },
				],
			},
			{
				text: "高效",
				items: [
					{ text: "番茄工作法", link: "" },
					{ text: "思维导图", link: "" },
					{ text: "卡片", link: "" },
					{ text: "记忆宫殿", link: "" },
					{ text: "快速阅读", link: "" },
				],
			},
			{
				text: "书本",
				items: [
					{ text: "历史", link: "" },
					{ text: "财经", link: "" },
					{ text: "小说", link: "" },
					{ text: "科技", link: "" },
					{ text: "传记", link: "" },
					{ text: "英文", link: "" },
					{ text: "temp", link: "/books/temp" },
				],
			},
		],

		sidebar: {
			"/english/Grammar": [
				{
					text: "Larry语法课",
					collapsed: true,
					items: [
						{ text: "1词性", link: "/english/Grammar/Larry/1词性" },
						{ text: "2简单句", link: "/english/Grammar/Larry/2简单句" },
						{ text: "3从句", link: "/english/Grammar/Larry/3从句" },
					],
				},
			],
			"/english/NCE3": [
				{
					text: "新概念3",
					collapsed: true,
					items: [
						{
							text: "1-10",
							collapsed: true,
							items: [
								{ text: "1APumaAtLarge", link: "/english/NCE3/1APumaAtLarge" },
								{ text: "9FlyingCat", link: "/english/NCE3/9FlyingCat" },
							],
						},
					],
				},
			],

			"/fullStack/Css": [
				{
					text: "hdCss",
					collapsed: true,
					items: [
						{
							text: "01第一章CSS3简介",
							link: "/fullStack/Css/hd/01第一章CSS3简介",
						},
						{
							text: "02第二章CSS3选择器",
							link: "/fullStack/Css/hd/02第二章CSS3选择器",
						},
						{
							text: "03第三章CSS3权重",
							link: "/fullStack/Css/hd/03第三章CSS3权重",
						},
						{
							text: "04第四章CSS3文本",
							link: "/fullStack/Css/hd/04第四章CSS3文本",
						},
						{
							text: "05第五章CSS3盒子模型",
							link: "/fullStack/Css/hd/05第五章CSS3盒子模型",
						},
						{
							text: "06第六章CSS3背景处理",
							link: "/fullStack/Css/hd/06第六章CSS3背景处理",
						},
						{
							text: "07第七章使用CSS3操作数据内容样式",
							link: "/fullStack/Css/hd/07第七章使用CSS3操作数据内容样式",
						},
						{
							text: "08第八章css3浮动布局深度挖掘",
							link: "/fullStack/Css/hd/08第八章css3浮动布局深度挖掘",
						},
						{ text: "09第九章CSS3定位布局特性", link: "/fullStack/Css/hd/09第九章CSS3定位布局特性" },
						{
							text: "10第十章CSS3FLEX弹性盒模型",
							link: "/fullStack/Css/hd/10第十章CSS3FLEX弹性盒模型",
						},
					],
				},
			],
			"/fullStack/Javascript": [
				{
					text: "Js一",
					collapsed: true,
					items: [
						{
							text: "2 基础知识",
							items: [
								{ text: "2.5 数据类型", link: "/fullStack/Javascript/Part1/2Fundamentals/0205DataTypes" },
								{ text: "2.6 交互", link: "/fullStack/Javascript/Part1/2Fundamentals/0206Interaction" },
								{
									text: "2.7 类型转换",
									link: "/fullStack/Javascript/Part1/2Fundamentals/0207TypeConversions",
								},
							],
						},
					],
				},
				{
					text: "Js二 浏览器：文档，事件，接口",
					collapsed: true,
					items: [
						{
							text: "1 Document",
							collapsed: true,
							items: [
								{
									text: "1.1浏览器环境，规格",
									link: "/fullStack/Javascript/Part2/1Document/0101BrowserEnvironment",
								},
								{
									text: "1.2DOM 树",
									link: "/fullStack/Javascript/Part2/1Document/0102DOM",
								},
								{
									text: "1.3遍历 DOM",
									link: "/fullStack/Javascript/Part2/1Document/0103WalkingDOM",
								},
								{
									text: "1.4搜索：getElement*，querySelector*",
									link: "/fullStack/Javascript/Part2/1Document/0104SearchElementSelector",
								},
								{
									text: "1.5节点属性：type，tag 和 content",
									link: "/fullStack/Javascript/Part2/1Document/0105TypeTagContent",
								},
								{
									text: "1.6Attributes and properties",
									link: "/fullStack/Javascript/Part2/1Document/0106AttributesProperties",
								},
								{
									text: "1.7修改文档",
									link: "/fullStack/Javascript/Part2/1Document/0107ModifyingDocument",
								},
								{
									text: "1.8样式和类",
									link: "/fullStack/Javascript/Part2/1Document/0108StylesClasses",
								},
								{
									text: "1.9元素大小和滚动",
									link: "/fullStack/Javascript/Part2/1Document/0109ElementSizeScrolling",
								},
								{
									text: "1.10Window 大小和滚动",
									link: "/fullStack/Javascript/Part2/1Document/0110WindowSizesScrolling",
								},
								{
									text: "1.11坐标",
									link: "/fullStack/Javascript/Part2/1Document/0111Coordinates",
								},
							],
						},
						{
							text: "2 事件简介",
							collapsed: true,
							items: [],
						},
						{
							text: "3 UI事件",
							collapsed: true,
							items: [],
						},
						{
							text: "4 表单，空间",
							collapsed: true,
							items: [],
						},
						{
							text: "5 加载文档和其他资源",
							collapsed: true,
							items: [],
						},
						{
							text: "6 杂项",
							collapsed: true,
							items: [],
						},
					],
				},
				{
					text: "Js三",
					collapsed: true,
					items: [],
				},
			],
			"/fullStack/Vue3": [
				{
					text: "官网",
					collapsed: true,
					items: [
						{
							text: "开始",
							items: [{ text: "简介", link: "/fullStack/Vue3/Official/1Start/0101Introduce" }],
						},
						{
							text: "基础",
							items: [
								{ text: "1创建一个应用", link: "/fullStack/Vue3/Official/2Essentials/0201Create" },
								{ text: "2模板语法", link: "/fullStack/Vue3/Official/2Essentials/0202TemplateSyntax" },
								{ text: "3响应式基础", link: "/fullStack/Vue3/Official/2Essentials/0203Reactivity" },
								{ text: "4计算属性", link: "/fullStack/Vue3/Official/2Essentials/0204Computed" },
								{ text: "5Class与Style绑定", link: "/fullStack/Vue3/Official/2Essentials/0205ClassStyle" },
								{ text: "6条件渲染", link: "/fullStack/Vue3/Official/2Essentials/0206Conditional" },
								{ text: "7列表渲染", link: "/fullStack/Vue3/Official/2Essentials/0207List" },
								{ text: "8事件处理", link: "/fullStack/Vue3/Official/2Essentials/0208EventHandling" },
								{ text: "9表单输入绑定", link: "/fullStack/Vue3/Official/2Essentials/0209FormInput" },
								{ text: "10生命周期", link: "/fullStack/Vue3/Official/2Essentials/0210Lifecycle" },
								{ text: "11侦听器", link: "/fullStack/Vue3/Official/2Essentials/0211Watchers" },
								{ text: "12模板引用", link: "/fullStack/Vue3/Official/2Essentials/0212TemplateRefs" },
								{ text: "13组件基础", link: "/fullStack/Vue3/Official/2Essentials/0213ComponentsBasics" },
							],
						},
						{
							text: "深入组件",
							items: [
								{ text: "1注册", link: "/fullStack/Vue3/Official/3Component/0301Registration" },
								{ text: "2Props", link: "/fullStack/Vue3/Official/3Component/0302Props" },
								{ text: "3事件", link: "/fullStack/Vue3/Official/3Component/0303Events" },
								{ text: "4组件v-model", link: "/fullStack/Vue3/Official/3Component/0304VModel" },
								{ text: "5透传Attributes", link: "/fullStack/Vue3/Official/3Component/0305Failthrough" },
								{ text: "6插槽", link: "/fullStack/Vue3/Official/3Component/0306Slots" },
								{ text: "7依赖注入", link: "/fullStack/Vue3/Official/3Component/0307ProvideInject" },
								{ text: "8异步组件", link: "/fullStack/Vue3/Official/3Component/0308Async" },
							],
						},
					],
				},
				{
					text: "hd Vue3",
					collapsed: true,
					items: [
						{ text: "01第一章新手入门启航篇", link: "/fullStack/Vue3/hd/01basic" },
						{ text: "02第二章组件化开发", link: "/fullStack/Vue3/hd/02component" },
						{ text: "03第三章插槽slot使用技巧", link: "/fullStack/Vue3/hd/03slot" },
						{ text: "04第四章provide-inject与动态组件", link: "/fullStack/Vue3/hd/04provideInjectDynamic" },
						{ text: "05第五章生命周期", link: "/fullStack/Vue3/hd/05lifeCycle" },
						{ text: "06第六章composition api基础", link: "/fullStack/Vue3/hd/06compositionApi" },
						{
							text: "07第七章composition之script-setup",
							link: "/fullStack/Vue3/hd/07compositionScriptSetup",
						},
						{ text: "08第八章过渡与动画", link: "/fullStack/Vue3/hd/08TransitionAnimation" },
						{ text: "09第九章vue与typescript结合", link: "/fullStack/Vue3/hd/09typescript" },
					],
				},
			],
			"/fullStack/VueRouter": [
				{
					text: "hd VueRouter",
					collapsed: true,
					items: [
						{ text: "01第一章vue-router基础知识", link: "/fullStack/VueRouter/hd/01basic" },
						{ text: "02第二章布局视图与路由导向", link: "/fullStack/VueRouter/hd/02viewLink" },
						{ text: "03第三章路由守卫", link: "/fullStack/VueRouter/hd/03routeGuard" },
						{ text: "04第四章路由动画与滚动效果", link: "/fullStack/VueRouter/hd/04animation" },
						{ text: "05第五章路由懒加载", link: "/fullStack/VueRouter/hd/05lazyLoad" },
						{ text: "06第六章动态添加路由", link: "/fullStack/VueRouter/hd/06dynamicRoute" },
					],
				},
			],
			"/fullStack/Typescript": [
				{
					text: "Typescript",
					collapsed: true,
					items: [
						{
							text: "1介绍",
							link: "/fullStack/Typescript/heima/1Introduction",
						},
						{
							text: "2初体验",
							link: "/fullStack/Typescript/heima/2FirstExperience",
						},
						{
							text: "3常用类型",
							link: "/fullStack/Typescript/heima/3CommonType",
						},
						{
							text: "4高级类型",
							link: "/fullStack/Typescript/heima/4AdvancedType",
						},
						{
							text: "5类型声明文件",
							link: "/fullStack/Typescript/heima/5Declaration",
						},
						{
							text: "6React中使用TypeScript",
							link: "/fullStack/Typescript/heima/6React",
						},
					],
				},
			],
			"/fullStack/React": [
				{
					text: "黑马React",
					collapsed: true,
					items: [
						{
							text: "Day1",
							link: "/fullStack/React/heima/day1",
						},
						{
							text: "Day2",
							link: "/fullStack/React/heima/day2",
						},
						{
							text: "Day3",
							link: "/fullStack/React/heima/day3",
						},
						{
							text: "Day4",
							link: "/fullStack/React/heima/day4",
						},
						{
							text: "Day5",
							link: "/fullStack/React/heima/day5",
						},
					],
				},
			],
			"/fullStack/Laravel": [
				{
					text: "Laravel hd",
					collapsed: true,
					items: [
						{ text: "1基本", link: "/fullStack/Laravel/hd/1basic" },
						{ text: "2sms", link: "/fullStack/Laravel/hd/1sms" },
					],
				},
			],
			"/fullStack/NextJs": [
				{
					text: "NextJs官方练习",
					collapsed: true,
					items: [
						{ text: "0介绍", link: "/fullStack/NextJs/office" },
						{ text: "1基础", link: "/fullStack/NextJs/office/1Started" },
						{ text: "2样式", link: "/fullStack/NextJs/office/2Styling" },
						{ text: "3字体图像", link: "/fullStack/NextJs/office/3FontsImages" },
						{ text: "4Layouts", link: "/fullStack/NextJs/office/4LayoutsPage" },
						{ text: "5导航", link: "/fullStack/NextJs/office/5Navigating" },
						{ text: "6建立数据", link: "/fullStack/NextJs/office/6Database" },
						{ text: "7数据获取", link: "/fullStack/NextJs/office/7FetchingData" },
						{ text: "8渲染", link: "/fullStack/NextJs/office/8Rendering" },
						{ text: "9流", link: "/fullStack/NextJs/office/9Streaming" },
						{ text: "10部分预渲染", link: "/fullStack/NextJs/office/10PartialPrerendering" },
						{ text: "11标记页面", link: "/fullStack/NextJs/office/11SearchPagination" },
						{ text: "12数据变异", link: "/fullStack/NextJs/office/12MutatingData" },
						{ text: "13处理错误", link: "/fullStack/NextJs/office/13HandlingErrors" },
						{ text: "14易用性", link: "/fullStack/NextJs/office/14Accessibility" },
						{ text: "15身份验证", link: "/fullStack/NextJs/office/15Authentication" },
						{ text: "16元数据", link: "/fullStack/NextJs/office/16Metadata" },
					],
				},
			],
		},

		docFooter: { prev: "上一篇", next: "下一篇" },
		outlineTitle: "页面导航",
		sidebarMenuLabel: "菜单",
		darkModeSwitchLabel: "主题",
		returnToTopLabel: "回到顶部",

		socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
	},
	markdown: {
		math: true,
		container: {
			tipLabel: "提示",
			warningLabel: "警告",
			dangerLabel: "危险",
			infoLabel: "信息",
			detailsLabel: "详细信息",
		},
	},
});
