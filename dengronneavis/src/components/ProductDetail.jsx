import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProductDetail = () => {
  const { slug } = useParams(); // Get the product slug from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:4242/products/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Price:</strong> {product.price} USD</p>
      <p><strong>Description:</strong> {product.description}</p>
      
      <Link to="/pages/Product">Back to Products</Link>
    </div>
  );
};

