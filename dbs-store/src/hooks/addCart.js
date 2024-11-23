import React from 'react';
import { handleAddToCart } from './handleAddToCart'; // Adjust the path as necessary

const AddToCart = ({ product, quantity, images }) => {
  const handleClick = () => {
    handleAddToCart({ product, quantity, images });
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
