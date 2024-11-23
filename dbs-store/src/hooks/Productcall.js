//productacall.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { productsURL } from '../components/assets/constants/Urls/Url';

const Products = () => {
  const [productData, setProductData] = useState([]); // state to hold product data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
        setIsLoading(true)
      try {
        const response = await axios.get(productsURL);
        setProductData(response.data); // set the product data when the response comes in
        setIsLoading(false)
      } catch (error) {
        //console.log(error); // log the error if something goes wrong
        setError(error)
      }
      finally{
        setIsLoading(false)
      }
    };

    fetchProducts(); // call the function to fetch products on component mount
  }, []); // empty dependency array ensures useEffect runs once when the component mounts

  return {productData, error, isLoading}
};

export default Products;
