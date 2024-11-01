'use client';

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if honeypot field is filled
    if (formData.honeypot) {
      setStatusMessage('Spam detected.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Message submitted successfully!');
        setFormData({ name: '', email: '', message: '', honeypot: '' }); // Clear form
      } else {
        setStatusMessage('Failed to submit the message.');
      }
    } catch (error) {
      setStatusMessage('An error occurred.');
    }
  };

  return (
    <section id="contact" className="bg-custom-background1 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-custom-primary-text">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-custom-background2 p-8 rounded-lg shadow-md">
          <div className="hidden">
            <label htmlFor="honeypot" className="block text-lg font-medium text-custom-secondary-text mb-2">
              Don't fill this out if you're human:
            </label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="w-full p-3 bg-custom-neutral-light border border-custom-primary3 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-custom-secondary-text mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-3 bg-custom-neutral-light border border-custom-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-accent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-custom-secondary-text mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 bg-custom-neutral-light border border-custom-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-accent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-custom-secondary-text mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full p-3 bg-custom-neutral-light border border-custom-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-accent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-accent text-custom-primary-text py-3 px-4 rounded-lg hover:bg-custom-accent-alternate focus:outline-none focus:ring-2 focus:ring-custom-accent"
          >
            Send Message
          </button>
          {statusMessage && <p className="mt-4 text-center text-sm text-gray-500">{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
