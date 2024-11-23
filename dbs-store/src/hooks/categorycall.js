//productacall.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { categoryURL } from '../components/assets/constants/Urls/Url';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]); // state to hold product data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
        setIsLoading(true)
      try {
        const response = await axios.get(categoryURL);
        setCategoryData(response.data); // set the product data when the response comes in
        setIsLoading(false)
      } catch (error) {
        //console.log(error); // log the error if something goes wrong
        setError(error)
      }
      finally{
        setIsLoading(false)
      }
    };

    fetchCategory(); // call the function to fetch Category on component mount
  }, []); // empty dependency array ensures useEffect runs once when the component mounts

  return {categoryData, error, isLoading}
};

export default Category;
