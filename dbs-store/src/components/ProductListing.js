// src/components/ProductListing.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ProductListing.css';

const products = [
  { id: 1, name: 'Smartphone', price: '$499', image: '/products/quamer.jpeg' },
  { id: 2, name: 'Laptop', price: '$899', image: '/products/Islamic.jpeg' },
  { id: 3, name: 'Headphones', price: '$199', image: '/products/Islamic.jpeg' },
  { id: 4, name: 'Camera', price: '$699', image: '/products/quamer.jpeg' },
  { id: 5, name: 'Smartwatch', price: '$199', image: '/products/quamer.jpeg' },
];

const ProductListing = () => {
  return (
    <section className="product-listing container mt-5">
      <h2 className="text-center">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-6 col-md-4 mb-4" key={product.id}>
            <div className="card">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="card-img-top" />
              </Link>
              <div className="card-body text-center">
                <h3 className="card-title">
                    {product.name}
                </h3>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-warning">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
