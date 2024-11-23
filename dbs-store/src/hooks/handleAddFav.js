import { v4 as uuidv4 } from 'uuid';
import { addFavoriteUrl } from '../components/assets/constants/Urls/Url';
import axios from 'axios';

// Add to favorite function
const handleAddToFavorites = ({ product }) => {
  const clientId = JSON.parse(localStorage.getItem('id')); // Retrieve logged-in user ID
    //console.log("product", product)
  if (clientId) {
    // If user is logged in, add favorite to the server
    addToFavoriteServer(product, clientId);
  } else {
    // If no user ID, add favorite to localStorage
    const favoritesKey = 'guest_favorites';
    let localFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    // Check if the product already exists in the local favorites
    const existingFavoriteIndex = localFavorites.findIndex(
      (item) => item.product_id === product.id
    );

    if (existingFavoriteIndex !== -1) {
      alert("Product is already in your favorites!");
    } else {
      // Add the product as a new favorite
      
      const newFavorite = {
        favorite_id: uuidv4(), // Generate a unique ID
        product_name: product.name,
        price: product.price,
        image_url: product.image_1,
        product_id: product.id,
        vendor_id: product.vendor_id,
      };

      localFavorites.push(newFavorite);
      localStorage.setItem(favoritesKey, JSON.stringify(localFavorites));
      alert("Product added to your favorites. Log in to access your favorites across devices.");
    }
  }
};

// Add favorite to the server
const addToFavoriteServer = async (product, clientId) => {
  try {
    const response = await axios.post(`${addFavoriteUrl}/${clientId}`, {
      product_name: product.name,
      price: product.price,
      image_1: product.image_1,
      client_id: clientId,
      product_id: product.id,
    });
    //console.log(response.data.message);
    alert("Product added to your favorites!");
  } catch (error) {
    //console.error("Error adding to favorites:", error.response?.data || error.message);
  }
};
export{
    handleAddToFavorites
}
