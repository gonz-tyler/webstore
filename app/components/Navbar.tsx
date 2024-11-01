'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../app/context/CartContext';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  // const [cartItemCount, setCartItemCount] = useState(0); // State to track cart items
  const navRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        const isOverflowing = navRef.current.scrollWidth > navRef.current.clientWidth;
        setIsMobileView(isOverflowing);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  

  return (
    <header className="bg-custom-primary1 shadow-md sticky top-0 z-50">
      <div className="relative container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-6xl font-bold text-custom-primary-text hover:text-custom-accent transition-colors">
            bunblebee
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-10">
          <Link href="/" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
            Products
          </Link>
          <Link href="/#about" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
            About
          </Link>
          <Link href="/#contact" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* <button type="button" className="text-custom-primary-text hover:text-custom-accent focus:outline-none transition-colors">
            <i className="bi bi-search text-2xl"></i>
          </button> */}

          <Link
            href="/cart"
            className="p-2 flex items-center space-x-2 text-custom-primary-text hover:text-custom-accent focus:outline-none transition-colors"
          >
            {cartItemCount > 0 && (
              <span className="rounded-md bg-custom-accent px-[0.85em] py-[0.6em] text-[0.6rem] font-bold leading-none text-white">
                {cartItemCount}
              </span>
            )}
            <i className="bi bi-cart2 text-2xl"></i>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center relative z-50 group">
          <button className="focus:outline-none" onClick={toggleMobileMenu}>
            <div className="space-y-1">
              <div
                className={`w-6 h-1 bg-custom-primary-text transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                } group-hover:bg-yellow-500`}
              ></div>
              <div
                className={`w-6 h-1 bg-custom-primary-text transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                } group-hover:bg-yellow-500`}
              ></div>
              <div
                className={`w-6 h-1 bg-custom-primary-text transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                } group-hover:bg-yellow-500`}
              ></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-95 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out flex justify-center items-center`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link
            href="/"
            className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors"
            onClick={closeMobileMenu}
          >
            Products
          </Link>
          <Link
            href="/#about"
            className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors"
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <div className="flex items-center space-x-4">
            {/* <button
              type="button"
              className="text-custom-primary-text hover:text-custom-accent focus:outline-none transition-colors"
              onClick={closeMobileMenu}
            >
              <i className="bi bi-search text-2xl"></i>
            </button> */}

            <Link
              href="/cart"
              className="p-2 flex items-center space-x-2 text-custom-primary-text hover:text-custom-accent focus:outline-none transition-colors"
              onClick={closeMobileMenu}
            >
              {cartItemCount > 0 && (
                <span className="rounded-md bg-custom-accent px-[0.85em] py-[0.6em] text-[0.6rem] font-bold leading-none text-white">
                  {cartItemCount}
                </span>
              )}
              <i className="bi bi-cart2 text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
