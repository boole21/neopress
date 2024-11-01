# railway

## 1. cloudinary

```text
	
Key Name:	star8s
CLOUDINARY_API_KEY API Key:877233781171155
CLOUDINARY_API_SECRET
 API Secret:lCyS1eJ9tLEnYS-nxC08xueaHak
CLOUDINARY_CLOUD_NAME
 Cloud name: dodpnn13u
```

```text
COOKIE_SECRET:2323232323
JWT_SECRET:2424242424

```

admin@medusa-test.com

supersecret



2. 忽略eslint和tstype类型检查build打包

   ```text
     eslint: {
       ignoreDuringBuilds: true,
     },
     typescript: {
       ignoreBuildErrors: true,
     },
   ```

   

## 3. plugin

Payment:stripe

```bash
yarn add medusa-payment-stripe
```

.env

```text
  STRIPE_API_KEY=sk_test_51PrJAaCbNTh5gVzLfArVPQqaTEdZrX7tGOGcrUwxxHDSapaeNhhAuqLaNL5sODwTG522wIf3yBvd2knh2L4m4so500JDNoR8nn
  # only necessary for production
  STRIPE_WEBHOOK_SECRET=whsec_...
```

Medusa-config.js

```text
  const plugins = [
    // ...
    {
      resolve: `medusa-payment-stripe`,
      options: {
        api_key: process.env.STRIPE_API_KEY,
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },
  ]
```

storefront--.env.local

NEXT_PUBLIC_STRIPE_KEY=<YOUR_PUBLISHABLE_KEY>





Email: 需要把redis打开

# 4. 安装步骤

1. 再railway.app中新建一个template，选择medusajs

2. 新建后的默认账号密码

   ```text
   Email: admin@medusa-test.com
   Password: supersecret
   ```

3. 点eject，复制并新建一个github仓库，并下载到本地，新建分支develop,同步到线上，在develop上开发

   ```text
   git clone  git@github.com:boole21/medusajs-tattoo.git
   git checkout -b develop
   git push --set-upstream origin develop
   ```

4. 复制medusajs-backend中的.env.template并修改为.env，复制medusa-storefront中的.env.local.template并修改为.env.local,此两个文件为本地中的运行环境

