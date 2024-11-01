# 第2章 CSS样式

## 2.1  Global styles

/app/layout.tsx

```tsx
import '@/app/ui/global.css'
```

## 2.2 tailwindcss

/app/ui/global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

/app/page.tsx

```tsx
<div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
```

## 2.2 Css Modules

/app/page.tsx

```tsx
import styles from '@/app/ui/home.module.css'
<div className={styles.shape} />
```

## 2.3 clsx

```bash
npm i clsx
```

```tsx
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```
