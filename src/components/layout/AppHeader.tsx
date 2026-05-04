'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/share', label: 'Share a Pet' },
]

const authNavLinks = [
  { href: '/favorites', label: 'Favorites' },
]

export default function AppHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-pampas-dark shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl select-none">🐾</span>
          <span className="font-heading text-lg font-semibold text-gray-800 hidden sm:block">
            Codex Pet Share
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-crail border-b-2 border-crail pb-0.5'
                  : 'text-gray-600 hover:text-crail'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <SignedIn>
            {authNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-crail border-b-2 border-crail pb-0.5'
                    : 'text-gray-600 hover:text-crail'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium px-4 py-1.5 rounded-full border border-crail text-crail hover:bg-crail hover:text-white transition-colors">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile right: auth + hamburger */}
        <div className="sm:hidden flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium px-3 py-1 rounded-full border border-crail text-crail hover:bg-crail hover:text-white transition-colors">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <button
            className="p-2 rounded text-gray-600 hover:text-crail"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="sm:hidden border-t border-pampas-dark bg-white px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.href ? 'text-crail' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <SignedIn>
            {authNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href ? 'text-crail' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>
        </nav>
      )}
    </header>
  )
}
