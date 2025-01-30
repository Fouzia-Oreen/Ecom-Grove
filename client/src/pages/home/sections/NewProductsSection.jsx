import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
 import Loader from '../../../components/Loader';
import Title from '../../../components/Title';
import { useGetNewProductsQuery } from '../../../redux/api/productSlice';
import Product from '../../products/Product';
import { useFetchBrandsQuery } from '../../../redux/api/brandSlice';

const NewProductsSection = () => {
  const { data:products, isLoading, error } = useGetNewProductsQuery();
   const {data:brand} = useFetchBrandsQuery()


    if (isLoading) {
      return <Loader />;
    }
  
    if (error) {
      return <h1>ERROR</h1>;
    }
  
    return (
      <div className='container flex flex-col'>
      <Title text1={"New"} text2={"Products"} /> 
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
          <div className=' w-full flex items-center justify-center mt-6' key={product._id}>       
            < Product product={product} brand={brand}/>       
          </div>                       
        </SwiperSlide>
        </>
        ))
      }
      </Swiper>
      </div>
  
    );
}

export default NewProductsSection

