# debugger

Url: https://nextjs.org/docs/pages/building-your-application/configuring/debugging



## vsCode

1. 新建.vscode/lauch.json文件

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Next.js: debug server-side",
         "type": "node-terminal",
         "request": "launch",
         "command": "npm run dev"
       },
       {
         "name": "Next.js: debug client-side",
         "type": "chrome",
         "request": "launch",
         "url": "http://localhost:9090"
       },
       {
         "name": "Next.js: debug full stack",
         "type": "node-terminal",
         "request": "launch",
         "command": "pnpm run dev",
         "serverReadyAction": {
           "pattern": "- Local:.+(https?://.+)",
           "uriFormat": "%s",
           "action": "debugWithChrome"
         }
       }
     ]
   }
   ```

   

2. 打开"运行和调试" 点击Debug:Strart Debugging

## 使用Console Ninja

把鼠标放到蓝色的显示信息上

### build时错误处理

1. Type error: 'CheckoutSummary' cannot be used as a JSX component.
     Its return type 'Promise<Element | null>' is not a valid JSX element.

在组件前添加        {/* @ts-expect-error Server Component */}

2. 忽略eslint和tstype类型检查build打包

   在next.config.mjs的配置文件中加入相关配置url:https://blog.csdn.net/qq_42619099/article/details/137687521

   ```js
     eslint: {
       ignoreDuringBuilds: true,
     },
     typescript: {
       ignoreBuildErrors: true,
     },
   ```

   