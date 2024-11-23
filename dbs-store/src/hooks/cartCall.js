// cartCall.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartURL } from '../components/assets/constants/Urls/Url';
import getCartSessionId from './getCartSessionId';

const useCart = () => { // Renamed to `useCart` to make it clear it's a custom hook
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const id = localStorage.getItem('id');
        const userId = JSON.parse(id);
        console.log("user_id", userId);

        if (userId) {
          const response = await axios.get(`${CartURL}${userId}`);
          setCartData(response.data); 
          /* console.log('====================================');
          console.log(response.data);
          console.log('===================================='); */
        } 
        else {
          
          const cartId = getCartSessionId()
          const _cart = localStorage.getItem(cartId)
          const cart = JSON.parse(_cart) || [];
          if (cart.length > 0) {
            setCartData(cart);
            /* console.log('====================================');
            console.log(cart);
            console.log('===================================='); */
          } else {
            setMessage("Cart is Empty");
          }
        }
      } catch (error) {
        //console.log("Error fetching cart:", error);

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  //console.log("Cart Data:", cartData); // Log cart data to confirm

  return { cartData, error, isLoading, message };
};

export default useCart;
