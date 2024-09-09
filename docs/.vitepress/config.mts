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
					{ text: "VueRout", link: "" },
					{ text: "Pinia", link: "" },
					{ text: "Vite", link: "" },
					{ text: "React", link: "/fullStack/React/index" },
					{ text: "Shadcn", link: "" },
					{ text: "NextJs", link: "/fullStack/NextJs/index" },
					{ text: "NestJs", link: "" },
					{ text: "Vitepress", link: "/fullStack/Vitepress/index" },
					{ text: "Tailwindcss", link: "" },
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

			"/fullStack/Css": [{ text: "", collapsed: true, items: [] }],
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
