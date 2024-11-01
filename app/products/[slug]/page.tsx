'use client';

import { useState, useEffect, use } from 'react';
import products from './../../data/products.json'; // Adjust the path as needed
import { useCart } from '../../context/CartContext'; // Adjust the path to your CartContext

const ProductPage = ({ params }: { params: { slug: string } }) => {
    const unwrappedParams = use(params);
    const productSlug = unwrappedParams.slug; // Get the ID from params
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, removeFromCart, getItemQuantity } = useCart();

    useEffect(() => {
        const foundProduct = products.find(p => p.slug === productSlug);
        setProduct(foundProduct);
    }, [productSlug]);

    if (!product) return <p>Loading...</p>;

    const discountedPrice = product.discount
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : product.price;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const cartQuantity = getItemQuantity(product.id);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-lg mb-4" />
            <p className="text-lg mb-4">{product.description}</p>

            {product.longDescription && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                    <p className="text-lg">{product.longDescription}</p>
                </div>
            )}

            {product.allergens && product.allergens.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Allergens</h2>
                    <div className="text-md text-custom-secondary-text uppercase font-bold">
                        {product.allergens.map((allergen: string, index: number) => (
                            <p key={index}>{allergen}</p>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-4">
                {product.discount > 0 ? (
                    <>
                        <p className="text-lg font-bold mb-2">${discountedPrice}</p>
                        <p className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
                    </>
                ) : (
                    <p className="text-lg font-bold">${product.price}</p>
                )}
            </div>

            {cartQuantity > 0 && (
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => removeFromCart(product.id, false)}
                        className="inline-block bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
                    >
                        -
                    </button>
                    <span className="text-lg font-bold">{cartQuantity}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="inline-block bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg ml-2"
                    >
                        +
                    </button>
                </div>
            )}
            {cartQuantity < 1 && (
                <button
                    onClick={handleAddToCart}
                    className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4"
                >
                    Add to Cart
                </button>
            )}
            
            <button
                onClick={() => window.history.back()}
                className="inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
                Back
            </button>
        </div>
    );
};

export default ProductPage;
