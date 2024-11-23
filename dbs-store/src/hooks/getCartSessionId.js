
const getCartSessionId = () => {
    // Check if there's already a cart ID in session storage
    let cartId = localStorage.getItem('cartId');
    
    if (!cartId) {
      // Generate a unique ID, e.g., based on timestamp and random number
      cartId = `cart_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      // Store the cart ID in session storage
      localStorage.setItem('cartId', cartId);
    }
  
    return cartId;
  };
  
  export default getCartSessionId;
  