import React,{createContext, useState} from 'react'
//import { cartItem } from '../assets/products/data'


export const CartContext = createContext(null)

const CartContextProvider = (props) => {
    const [cartItem, setCartItem] = useState([]);

    // Function to update the quantity of an item in the cart
  const updateCartItem = (itemId, newQuantity) => {
    setCartItem(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (

    <CartContext.Provider value={{cartItem,updateCartItem, setCartItem}}>
        {props.children}
    </CartContext.Provider>
    
  )
}

export default CartContextProvider