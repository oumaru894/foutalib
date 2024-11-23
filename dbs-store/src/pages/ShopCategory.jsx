import React, { useContext } from 'react'
import { ShopContext } from '../components/Context/ShopContext'
import bk from '../components/assets/images/bk.png'
import Hero from '../components/Hero/Hero'
import Card from '../components/Card/Card'
//import {all_product} from '../components/assets/products/data'


export const ShopCategory = (props) => {
  return (
    <div>
      <hr />
      <Hero banner={props.banner}/>
      <Card category={props.category}/>
    </div>
  )
}
