import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-[50vh] min-h-[300px]" style={{ backgroundImage: 'url("/images/carousel/carousel-1.jpg")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Bunblebee
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your one-stop shop for freshly baked goods. Taste the sweetness of our creations!
          </p>
          <a
            href="/products"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
