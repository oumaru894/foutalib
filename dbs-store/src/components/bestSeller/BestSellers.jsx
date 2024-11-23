import React from 'react';
import './BestSellers.css';
import Products from '../../hooks/Productcall';
import Card from '../Card/Card';

const BestSellers = () => {
  const { productData, isLoading, error } = Products();

  if (isLoading) {
    return (
      <div className="loading-container container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container container">
        <p>Error: {"Network Error"}</p>
      </div>
    );
  }

  return (
    <>
    {productData && productData.length > 0 ? (
          <Card items={productData} />
        ) : (
          <p>No products available</p>
        )}
    </>
  );
};

export default BestSellers;
