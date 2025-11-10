"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LanguageCurrencySelector from './LanguageCurrencySelector';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-accent transition-colors">
            Latido Ancestral
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/esencia" className="hover:text-accent transition-colors">
                Nuestra Esencia
              </Link>
            </li>
            <li>
              <Link href="/colecciones" className="hover:text-accent transition-colors">
                Colecciones
              </Link>
            </li>
            <li>
              <Link href="/inspiracion" className="hover:text-accent transition-colors">
                Inspiración
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-accent transition-colors">
                Contacto
              </Link>
            </li>
          </ul>

          {/* Right Side Actions */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/esencia"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nuestra Esencia
              </Link>
            </li>
            <li>
              <Link
                href="/colecciones"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Colecciones
              </Link>
            </li>
            <li>
              <Link
                href="/inspiracion"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inspiración
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
            </ul>
            
            {/* Mobile Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-3">
                <Link href="/wishlist" className="relative p-2 hover:text-accent">
                  <FaHeart size={18} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/carrito" className="relative p-2 hover:text-accent">
                  <FaShoppingCart size={18} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link href="/perfil" className="p-2 hover:text-accent">
                  <FaUser size={18} />
                </Link>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Mobile Language/Currency - Simplified */}
            <div className="pt-2">
              <LanguageCurrencySelector />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
