import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './ProductDetail.css'; // Create a CSS file for additional styling
import { IoMdAddCircle } from "react-icons/io";

const ProductDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <img src={selectedImage} className="img-fluid main-image" alt={product.name} />
          <div className="image-gallery mt-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="img-thumbnail gallery-image"
                alt={`View ${index + 1}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4>{product.price}</h4>
          <p>{product.description}</p>

          {/* Size Options */}
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <select className="form-control" id="size">
              {product.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Color Options */}
          <div className="form-group">
            <label htmlFor="color">Color:</label>
            <select className="form-control" id="color">
              {product.colors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          {/* Call to Action Buttons */}
          <button className="btn btn-primary mr-2">Add to Cart</button>
          <button className="btn btn-success">Buy Now</button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-4">
        <h3>Customer Reviews</h3>
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map((review) => (
            <div key={review.id} className="review mb-2 p-2 border">
              <div className="review-rating">Rating: {review.rating} ★</div>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
