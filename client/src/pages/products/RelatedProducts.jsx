import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Loader from '../../components/Loader'
import Title from '../../components/Title'
import { useGetTopProductsQuery } from '../../redux/api/productSlice'
import { useFetchBrandsQuery } from '../../redux/api/brandSlice'
import Product from './Product'


const RelatedProducts = () => {
  const { data:products, isLoading, error } = useGetTopProductsQuery();
  const {data:brand} = useFetchBrandsQuery()
      if (isLoading) {
        return <Loader />;
      } 
      if (error) {
        return <h1>ERROR</h1>;
      }
      
  return (
    <div className='container flex flex-col'>
    <div className='px-2'>
    <Title text1={"Related"} text2={"Products"} /> 
    </div> 
     <Swiper
         slidesPerView={1}
         spaceBetween={0}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}      
         breakpoints={{
           640: {
             slidesPerView: 2,

           },
           768: {
             slidesPerView: 2,

           },
           1024: {
             slidesPerView: 3,
           },
           1224: {
            slidesPerView: 4,
          },
         }}
         modules={[Autoplay]}
         className="mySwiper"
      >
    {
      products.map((product) => (
        <>
        
        <SwiperSlide >
          {/* product card */}
          <div className=' w-full flex items-center justify-center'>       
            <Product product={product} brand={brand}/>       
          </div>                       
        </SwiperSlide>

        </>
      ))
    }
    </Swiper>
    </div>
  )
}

export default RelatedProducts
