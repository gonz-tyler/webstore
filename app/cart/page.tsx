'use client';

import React from 'react';
import Head from 'next/head';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import Link from 'next/link';

const Cart = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  // Calculate the total price before discounts
  const calculateTotalBeforeDiscount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate the total price after discounts
  const calculateTotalAfterDiscount = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.discount 
        ? item.price * (1 - item.discount / 100) 
        : item.price;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  // Calculate the total amount saved
  const calculateTotalSaved = () => {
    return cart.reduce((total, item) => {
      if (item.discount) {
        const originalTotal = item.price * item.quantity;
        const discountedTotal = (item.price * (1 - item.discount / 100)) * item.quantity;
        return total + (originalTotal - discountedTotal);
      }
      return total;
    }, 0);
  };

  return (
    <>
      <Head>
        <title>Bunblebee - Cart</title>
        <meta name="description" content="Welcome to Bunblebee, your one-stop shop for freshly baked goods." />
      </Head>
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center mt-12">
            <span className="text-9xl inline-block align-middle py-10" role="img" aria-label="Bee">
            🐝
            </span>
            <br />
          <p className="text-2xl lg:text-3xl font-semibold mb-4">
            It looks like your cart is empty.
            <br />
            Why don't you check out the store and add some tasty treats to your cart? 
            <br />
            
          </p>
          <div className="mb-4">
          <Link href="/products">
            <button type="button" className="flex justify-center items-center max-w-sm w-full bg-custom-primary-text hover:bg-custom-accent focus:outline-none text-white text-2xl uppercase font-bold shadow-md rounded-full mx-auto p-5 transition">
              Start Shopping
            </button>
          </Link>
          </div>
        </div>

        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            <div className="flex-grow space-y-6">
              <ul className="space-y-4 text-custom-primary-text max-w-2xl">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col lg:flex-row items-center bg-white p-4 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-4"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 lg:w-16 lg:h-16 object-cover rounded-md flex-shrink-0"
                    />
                    
                    {/* Text Container */}
                    <div className="flex-grow flex flex-col lg:flex-row items-start lg:items-center lg:max-w-xs overflow-hidden">
                      <div className="flex-grow max-w-xs lg:max-w-xs overflow-hidden">
                        <h3 className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.discount ? (
                            <>
                              <span className="line-through text-red-600">${item.price.toFixed(2)}</span>
                              <span className="text-lg font-bold ml-2">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${item.price.toFixed(2)}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex flex-shrink-0 items-center space-x-3 lg:ml-auto">
                      <button
                        onClick={() => removeFromCart(item.id, false)}
                        className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-lg"
                      >
                        -
                      </button>
                      <p className="text-lg font-semibold">{item.quantity}</p>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Total Price and Remove All */}
                    <div className="flex flex-shrink-0 items-center space-x-3 mt-4 lg:mt-0 lg:ml-auto">
                      <div className="text-lg font-semibold">
                        ${Number(((item.price * item.quantity) - (item.discount ? (item.price * (item.discount / 100) * item.quantity) : 0)).toFixed(2))}
                        {item.discount > 0 && (
                          <span className="text-red-600 ml-2 text-sm line-through">
                            ${Number((item.price * item.quantity).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, true)} // Passing `true` to remove all instances
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        Remove All
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 lg:mt-0 lg:w-1/3">
              <div className="border-t pt-4 lg:border-none">
                <h3 className="text-2xl font-bold">Order Summary</h3>
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg">Total (Before Discount):</span>
                  <p className="text-lg font-bold">${calculateTotalBeforeDiscount().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg">You Save:</span>
                  <p className="text-2xl font-bold text-green-600">${calculateTotalSaved().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-bold">Total:</span>
                  <p className="text-2xl font-bold">${calculateTotalAfterDiscount().toFixed(2)}</p>
                </div>
                <button
                  onClick={() => alert('Proceed to checkout')}
                  className="mt-4 w-full bg-custom-accent hover:bg-custom-accent-alternate text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Checkout
                </button>
                <p className="mt-4">
                  or{' '}
                  <a
                    href="/products"
                    className="text-lg text-custom-primary-text hover:text-custom-accent transition-colors"
                  >
                    Continue Shopping<span aria-hidden="true"> →</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
