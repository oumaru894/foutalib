import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';
import { IoMdAddCircle } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImageURL, mainImageURI, singleProductURL } from '../../components/assets/constants/Urls/Url';
import AddToCart from '../../hooks/addCart';
import { handleAddToCart } from '../../hooks/handleAddToCart';


const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${singleProductURL}${id}`);
        const imagesRes = await axios.get(`${ImageURL}${id}`);

        setProduct(response.data);
        if (imagesRes.data.images && imagesRes.data.images.length > 0) {
          setImages(imagesRes.data.images);
          setSelectedImage(imagesRes.data.images[0]);
        }
        setIsLoading(false);
      } catch (error) {
        //console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  
  // handle buy now
  const handleBuyNow = () => {
    handleAddToCart({product}).then(()=>navigate('/checkout'))
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const setQuantity_ = (quantity)=>{
    if (quantity>0){
      setQuantity(quantity)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <img src={`${mainImageURI}${selectedImage}/${product.id}`} className="img-fluid main-image" alt={product.product_name} />
          <div className="image-gallery mt-2">
            {images && images.map((image, index) => (
              <img
                key={index}
                src={`${mainImageURI}${image}/${product.id}`}
                className="img-thumbnail gallery-image me-2"
                alt={`View ${index + 1}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="text-success">${product.price}</h4>

          {/* Product Description with Show More */}
          <p className='product-description'>
            {showFullDescription ? product.description : `${product.description.slice(0, 100)}...`}
            <button className="btn btn-link" onClick={() => setShowFullDescription(!showFullDescription)}>
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          </p>

          {/* Quantity Selector */}
          <div className="form-group mb-3">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity_(Number(e.target.value))}
              min="1"
            />
          </div>

          <div className="fixed-buttons-container">
            <AddToCart product={product} quantity={quantity} images={images} />
            
              <button className="btn btn-success buy" onClick={()=>
                handleBuyNow()
              }>Buy Now</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
