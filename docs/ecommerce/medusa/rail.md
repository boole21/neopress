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
  STRIPE_API_KEY=sk_...
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



Email: 需要把redis打开
