import React from 'react';
import HeroSection from '../components/Hero';
import ContactForm from '../components/ContactForm';
import Head from 'next/head';
import AboutSection from '../components/About';
import FeaturedSection from '../components/Featured';


const Home = () => {
  return (
    <>
      <Head>
        <title>Bunblebee - Home</title>
        <meta name="description" content="Welcome to Bunblebee, your one-stop shop for freshly baked goods." />
      </Head>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <ContactForm />
    </>
    
  );
};

export default Home;
