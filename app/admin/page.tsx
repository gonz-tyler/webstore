'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: '',
    slug: '',
    price: '',
    description: '',
    discount: '',
    banner: '',
    longDescription: '',
    allergens: [],
    image: '', // Add image to newProduct state
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [image, setImage] = useState(null); // For handling image upload
  const [allergens] = useState(['eggs', 'nuts', 'dairy', 'gluten']); // Example allergens
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      // If there's no image, default it to an empty string
      image: product.image || '', 
    });
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    const highestId = Math.max(...products.map(p => p.id), 0);
    setNewProduct({
      id: highestId + 1,
      name: '',
      slug: '',
      price: parseFloat(''),
      description: '',
      discount: '',
      banner: '',
      longDescription: '',
      allergens: [], // Reset allergens for a new product
      image: '', // Ensure the image is reset for new products
    });
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    const formattedPrice = parseFloat(newProduct.price).toFixed(2);

    const productData = {
      ...newProduct,
      slug: generateSlug(newProduct.name),
      price: parseFloat(formattedPrice),
    };

    if (editingProduct) {
      await fetch(`/api/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      setProducts(products.map((product) => (product.id === editingProduct.id ? productData : product)));
    } else {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
    }

    setModalOpen(false);
  };

  const getHighestProductId = () => {
    return Math.max(...products.map(p => p.id), 0);
  };
  
  const handleImageUpload = async () => {
    // Check if a new image has been selected and if the newProduct has an ID
    if (image && newProduct.id) {
      // Check if editing a product and if it has an existing image
      if (editingProduct && editingProduct.image && editingProduct.image !== newProduct.image) {
        // Only delete the old image if a new one is uploaded and it's different from the old one
        const deleteResponse = await fetch(`/api/delete-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: editingProduct.image, // Pass the old image URL to be deleted
          }),
        });
  
        if (!deleteResponse.ok) {
          console.error('Failed to delete old image');
          return;
        }
      }
  
      // Upload the new image
      const formData = new FormData();
      formData.append('file', image);
      formData.append('id', newProduct.id.toString()); // Use newProduct.id for the ID
  
      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
  
      if (uploadResponse.ok) {
        // Construct the new image URL based on product ID
        const imageUrl = `/images/products/product-${newProduct.id}.jpg`;
  
        // Update the image URL in newProduct state
        setNewProduct({
          ...newProduct,
          image: imageUrl, // Set the new image URL
        });
        setImage(null);
      } else {
        console.error('Image upload failed');
      }
    }
  };
  
  
  // Automatically trigger image upload when a new file is selected
  const handleImageSelection = (e) => {
    setImage(e.target.files[0]);
    handleImageUpload(); // Trigger upload immediately after selecting the image
  };
  

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return; // If the user clicks "Cancel", do nothing
  
    await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
  
    setProducts(products.filter((product) => product.id !== id));
  };
  

  const handleAllergenChange = (allergen) => {
    setNewProduct(prevProduct => {
      const allergens = prevProduct.allergens.includes(allergen)
        ? prevProduct.allergens.filter(a => a !== allergen)
        : [...prevProduct.allergens, allergen];

      return { ...prevProduct, allergens };
    });
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Page</h1>
      <button
        onClick={handleCreateNew}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create New Product
      </button>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <ul>
            {products.map((product) => (
              <li key={product.id} className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-lg">
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            {/* Image Preview */}
            <div className="mb-4">
              {newProduct.image ? (
                <img
                  src={newProduct.image}
                  alt="Product"
                  className="w-full h-auto max-h-64 object-cover mb-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5.25v13.5M5.25 12h13.5"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({
                ...newProduct,
                name: e.target.value,
                slug: generateSlug(e.target.value),
              })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              readOnly
              value={newProduct.slug}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-200"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Short Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Discount (optional)"
              value={newProduct.discount}
              onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newProduct.banner}
              onChange={(e) => setNewProduct({ ...newProduct, banner: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Banner</option>
              <option value="new">New</option>
              <option value="bestseller">Bestseller</option>
            </select>
            <textarea
              placeholder="Long Description"
              value={newProduct.longDescription}
              onChange={(e) => setNewProduct({ ...newProduct, longDescription: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Allergen Checkbox Section */}
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Allergens:</label>
              {allergens.map((allergen) => (
                <label key={allergen} className="block">
                  <input
                    type="checkbox"
                    checked={newProduct.allergens.includes(allergen)}
                    onChange={() => handleAllergenChange(allergen)}
                    className="mr-2"
                  />
                  {allergen}
                </label>
              ))}
            </div>

            {/* Image Preview or Placeholder */}
            {/* <div className="mb-4">
              {newProduct.image ? (
                <img
                  src={newProduct.image}
                  alt="Product Image"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M14.31 8l5.74 9H3.95l5.74-9z"></path>
                  </svg>
                </div>
              )}
            </div>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full mb-4"
            /> */}
            <button
              onClick={handleImageUpload}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            >
              Upload Image
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
