'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link href="/admin/products" className="bg-blue-500 text-white px-4 py-2 rounded">
          Manage Products
        </Link>
        <button
          onClick={() => router.push('/admin/signout')} // Implement sign out logic
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
