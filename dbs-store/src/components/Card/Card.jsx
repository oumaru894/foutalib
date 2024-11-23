import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css';
import { IoMdAddCircle, IoMdHeart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { mainImageURI } from '../assets/constants/Urls/Url';
import useCart from '../../hooks/cartCall';
import getCartSessionId from '../../hooks/getCartSessionId';
import axios from 'axios';
import AddToCart from '../../hooks/addCart';
import { handleAddToCart } from '../../hooks/handleAddToCart'
import {handleAddToFavorites} from '../../hooks/handleAddFav'




const Card = ({ items, category }) => {
  const { cartData, error, isLoading } = useCart();
  const [displayItems, setDisplayItems] = useState([]);
  const navigate = useNavigate();

  const shuffleItems = (array) => array.sort(() => Math.random() - 0.5);

  const handleAddCart = async (item) => {
    try {
      await handleAddToCart({
        product: item,
        quantity: 1,
        
      });
      //console.log(`${item.name} added to cart`);
    } catch (error) {
      //console.error("Error adding item to cart:", error);
    }
  };



  
  useEffect(() => {
    if (category) {
      const filteredItems = items.filter(item => item.category === category);
      setDisplayItems(filteredItems);
    } else {
      setDisplayItems(shuffleItems([...items]));
    }
  }, [category, items]);

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
    } else {
      //console.error("Invalid product ID: ", id);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {displayItems.map(item => (
          <div className="col col-4 col-6" key={item.id}>
            <div
              className="card h-100"
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={`${mainImageURI}${String(item.id + "_" + 0)}/${item.id}`} 
                className="card-img-top img-fluid" 
                alt={item.product_name} 
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text">{`$${item.price} USD`}</p>

                  <div 
                    className="cart-wrapper" 
                  >
                    <IoMdHeart onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites({product:item})

                    }}
                    
                    className='fav-icon'
                    size={40}
                    />

                    <IoMdAddCircle
                      className="add-icon"
                      size={40}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCart(item);
                        //console.log(item)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
