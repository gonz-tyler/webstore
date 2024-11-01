'use client';

import React from 'react';
import { useCart } from '../app/context/CartContext';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  discount: number;
  banner: string;
  longDescription: string;
  allergens: string[];
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Calculate the discounted price
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');


  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden group max-w-xs">
      <Link href={`/products/${product.slug}`}>
      {/* Diagonal Banner */}
      {product.banner && (
        <div
          className="absolute bg-blue-600 text-white text-xs font-bold py-1"
          style={{
            top: '20px',
            right: '-65%', // Adjust this value based on your needs
            width: '150%', // Adjust this value to ensure the text is always centered
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            textAlign: 'center',
          }}
        >
          {product.banner}
        </div>
      )}



      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {quantityInCart > 0 && (
        <div className="absolute top-40 right-4 bg-custom-accent-alternate text-white text-xs font-bold px-2 py-1 rounded-full">
          {quantityInCart}
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-custom-primary-text mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold mb-2">
          ${discountedPrice.toFixed(2)}
          {product.discount > 0 && (
            <span className="text-red-600 ml-2 text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 right-4 bg-custom-accent hover:bg-custom-accent-alternate text-white font-semibold py-2 px-4 rounded-lg transition-opacity opacity-100 group-hover:opacity-100 md:opacity-100"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
