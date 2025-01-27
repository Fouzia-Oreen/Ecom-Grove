import React from 'react'

const SaleBannerSection = () => {
  return (
    <div className='my-32 mx-2'>
      <div className='bg-color_5 flex  items-center justify-between p-6 lg:p-10 rounded-3xl relative m-12 container'>
        <div className=''>
          <h1 className='xl:text-6xl lg:text-5xl md:text-3xl text-xl font-bold text-color_1 text-wrap'>Enjoy the Year End Sale <br/> on  Smart Watches</h1>
          <p className='lg:py-4 py-2 text-color_2'>Up To 70% OFF </p>
          <button className='bg-color_6 text-color_1 font-medium rounded-full px-3 py-1'>Explore Now</button>
        </div>
        <div className='size-36 md:size-[300px] xl:size-[400px] absolute  xl:ml-[50rem] lg:ml-[35rem] md:ml-[24rem] ml-[8rem] mt-[8rem] md:mb-[8rem] rotate-12 '>
         <img src="https://i.ibb.co.com/4jJwQCY/banner-1.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default SaleBannerSection
