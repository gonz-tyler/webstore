// app/layout.tsx

import React from 'react';
import Header from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';  // Ensure your global styles are imported
import "bootstrap-icons/font/bootstrap-icons.css"
import { CartProvider } from '../app/context/CartContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import type { Metadata } from 'next'


export const metadata = {
  title: 'Bunblebee',
  description: 'Your one-stop shop for freshly baked goods',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      
      {/* <CartProvider> */}
        <body className='flex flex-col min-h-screen'>
          <link
            href="https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap"
            rel="stylesheet"
          />
          <CartProvider>
          <Navbar />
          <main className='flex-grow bg-custom-background1 text-custom-primary-text'>{children}</main>
          <Footer />
          </CartProvider>
        </body>
      {/* </CartProvider> */}
    </html>
  );
};

export default RootLayout;
