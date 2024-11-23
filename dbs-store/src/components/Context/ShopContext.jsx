import React, { createContext } from 'react'
import {all_product} from '../assets/products/data'


export const ShopContext = createContext(null)

const ShopContextProvider = (props) =>{
    const contexValue = {all_product}

    return (
        <ShopContext.Provider value={contexValue}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider 

