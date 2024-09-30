import React from 'react'
import CategoryList from '../component/CategoryList'
import BannerProduct from '../component/BannerProduct'
import HorizontalProductCard from '../component/HorizontalProductCard'
import VerticalCardProduct from '../component/VerticalCardProduct'

const Home = () => {
  return (
    <>
    <CategoryList/>
    <BannerProduct/>
    <HorizontalProductCard category = {"Airpodes"} heading={"Top's Airpodes"}/>
    <HorizontalProductCard category = {"Watches"} heading={"Populor's Watches"}/>
<VerticalCardProduct category = {"Mobiles"} heading={"Mobiles"}/>
<VerticalCardProduct category = {"Mouse"} heading={"Mouse"}/>
<VerticalCardProduct category = {"Televisions"} heading={"Televisions"}/>
<VerticalCardProduct category = {"Camera"} heading={"Camera & Photoghraphy"}/>
<VerticalCardProduct category = {"Earephones"} heading={"Wired Earephones"}/>
<VerticalCardProduct category = {"Speakers"} heading={"Bluetooth Speakers"}/>
<VerticalCardProduct category = {"Refrigerator"} heading={" Refrigerator"}/>
<VerticalCardProduct category = {"Trimmers"} heading={"Trimmers"}/>





    </>
  )
}

export default Home