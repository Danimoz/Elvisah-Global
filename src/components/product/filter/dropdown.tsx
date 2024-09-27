'use client';

import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { Category } from '@prisma/client';
import FilterItem from "./item";

export default function FilterDropdown({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [active, setActive] = useState('');
  
  useEffect(() => {
    const category = searchParams.get('category');
    setActive(category || '' );
  }, [searchParams])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [searchParams])

  return (
    <div className='relative' ref={ref}>
      <div onClick={() => setOpenSelect(!openSelect)} className="flex w-full items-center justify-between px-4 py-2 rounded-lg border border-black/30">
        <div>{active}</div>
        <LuChevronDown size={20} />
      </div>
      {openSelect && (
        <div 
          className='absolute z-40 bg-white w-full rounded-b-lg p-4 shadow-lg'
          onClick={() => setOpenSelect(false)}
        >
          {categories.map(category => (
            <FilterItem key={category.id} item={category} />
          ))}
        </div>
      )}
    </div>
  )
}