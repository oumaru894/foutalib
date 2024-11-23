import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { favoriteUrl, favoriteDelete, mainImageURI } from '../components/assets/constants/Urls/Url';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon
import './Cart.css'
import { useNavigate } from 'react-router-dom';



const Favorite = () => {

    const navigate = useNavigate();
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState('');



    const getLocalFavorites = () => {
        const favoritesKey = 'guest_favorites';
        return JSON.parse(localStorage.getItem(favoritesKey)) || [];
      };

    useEffect(()=>{

        const getFavorite = async () => {
            setIsloading(true)
            try{

            const id = JSON.parse(localStorage.getItem('id'))
            if (id){
                const response = await axios.get(`${favoriteUrl}/${id}`)
                if (response.data){
                  if (Array.isArray(response.data)) {
                    setFavorite(response.data);
                } else if (response.data) {
                    setFavorite([response.data]); // Convert single item to an array
                }
                /* console.log('====================================');
                console.log(response.data);
                console.log('===================================='); */
                
                } 
            }
            else{
                // Example Usage:
                  const localFavorites = getLocalFavorites();
                  setFavorite(localFavorites)
                  //console.log("localFavorites", localFavorites);
                  
            }
        } catch(error){
            setError("something went wrong or favorite not found")
            //console.error(error)
        }
        finally{
            setIsloading(false)
        }
        }
        
        getFavorite()
    },[])


    const onDeleteItem = async (itemId) => {
        try {
          const id = JSON.parse(localStorage.getItem("id"));
          if (id) {
            const res = await axios.delete(`${favoriteDelete}${itemId}`);
            if (res.status === 200) {
              const updatedCart = favorite.filter((item) => item.id !== itemId);
              setFavorite(updatedCart);
            }
          } else {
            
            const cart = JSON.parse(localStorage.getItem('favorite')) || [];
            const updatedCart = cart.filter((item) => item.cart_id !== itemId);
            localStorage.setItem('favorite', JSON.stringify(updatedCart));
            setFavorite(updatedCart);
          }
        } catch (error) {
          setError("something  went wrong")
        }
      };

      
  return (
    <div className="container mt-4">
    <div className="col">
      <h2>Your Favorite </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>favorite: {error}</div>
      ) : favorite && favorite.length > 0 ? (
        favorite.map((item) => (
          <div className="col-12 mb-3" key={item.id} onClick={()=>{
            navigate(`/product/${item.product_id}`)
          }}>
            <div className="card d-flex flex-row flex-wrap position-relative">
              <img
                src={`${mainImageURI}${String(item.product_id + "_" + 0)}/${item.product_id}`}
                className="card-img-top"
                alt={item.product_name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <FaTrashAlt
                className="delete-icon" // Class for positioning the delete icon
                onClick={(e) => {e.stopPropagation(); onDeleteItem(item.id)}}
              />
              <div className="card-body d-flex justify-content-between align-items-center flex-fill">
                <div className="w-50">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text">${item.price.toFixed(2)}</p>
                  
                </div>
                {/* <div>
                  <h5 className="card-title">${(item.price * item.quantity).toFixed(2)}</h5>
                </div> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your Favorite is empty.</p>
      )}
    </div>
  </div>
  )
}

export default Favorite