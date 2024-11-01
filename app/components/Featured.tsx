'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../app/context/CartContext';
import products from "../data/products.json";

const productIds = [17, 2, 3];

const FeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState(null); // Track the product that was added to the cart

  useEffect(() => {
    const filteredProducts = products.filter(product => productIds.includes(product.id));
    setFeaturedProducts(filteredProducts);
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
      <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl"
          >
            <div className="relative p-5 bg-white rounded-sm">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />

              {/* Product Name */}
              <h3 className="font-semibold leading-5 text-lg mb-2 text-gray-900">
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="mb-2 text-sm text-gray-700">{product.description}</p>

              {/* Product Price */}
              <div className="flex items-center justify-between mt-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">
                      ${((product.price * (1 - product.discount / 100)).toFixed(2))}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Link to Product Page */}
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 mt-4"
              >
                View Product
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-4 right-4 bg-custom-accent hover:bg-custom-accent-alternate text-white font-semibold py-2 px-4 rounded-lg transition-opacity opacity-100 group-hover:opacity-100"
              >
                {addedProductId === product.id ? (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-white mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Added
                  </div>
                ) : (
                  "Add to Cart"
                )}
              </button>

              {/* Animated Feedback */}
              {addedProductId === product.id && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-500 transform translate-y-0 opacity-100">
                  Added to Cart!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
