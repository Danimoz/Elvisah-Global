'use client';

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import CartDisplay from "./cart/cartDisplay";
import CartIcon from "./cart/cartIcon";
import { useCart } from "./cart/cartProvider";
import Search from "./search";

const navbarLinks = [
  { name: 'Home', link: '/'},
  { name: 'Shop', link: '/product'},
  { name: 'Orders', link: '/orders'},
  { name: 'Contact', link: '/contact'},
]


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCartOpen, closeCart, openCart } = useCart();

  return (
    <header className="w-full top-0 sticky z-50 bg-white">
      <nav className="px-8 mx-auto flex h-16 md:h-20 items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">Elvisah Global</h1>
        </div>

        <div className="hidden md:flex space-x-6">
          {navbarLinks.map((link) => (
            <Link key={link.name} href={link.link} className="p-3 uppercase">{link.name}</Link>
          ))}
        </div>

        <div className="hidden md:flex space-x-6 justify-center items-center">
          <Search />
          <Sheet open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
            <SheetTrigger>
              <CartIcon />
            </SheetTrigger>
            <SheetContent>
              <CartDisplay />
            </SheetContent>
          </Sheet>
        </div>

        <div className="md:hidden">
          <button onClick={()=> setIsMenuOpen(!isMenuOpen)}>
            <Image src='/images/icons/menu.svg' alt='Menubar Toggle' width={30} height={30} priority />
          </button>
        </div>
      </nav>

      <div className={isMenuOpen ? 'w-full' : 'hidden'}>
        {navbarLinks.map((link) => (
          <Link key={link.name} href={link.link} className="p-3 uppercase block">{link.name}</Link>
        ))}

        <div className="flex space-x-6 justify-center items-center py-2">
          <Search />
          <Sheet open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
            <SheetTrigger>
              <CartIcon />
            </SheetTrigger>
            <SheetContent>
              <CartDisplay />
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}