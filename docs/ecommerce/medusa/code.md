# 号码

## 1. sendgrid

Recovery code：U18DUF2SQ119ZDUNPQ6JJ3T3

账号：pennycostz@gmail.com

密码：TY5GUSWMV9WW7R3SWHGXGYRA

Pdj1955&dcy1954

## 2. mailchimp

Username: bolepan

Password : 1111aaA!

Email:bolepan21@gmail.com

## 3. Brevo

APi Settings

APi Key :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

SMTP settings

SMTP server

smtp-relay.brevo.com

Port

587

Login

7a31a9001@smtp-brevo.com

Password

byZqHSQE8nJsPIaw





```bash
curl --request POST \
  --url https://api.brevo.com/v3/smtp/email \
  --header 'accept: application/json' \
  --header 'api-key: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' \
  --header 'content-type: application/json' \
  --data '{  
   "sender":{  
      "name":"Sender Alex",
      "email":"bolepan21@gmail.com"
   },
   "to":[  
      {  
         "email":"nailme@sina.com",
         "name":"John Doe"
      }
   ],
   "subject":"Hello world",
   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>"
}'
```

```tsx
BREVO_API_KEY=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
BREVO_FROM_EMAIL=bolepan21@gmail.com
BREVO_FROM_NAME=LeiStore
```

mailchimp

56ffec9170987554a449eecc1fbb36b6-us11

c61ab95b1a





```tsx
order {
  object: 'order',
  id: 'order_01J55NCQ7R7B3RA3MEPYTSARMP',
  created_at: 2024-08-13T10:43:56.770Z,
  updated_at: 2024-08-13T10:43:56.770Z,
  status: 'pending',
  fulfillment_status: 'not_fulfilled',
  payment_status: 'awaiting',
  display_id: 25,
  cart_id: 'cart_01J55NCA0CN8W28MXG7R5GFP5X',
  customer_id: 'cus_01J54Z8X19R3XGHG70ZC88XHAV',
  email: 'nailme@sina.com',
  billing_address_id: 'addr_01J55NCG44T3Q542FHB6TGN8F5',
  shipping_address_id: 'addr_01J55NCG448QQ8Q9ZZNRKS0EG2',
  region_id: 'reg_01J54E35HVQWXP83Z02YN9BP9B',
  currency_code: 'usd',
  tax_rate: null,
  draft_order_id: null,
  canceled_at: null,
  metadata: {},
  no_notification: null,
  idempotency_key: null,
  external_id: null,
  sales_channel_id: 'sc_01J54E2PTEET401GJ9NNDP7FGX',
  beforeInsert: [Function (anonymous)],
  beforeUpdate: [Function (anonymous)],
  afterLoad: [Function (anonymous)],
  items: [
    LineItem {
      id: 'item_01J55NCA1W45KM2NZGEN9XEX9P',
      created_at: 2024-08-13T10:43:43.284Z,
      updated_at: 2024-08-13T10:43:56.770Z,
      cart_id: 'cart_01J55NCA0CN8W28MXG7R5GFP5X',
      order_id: 'order_01J55NCQ7R7B3RA3MEPYTSARMP',
      swap_id: null,
      claim_order_id: null,
      original_item_id: null,
      order_edit_id: null,
      title: 'T-shirt',
      description: 'Green',
      thumbnail: 'http://localhost:9000/uploads/1723505484657-product-1-1.jpg',
      is_return: false,
      is_giftcard: false,
      should_merge: true,
      allow_discounts: true,
      has_shipping: true,
      unit_price: 2100,
      variant_id: 'variant_01J54EZKRYRW830S0TCNQVG6KR',
      quantity: 1,
      fulfilled_quantity: null,
      returned_quantity: null,
      shipped_quantity: null,
      metadata: {}
    }
  ]
}
```



## 4. Paypal

sandbox

API credentials

Client ID:

AWiRnOEwHnEOgI2We7Jp8Ra9BtXqP7jv2E4Ku_rwcI7VMwQ3dd6hLoPLERgD3vX-81_dfIjAxOMrLe48

Client secret:

EJve0nVCNEzZU_wZ5DIBnbwTQDO2FoXct_Mysw23V9EIeBu_j8ut3VV_wSwL8LmyJuF5lFM38893uKgY



Sandbox account info

Sandbox Region

C2

Email

sb-g2r0f8333071@business.example.com



Password

R;);t{9Z

## 5. stripe

Email:bolepan21@gmail.com

全名：bole pan

国家: 美国

密码：$!1243aaA!

测试公钥

pk_test_51PrJAaCbNTh5gVzLvkWSWukSzTOh5sikWRLdayV9x6TPQCQ2pO6giahd77HhQklInP3zDJgz0dfq825RiFTl3FYe00KfJXVZUC

密钥sk_test_51PrJAaCbNTh5gVzLfArVPQqaTEdZrX7tGOGcrUwxxHDSapaeNhhAuqLaNL5sODwTG522wIf3yBvd2knh2L4m4so500JDNoR8nn
