import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { allUserURL } from '../components/assets/constants/Urls/Url'

export const UsersCall = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const  [error, setError] = useState(null)
    

    const fetchData = async ()=>{
        setIsLoading(true)
        try{
            
            const response = await axios.get(allUserURL)
            if (response.status === 200 && response.data){
                setUserData(response.data)
                setIsLoading(false)
                }
        }catch(error){
            //console.log(error)
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

  return {
    isLoading,
    userData,
    error
  }
}


