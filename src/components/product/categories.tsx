
import { Suspense } from "react";
import { getCategories } from "@/lib/fetchUtility";
import clsx from "clsx";
import FilterItem from "./filter/item";
import FilterDropdown from "./filter/dropdown";

export default async function Categories(){
  const categories = await getCategories();

  const skeletonCss = 'w-5/6 h-4 mb-3 animate-pulse rounded-full';

  return (
    <Suspense fallback={
      <div className="col-span-2 hidden w-full flex-none md:block">
        <div className={clsx(skeletonCss, 'bg-neutral-800')} />
        <div className={clsx(skeletonCss, 'bg-neutral-800')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
        <div className={clsx(skeletonCss, 'bg-neutral-400')} />
      </div>
    }>
      <>
        <nav>
          <h4 className="hidden md:block text-xs font-semibold">Categories</h4>
          <ul className="hidden md:block">
            <Suspense fallback={<p>Loading...</p>}>
              {categories.map(category => (
                <FilterItem item={category} />
              ))}
            </Suspense>
          </ul>
          <ul className="md:hidden">
            <Suspense fallback={<p>Loading...</p>}>
              <FilterDropdown categories={categories} />
            </Suspense>
          </ul>
        </nav>
      </>      
    </Suspense>
  )
}