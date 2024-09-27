import Link from "next/link"


export default function Sidebar() {
  const sidebarLinks = [
    { name: 'Dashboard', link: '/admin' },
    { name: 'Products', link: '/admin/products' },
    { name: 'Orders', link: '/admin/orders' },
  ]
   
  return (
    <div className="bg-gray-800 md:h-screen text-white w-full md:w-1/4 flex flex-col rounded-tr-3xl p-2 md:p-4">
      <div className="flex-grow mt-6">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.link} className="py-4 block hover:bg-green-600 hover:px-4 hover:rounded-3xl">{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}