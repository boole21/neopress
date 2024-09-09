# 后台安装流程admin



## 1. 安装

```bash
# 安装流程
mkdir medusa-test
cd medusa-test
npx create-medusa-app@latest
# 按需求填写
? What's the name of your project? lei
? Enter an email for your admin dashboard user admin@medusa-test.com
? Would you like to create the Next.js storefront? You can also create it later Yes N
? Enter your Postgres username postgres
? Enter your Postgres password [hidden]

storefront另外装这里通常不成功，会卡住
npx create-next-app -e https://github.com/medusajs/nextjs-starter-medusa lei-storefront
cd lei-storefront
mv .env.template .env.local
前台
cd lei
yarn dev
运行http://localhost:8000
后台
cd lei-storefront

后台地址：http://localhost:7001/
后台账号:admin@medusa-test.com
后台登录密码：admin8888


http://localhost:8000/us
前台账号
用户:bole pan
email:1111@gmail.com
phone:17777777777
password:admin8888
```

## 2. 设置

.env

```bash
### 启用categories功能

在.env文件中添加`MEDUSA_FF_PRODUCT_CATEGORIES=true`
```

## 3. wishlist

```bash
  yarn add medusa-plugin-wishlist
```

```tsx
  const plugins = [
    // ...
    `medusa-plugin-wishlist`
  ]
```

## 4. Brevo

```bash
yarn add medusa-plugin-brevo-email
```

```tsx
const plugins = [
    // ... other plugins
    {
        resolve: `medusa-plugin-brevo-email`,
        options: {
            api_key: process.env.BREVO_API_KEY,
            from_email: process.env.BREVO_FROM_EMAIL,
            from_name: process.env.BREVO_FROM_NAME,
            bcc: process.env.BREVO_BCC || null,
            
            contact_list: {
            enabled: process.env.BREVO_CONTACT_LIST_ENABLED || true,
            contact_list_id: process.env.BREVO_CONTACT_LIST_ID || 2
            },

            pdf: {
                enabled: process.env.BREVO_PDF_ENABLED || false,
                settings: {
                    font: process.env.BREVO_PDF_FONT || 'Helvetica', 
                    // [{file: 'yourfont.ttf', name: 'yourfont'},{file: 'yourfont-bold.ttf', name: 'yourfontbold'}]
                    format: process.env.BREVO_PDF_FORMAT || 'A4', 
                    // see supported formats here: https://pdfkit.org/docs/paper_sizes.html
                    margin: {
                        top: process.env.BREVO_PDF_MARGIN_TOP || '50',
                        right: process.env.BREVO_PDF_MARGIN_RIGHT || '50',
                        bottom: process.env.BREVO_PDF_MARGIN_BOTTOM || '50',
                        left: process.env.BREVO_PDF_MARGIN_LEFT || '50'
                    },
                    empty: "" // what to show if variable can't be found. Defaults to __UNDEFINED__
                },
                header: {
                    enabled: process.env.BREVO_PDF_HEADER_ENABLED || false,
                    content: process.env.BREVO_PDF_HEADER_CONTENT || null,
                    // loads empty header if null, otherwise loads the file from `BREVO_PDF_HEADER_CONTENT`
                    height: process.env.BREVO_PDF_HEADER_HEIGHT || '50'
                },
                footer: {
                    enabled: process.env.BREVO_PDF_FOOTER_ENABLED || false,
                    content: process.env.BREVO_PDF_FOOTER_CONTENT || null,
                    // loads empty footer if null, otherwise loads the file from `BREVO_PDF_FOOTER_CONTENT`
                },
                templates: {
                    invoice: process.env.BREVO_PDF_INVOICE_TEMPLATE || null,
                    credit_note: process.env.BREVO_PDF_CREDIT_NOTE_TEMPLATE || null,
                    return_invoice: process.env.BREVO_PDF_RETURN_INVOICE_TEMPLATE || null
                }
            },
            events: {
                order: {
                    placed: process.env.BREVO_ORDER_PLACED || null,
                    canceled: process.env.BREVO_ORDER_CANCELED || null,
                    shipment_created: process.env.BREVO_ORDER_SHIPMENT_CREATED || null,
                },
                customer: {
                    created: process.env.BREVO_CUSTOMER_CREATED || null,
                    password_reset: process.env.BREVO_CUSTOMER_PASSWORD_RESET || null,
                },
                user: {
                    created: process.env.BREVO_USER_CREATED || null,
                    password_reset: process.env.BREVO_USER_PASSWORD_RESET || null,
                },
                auth: {
                    password_reset: process.env.BREVO_AUTH_PASSWORD_RESET || null,
                    verify_account: process.env.BREVO_AUTH_VERIFY_ACCOUNT || null,
                },
                activity: {
                    inactive_user: process.env.BREVO_ACTIVITY_INACTIVE_USER || null,
                    inactive_customer: process.env.BREVO_ACTIVITY_INACTIVE_CUSTOMER || null,
                }
            },
            upsell: {
                enabled: process.env.BREVO_UPSELL_ENABLED || false,
                template: process.env.BREVO_UPSELL_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                delay: process.env.BREVO_UPSELL_DELAY || 9, // delay in days
                valid: process.env.BREVO_UPSELL_VALID || 30, // valid in days
                collection: process.env.BREVO_UPSELL_COLLECTION || null,
            },
            abandoned_cart: {
                enabled: process.env.BREVO_ABANDONED_CART_ENABLED || false,
                first: {
                    delay: process.env.BREVO_ABANDONED_CART_FIRST_DELAY || 1, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_FIRST_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
                second: {
                    delay: process.env.BREVO_ABANDONED_CART_SECOND_DELAY || 24, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_SECOND_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
                third: {
                    delay: process.env.BREVO_ABANDONED_CART_THIRD_DELAY || 48, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_THIRD_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
            },
            default_data: {
                // ... default data to be passed to the email template
                product_url: process.env.BREVO_PRODUCT_URL || '',
                product_name: process.env.BREVO_PRODUCT_NAME || '',
                company_name: process.env.BREVO_COMPANY_NAME || '',
                company_address: process.env.BREVO_COMPANY_ADDRESS || '',
            }
        }
    }
]
```



## 5. stripe

```bash
yarn add medusa-payment-stripe
```

```tsx
    {
      resolve: `medusa-payment-stripe`,
      options: {
        api_key: process.env.STRIPE_API_KEY,
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },
```

```tsx
MAILCHIMP_API_KEY=56ffec9170987554a449eecc1fbb36b6-us11
MAILCHIMP_NEWSLETTER_LIST_ID=c61ab95b1a

BREVO_API_KEY=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
BREVO_FROM_EMAIL=bolepan21@gmail.com
BREVO_FROM_NAME=John

STRIPE_API_KEY=sk_test_51PrJAaCbNTh5gVzLfArVPQqaTEdZrX7tGOGcrUwxxHDSapaeNhhAuqLaNL5sODwTG522wIf3yBvd2knh2L4m4so500JDNoR8nn
# STRIPE_WEBHOOK_SECRET=
```

## 6. 安装postgre

```bash
# 使用docker安装postgres
docker pull postgres
docker pull postgres:alpine # 体积小
docker volume create postgre-data
docker run -id --name=medusa3 -v postgre-data3:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=123456 -e LANG=C.UTF-8 postgres
```

## 7. 安装redis

