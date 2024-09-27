'use client';

import { useSearchParams } from "next/navigation";
import { Category } from '@prisma/client'
import Link from "next/link";

interface FilterItemProps {
  item: Category
}

export default function FilterItem({ item }: FilterItemProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const active = category === item.name
  const DynamicTag = active ? 'span' : Link

  return (
    <li className="mt-1">
      <DynamicTag 
        href={`/product?category=${item.name}`} 
        className={`hover:underline ${active ? 'font-semibold underline underline-offset-4' : ''}`}
      >
        {item.name}
      </DynamicTag>
    </li>
  )
}
