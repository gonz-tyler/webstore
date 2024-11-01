'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use router for redirection

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // For programmatic navigation

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Basic mock authentication logic
    // Replace this with actual authentication logic
    if (email === 'admin@example.com' && password === 'adminpassword') {
      // On successful login, redirect to admin dashboard
      router.push('/admin/dashboard'); // Redirect to the admin dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignInPage;
