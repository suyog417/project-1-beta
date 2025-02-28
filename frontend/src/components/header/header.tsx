"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get2Learn", href: "/get2learn" },
  ]

  return (
    <header className="bg-[#00415f] shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <img src="/assets/get2act_logo.png" alt="logo" width={150}/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              item.name == "Get2Learn" ? 
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold text-white hover:opacity-80 transition-opacity bg-white px-3 py-1.5 rounded-lg"
              >
                <span className="text-[#d7152f]"> Get</span><span className="text-[#e39e0f]">2</span><span className="text-[#517e23]">Learn</span>
              </Link> : <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white hover:opacity-80 transition-opacity"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-lg font-medium text-white hover:bg-[#003349]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

