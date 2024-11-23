import React from 'react'
import Hero from '../components/Hero/Hero'
import BestSellers from '../components/bestSeller/BestSellers'
import { Offers } from '../components/offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import Newsletter from '../components/newsLetter/NewsLetter'
import CategoryComponet from '../components/Category'

export const Shop = () => {
  return (
    <div>
      {/* <CategoryComponet/> 
      <Hero/>*/}
      <BestSellers/>
      {/* <Offers/>
      <NewCollections/>
      <Newsletter/> */}
    </div>
    
  )
}
