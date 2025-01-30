import React from 'react'
import { useGetOfferProductsQuery } from '../redux/api/productSlice';
import Loader from '../components/Loader';
import Product from './products/Product';
import Title from '../components/Title';

const OfferProducts = () => {
  const { data:products, isLoading, error } = useGetOfferProductsQuery();
   if (isLoading) { return <Loader /> }
   if (error) { return <h1>ERROR</h1>}
        
  return (
    <div className="container flex flex-col overflow-hidden min-h-screen">
    <div className='px-2'>
    <Title text1={"Offer"} text2={"Products"} />
    </div>
   
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4  mx-auto  md:mx-2">
       {products.slice(0, 4).map((product) => (
        <div key={product._id} className='mb-5 mx-auto p-4 border border-color_3/50 rounded-md'>
            <div className="flex flex-col  gap-4 relative  p-2">
            <div className='absolute w-[6rem] h-[2rem] bg-color_2 z-40 -rotate-45 top-3 -left-5 flex items-center justify-center text-color_6 font-bold rounded-md'>OFFER</div>
            <Product product={product} />
            </div>
        </div>
      ))}        
    </div>
  </div>
  )
}

export default OfferProducts
