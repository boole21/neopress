## 开关

```tsx
const plugins = [
  // ...
  {
    resolve: `medusa-plugin-custom`,
    options: {
      // other options
      enableUI: true,
    },
  },
]
```

## 安装plugin

url: https://docs.medusajs.com/development/backend/install

```bash
pnpm add @medusajs/medusa-cli -g
medusa new my-medusa-store # or npx @medusajs/medusa-cli new
cd my-medusa-store
medusa develop # or npx medusa develop
npx medusa user --email bolepan21@gmail.com --password admin8888
medusa seed --seed-file=data/seed.json

```

