'use client';

import { useState, useEffect } from 'react';
// import axios from 'axios';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: null,
    discount: '',
    longDescription: '',
    allergens: '',
  });

  // useEffect(() => {
  //   // Fetch existing products
  //   axios.get('/api/products').then(response => setProducts(response.data));
  // }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission for adding/updating products
    const formData = new FormData();
    formData.append('id', form.id);
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('discount', form.discount);
    formData.append('longDescription', form.longDescription);
    formData.append('allergens', form.allergens);
    formData.append('image', form.image);

    // await axios.post('/api/products', formData);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('image', event.target.files[0]);
      // await axios.post('/api/upload', formData);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Products</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Price:
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </label>
        <label>
          Description:
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label>
          Discount:
          <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
        </label>
        <label>
          Long Description:
          <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
        </label>
        <label>
          Allergens (comma-separated):
          <input type="text" value={form.allergens} onChange={(e) => setForm({ ...form, allergens: e.target.value })} />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageUpload} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2 className="text-2xl font-semibold mt-6">Existing Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleDelete = async (id: number) => {
  // await axios.delete(`/api/products/${id}`);
  // Refresh the product list after deletion
};

export default AdminProductsPage;
