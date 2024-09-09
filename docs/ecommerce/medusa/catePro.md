# 获取目录和商品

## 获取Categories目录

```jsx
import { medusaClient } from "@lib/config"
  let { product_categories } = await medusaClient.productCategories.list()
```

```tsx
[
  {
    id: 'pcat_01J4K7Y90116P4JNQT96NHE0ZT',
    created_at: '2024-08-06T07:02:32.188Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Bags',
    description: '',
    handle: 'bags',
    parent_category_id: null,
    rank: 0,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_shirts',
    created_at: '2024-08-05T07:40:25.149Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'T-Shirts',
    description: '',
    handle: 'shirts',
    parent_category_id: null,
    rank: 1,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K7Z222C2J85FV9P8HP71CW',
    created_at: '2024-08-06T07:02:57.856Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Sandal',
    description: '',
    handle: 'sandal',
    parent_category_id: null,
    rank: 2,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K7ZM7V1YEJ0VMBDN2FQ91C',
    created_at: '2024-08-06T07:03:16.472Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'ScarfCap',
    description: '',
    handle: 'scarfcap',
    parent_category_id: null,
    rank: 3,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K7ZW5FX8FE07XE8ZDSBKSP',
    created_at: '2024-08-06T07:03:24.589Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Shoes',
    description: '',
    handle: 'shoes',
    parent_category_id: null,
    rank: 4,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K807Y1M8NEAFKCXRW80VRC',
    created_at: '2024-08-06T07:03:36.636Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Pillowcas',
    description: '',
    handle: 'pillowcas',
    parent_category_id: null,
    rank: 5,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K80K88RJFBF25T7VXSK3W5',
    created_at: '2024-08-06T07:03:48.222Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Jumsuit',
    description: '',
    handle: 'jumsuit',
    parent_category_id: null,
    rank: 6,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4K80TARE6WKF21JFJFGCNZ8',
    created_at: '2024-08-06T07:03:55.476Z',
    updated_at: '2024-08-07T01:53:16.880Z',
    name: 'Hats',
    description: '',
    handle: 'hats',
    parent_category_id: null,
    rank: 7,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6NNA19VJFMZC203NVXB4D',
    created_at: '2024-08-07T01:18:50.173Z',
    updated_at: '2024-08-07T03:38:56.096Z',
    name: 'Featured',
    description: '',
    handle: 'featured',
    parent_category_id: null,
    rank: 8,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6P39FY8HGMXNFMVVVCVBA',
    created_at: '2024-08-07T01:19:04.491Z',
    updated_at: '2024-08-07T03:39:11.288Z',
    name: 'Popular',
    description: '',
    handle: 'popular',
    parent_category_id: null,
    rank: 9,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6PREKVGD3XDXCAMJ99Y9K',
    created_at: '2024-08-07T01:19:26.160Z',
    updated_at: '2024-08-07T03:39:16.263Z',
    name: 'New added',
    description: '',
    handle: 'new',
    parent_category_id: null,
    rank: 10,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6Q2DCRX8PC544648HMK9M',
    created_at: '2024-08-07T01:19:36.362Z',
    updated_at: '2024-08-07T03:39:21.447Z',
    name: 'Hot',
    description: '',
    handle: 'hot',
    parent_category_id: null,
    rank: 11,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6QCRKPRY6FAX908AZR9XY',
    created_at: '2024-08-07T01:19:46.961Z',
    updated_at: '2024-08-07T03:39:26.538Z',
    name: 'Deals',
    description: '',
    handle: 'deals',
    parent_category_id: null,
    rank: 12,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6QMTQTMEVKZTHHXAP74SQ',
    created_at: '2024-08-07T01:19:55.221Z',
    updated_at: '2024-08-07T03:39:31.256Z',
    name: 'Top',
    description: '',
    handle: 'top',
    parent_category_id: null,
    rank: 13,
    metadata: {},
    category_children: [],
    parent_category: null
  },
  {
    id: 'pcat_01J4N6QY8B5E5XB60N0EQD340P',
    created_at: '2024-08-07T01:20:04.873Z',
    updated_at: '2024-08-07T03:39:35.634Z',
    name: 'Trendy',
    description: '',
    handle: 'trendy',
    parent_category_id: null,
    rank: 14,
    metadata: {},
    category_children: [],
    parent_category: null
  }
]
```

## 获取商品列表

