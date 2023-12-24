import React from 'react'
import './styles.scss'
import HeroBanner from './HeroBanner/heroBanner'
import Trending from './Trending/Trending'
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";


const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home