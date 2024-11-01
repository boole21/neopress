# 第9章 流

## 9.1 使用loading.tsx传输整个页面

/app/dashboard/loading.tsx

```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

## 9.2 添加加载骨架

- loading.tsx在文件系统中的级别高于/invoices/page.tsx和/customers/page.tsx，因此它也适用于这些页面.所以把loading.tsx和page.tsx文件移动到文件夹(overview)中
- 当你使用圆括号（）创建一个新文件夹时，文件夹的名称不会包含在URL路径中。所以 /dashboard/(overview)/page.tsx 变成了/dashboard

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Froute-group.png&w=1920&q=75)

## 9.3 流式传输组件Suspense

/app/dashboard/(overview)/page.tsx

```tsx
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

## 9.3.1 组元件

/app/dashboard/page.tsx

```tsx
import CardWrapper from '@/app/ui/dashboard/cards';
// ...
import {
  CardsSkeleton,
} from '@/app/ui/skeletons';
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      // ...
    </main>
  );
}
```

/app/ui/dashboard/cards.tsx

```tsx
// ...
import { fetchCardData } from '@/app/lib/data';
 
// ...
 
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```

## 9.3.2 决定在哪里放置Suspense boundaries

> 一般来说，将数据提取向下移动到需要它的组件，然后将这些组件包装在Suspense中，这是一个很好的做法。
