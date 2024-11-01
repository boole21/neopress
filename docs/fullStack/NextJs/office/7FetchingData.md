# 第7章 获取数据

## 7.1 选择如何获取数据

### 7.1.1 API层

- Route Handlers

### 7.1.2 数据库查询

- SQL or ORM,React Server Components,next.js采用

/app/lib/data.ts

```tsx
import { sql } from '@vercel/postgres';
```

## 7.2 nextjs获取数据

/app/lib/data.ts

```tsx
import { sql } from '@vercel/postgres';

export async function fetchRevenue() {
 try {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)

  console.log("Fetching revenue data...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await sql<Revenue>`SELECT * FROM revenue`;

  console.log("Data fetch completed after 3 seconds.");

  return data.rows;
 } catch (error) {
  console.error("Database Error:", error);
  throw new Error("Failed to fetch revenue data.");
 }
}
```

/app/dashboard/page.tsx
> page.tsx是一个async组件，允许使用await来获取数据

```tsx
import { fetchRevenue } from '@/app/lib/data';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  // ...
}
```

### 7.2.1 获取数据长度使用sql的count(*)

```ts
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
```

### 7.2.2 request waterfall

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fsequential-parallel-data-fetching.png&w=1920&q=75)

```tsx
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

### 7.2.3 Parallel data fetching

```ts
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
 
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // ...
  }
}
```
