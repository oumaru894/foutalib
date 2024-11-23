import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { mainImageURI, updateCart, deleteCart } from '../components/assets/constants/Urls/Url';
import axios from 'axios';
import useCart from '../hooks/cartCall';
import getCartSessionId from '../hooks/getCartSessionId';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

const Cart = () => {
  const navigate = useNavigate();
  const { cartData, error, isLoading } = useCart();

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    setCartItem(cartData);
    //console.log("cart:", cartData);
  }, [cartData]);

  const onUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const id = JSON.parse(localStorage.getItem("id"));
      if (id) {
        const res = await axios.put(`${updateCart}${itemId}`, { quantity: newQuantity });
        if (res.status === 200) {
          const updatedCart = cartItem.map((item) =>
            item.cart_id === itemId ? { ...item, quantity: newQuantity } : item
          );
          setCartItem(updatedCart);
        }
      } else {
        const cartId = getCartSessionId();
        const cart = JSON.parse(localStorage.getItem(cartId)) || [];
        const updatedCart = cart.map((item) => (
          item.cart_id === itemId ? { ...item, quantity: newQuantity } : item
        ));
        localStorage.setItem(cartId, JSON.stringify(updatedCart));
        setCartItem(updatedCart);
      }
    } catch (error) {
      
    }
  };

  const onDeleteItem = async (itemId) => {
    try {
      const id = JSON.parse(localStorage.getItem("id"));
      if (id) {
        const res = await axios.delete(`${deleteCart}${itemId}`);
        if (res.status === 200) {
          const updatedCart = cartItem.filter((item) => item.cart_id !== itemId);
          setCartItem(updatedCart);
        }
      } else {
        const cartId = getCartSessionId();
        const cart = JSON.parse(localStorage.getItem(cartId)) || [];
        const updatedCart = cart.filter((item) => item.cart_id !== itemId);
        localStorage.setItem(cartId, JSON.stringify(updatedCart));
        setCartItem(updatedCart);
      }
    } catch (error) {
      //console.error('Cart delete error:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItem?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="container mt-4">
      <div className="col">
        <h2>Your Cart</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>No item in cart</div>
        ) : cartItem && cartItem.length > 0 ? (
          cartItem.map((item) => (
            <div className="col-12 mb-3" key={item.id}>
              <div className="card d-flex flex-row flex-wrap position-relative">
                <img
                  src={`${mainImageURI}${String(item.product_id + "_" + 0)}/${item.product_id}`}
                  className="card-img-top"
                  alt={item.product_name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <FaTrashAlt
                  className="delete-icon" // Class for positioning the delete icon
                  onClick={() => onDeleteItem(item.cart_id)}
                />
                <div className="card-body d-flex justify-content-between align-items-center flex-fill">
                  <div className="w-50">
                    <h5 className="card-title">{item.product_name}</h5>
                    <p className="card-text">${item.price.toFixed(2)}</p>
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.cart_id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            onUpdateQuantity(item.cart_id, value);
                          }
                        }}
                        min="1"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.cart_id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <h5 className="card-title">${(item.price * item.quantity).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cartItem && cartItem.length > 0 && (
          <div className="mt-4">
            <h3>Cart Total</h3>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <h4>Total: ${subtotal.toFixed(2)}</h4>
            <button
              className="btn btn-primary btn-lg mt-3"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
