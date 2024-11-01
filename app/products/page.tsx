'use client'

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import products from '../../data/products.json';
import Head from 'next/head';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Add search state
  const productsPerPage = 12;

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous and next page change
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Bunblebee - Products</title>
        <meta name="description" content="Welcome to Bunblebee, your one-stop shop for freshly baked goods." />
      </Head>
      <div className="container mx-auto p-4 bg-gray-50 shadow-lg rounded-lg mt-12 mb-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-custom-primary-text">
          Our Products
        </h2>
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page after search
            }}
            className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:ring-custom-accent focus:border-custom-accent"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-custom-accent hover:underline disabled:text-gray-400"
              aria-label="Previous Page"
            >
              &larr; Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`text-custom-accent hover:underline ${currentPage === index + 1 ? 'font-bold' : ''}`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-custom-accent hover:underline disabled:text-gray-400"
              aria-label="Next Page"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
