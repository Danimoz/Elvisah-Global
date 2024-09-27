import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {products.map(product => (
        <Card key={product.id}>
          <div className="relative group overflow-hidden rounded-lg h-[400px]">
            <Link href={`/store/${product.slug}`} className="absolute inset-0 z-10" />
            <Image
              alt={product.name}
              src={product.image!}
              className="w-full h-full rounded-xl object-cover group-hover:scale-90 transition-transform"
              width={400}
              height={400}
              style={{ aspectRatio: '400/400', objectFit: 'cover' }}
            />
            <div className="border-t rounded-b-lg border-gray-200 dark:border-gray-800" />
          </div>
          <CardContent className='p-0 m-0 border-0'>
            <div className="space-y-2 px-4 py-2">
              <CardTitle className='p-2 border-b border-gray-200'>{product.name}</CardTitle>
              <h2 className="font-bold tracking-wider">₦ {product.price.toLocaleString()}</h2>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}