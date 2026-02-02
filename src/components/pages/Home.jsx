import React from 'react'
import Swiper from '../ui/Swiper/Swiper'

export const Home = () => {
  return (
    <section id='home'>
      <div className='container max-w-7xl mx-auto'>
        <h1 className='text-4xl font-medium'>Home</h1>
        <Swiper />
      </div>
    </section>
  )
}

