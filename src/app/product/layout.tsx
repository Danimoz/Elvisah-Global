import Categories from "@/components/product/categories";


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-screen-2xl flex flex-col md:flex-row gap-8 ">
      <section className="w-full md:max-w-[125px] mt-4">
        <Categories />
      </section>

      <section className="flex-1">
        {children}
      </section>
    </main>
  )
}