```tsx
import { medusaClient } from "@lib/config"

export default async function HomeFeatured() {
  const featuredPromise = medusaClient.products.list({
    category_id: ["pcat_01J4N6NNA19VJFMZC203NVXB4D"],
    limit: 8,
  })
  const popularPromise = medusaClient.products.list({
    category_id: ["pcat_01J4N6P39FY8HGMXNFMVVVCVBA"],
    limit: 8,
  })
  const newPromise = medusaClient.products.list({
    category_id: ["pcat_01J4N6PREKVGD3XDXCAMJ99Y9K"],
    limit: 8,
  })

  const data = await Promise.all([featuredPromise, popularPromise, newPromise])
  const [featuredProducts, popularProducts, newProducts] = data
  console.log(data)
  console.log("featuredProducts", featuredProducts)
  return <></>
}
```

## 商品信息

```tsx
product_categories:

[

  {

    id: 'pcat_01J4N6NNA19VJFMZC203NVXB4D',

    created_at: '2024-08-07T01:18:50.173Z',

    updated_at: '2024-08-07T03:42:41.368Z',

    name: 'Featured',

    description: '',

    handle: 'featured',

    parent_category_id: null,

    rank: 8,

    metadata: {},

    category_children: [],

    parent_category: null,

    products: Array(10) [

      {

        id: 'prod_01J4QFR71H81QNSFF6M4QGP5NP',

        title: 'Colorful Pattern Shirts4',

        handle: 'colorful-pattern-shirts-4',

        thumbnail: 

          'http://localhost:9000/uploads/1723070222871-product-4-1.jpg',

        images: [

          {

            id: 'img_01J4QFTKV6TE62RBX5ZCP7Z077',

            created_at: '2024-08-07T22:37:18.559Z',

            updated_at: '2024-08-07T22:37:18.559Z',

            deleted_at: null,

            url: 

              'http://localhost:9000/uploads/1723070238542-product-4-1.jpg',

            metadata: null

          },

          {

            id: 'img_01J4QFTKV60D9D35E1KGC3PWDS',

            created_at: '2024-08-07T22:37:18.559Z',

            updated_at: '2024-08-07T22:37:18.559Z',

            deleted_at: null,

            url: 

              'http://localhost:9000/uploads/1723070238542-product-4-2.jpg',

            metadata: null

          }

        ],

        tags: [

          {

            id: 'ptag_01J4P2JFWKF4G7CN1ANK20RX1N',

            created_at: '2024-08-07T09:26:26.425Z',

            updated_at: '2024-08-07T09:26:26.425Z',

            deleted_at: null,

            value: 'hot',

            metadata: null

          }

        ],

        created_at: '2024-08-07T22:35:59.901Z',

        price: {

          calculated_price: '$134.22',

          original_price: '$154.00',

          difference: '13',

          price_type: 'sale'

        }

      },

      {

        id: 'prod_01J4N85H1DGB86WS215YHX2SNF',

        title: 'Colorful Pattern Shirts13',

        handle: 'colorful-pattern-shirts-13',

        thumbnail: 

          'http://localhost:9000/uploads/1722995098641-product-13-1.jpg',

        images: [

          {

            id: 'img_01J4N85H1AZQBQZ1GEBGQM6P63',

            created_at: '2024-08-07T01:44:58.661Z',

            updated_at: '2024-08-07T01:44:58.661Z',

            deleted_at: null,

            url: 

              'http://localhost:9000/uploads/1722995098617-product-13-1.jpg',

            metadata: null

          },

          {

            id: 'img_01J4N85H1A2TPWAJZY15QDVPZ0',

            created_at: '2024-08-07T01:44:58.661Z',

            updated_at: '2024-08-07T01:44:58.661Z',

            deleted_at: null,

            url: 

              'http://localhost:9000/uploads/1722995098617-product-13-2.jpg',

            metadata: null

          }

        ],

        tags: [

          {

            id: 'ptag_01J4P2JFWKF4G7CN1ANK20RX1N',

            created_at: '2024-08-07T09:26:26.425Z',

            updated_at: '2024-08-07T09:26:26.425Z',

            deleted_at: null,

            value: 'hot',

            metadata: null

          }

        ],

        created_at: '2024-08-07T01:44:58.661Z',

        price: {

          calculated_price: '$88.77',

          original_price: '$111.22',

          difference: '20',

          price_type: 'sale'

        }

      },
```

## 获取用户信息

```jsx
import { getCustomer } from "@lib/data"
const customer = await getCustomer().catch(() => null)
```

