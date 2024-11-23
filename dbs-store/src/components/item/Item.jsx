import React from 'react';
import './Item.css';

export const Item = (props) => {
  return (
    <div className="item-card">
      <img src={props.image} alt={props.name} className="img-fluid item-image" />
      <h5 className="item-name">{props.name}</h5>
      <div className="price-container">
        <div className="new-price">{props.new_price}</div>
        <div className="old-price text-muted"><s>{props.old_price}</s></div>
      </div>
    </div>
  );
};
