import React from 'react';
import "./NewCollections.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { Item } from '../item/Item';

const newCollections = [
  { name: 'Smartphone', new_price: '$499', old_price: '$599', image: 'products/quamer.jpeg' },
  { name: 'Laptop', new_price: '$899', old_price: '$999', image: 'products/quamer.jpeg' },
  { name: 'Headphones', new_price: '$199', old_price: '$299', image: 'products/quamer.jpeg' },
];

const NewCollections = () => {
  return (
    <div className="container new-collections-section">
      <h1 className="text-center">NEW COLLECTIONS</h1>
      <hr className="mb-4" />
      <div className="row">
        {newCollections.map((product, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
            <Item 
              image={product.image} 
              name={product.name} 
              new_price={product.new_price} 
              old_price={product.old_price} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
