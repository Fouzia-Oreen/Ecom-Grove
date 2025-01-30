import React from 'react'
import Loader from '../../../components/Loader'
import Title from '../../../components/Title'
import { useGetTopProductsQuery } from '../../../redux/api/productSlice'
import Product from '../../products/Product'
import { useFetchBrandsQuery } from '../../../redux/api/brandSlice'

const TopProducts = () => {
  const { data:products, isLoading, error } = useGetTopProductsQuery();
  const {data:brand} = useFetchBrandsQuery()
      if (isLoading) {
        return <Loader />;
      }
    
      if (error) {
        return <h1>ERROR</h1>;
      }
      
  return (
    <div className="container flex flex-col overflow-hidden">
    <div className='px-2'>
    <Title text1={"Top"} text2={"Products"} />
    </div>
   
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4  mx-auto  md:mx-2">
       {products.slice(0, 6).map((product) => (
        <div key={product._id} className='mb-5'>
          <Product product={product} brand={brand}/>
        </div>
      ))}        
    </div>
   </div>
  )
}

export default TopProducts
