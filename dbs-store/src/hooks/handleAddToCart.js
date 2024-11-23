import axios from 'axios';
import { addCartURL } from '../components/assets/constants/Urls/Url';
import getCartSessionId from '../hooks/getCartSessionId';
import { v4 as uuidv4 } from 'uuid';

const handleAddToCart = async ({ product, quantity=1,  }) => {
  const userId = JSON.parse(localStorage.getItem('id'));

  if (userId) {
    try {
      await axios.post(addCartURL, {
        product_name: product.name,
        price: product.price,
        quantity,
        total_price: product.price * quantity,
        product_id: product.id,
        
        client_id: userId,
      });
      //console.log("Added to cart (server)");
    } catch (error) {
      //console.error("Error adding to cart (server):", error);
    }
  } else {
    const cartId = getCartSessionId();
    let cartItems = JSON.parse(localStorage.getItem(cartId)) || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    const existingItemIndex = cartItems.findIndex(item => item.product_id === product.id);

    if (existingItemIndex !== -1) {
      alert("item already exists in cart");
    } else {
      const newItem = {
        cart_id: uuidv4(),
        product_name: product.name,
        price: product.price,
        quantity,
        total_price: product.price * quantity,
        product_id: product.id,
        
      };
      cartItems.push(newItem);
    }

    localStorage.setItem(cartId, JSON.stringify(cartItems));
    //console.log("Added to cart (local storage)");
  }
};

export { handleAddToCart };
