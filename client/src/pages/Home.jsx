import { useParams } from "react-router-dom";
import Header from "./home/sections/Header";
import Loader from "../components/Loader";

import { useGetProductsQuery } from "../redux/api/productSlice";
import BestSellerSection from "./home/sections/BestSellerSection";
import CategorySection from "./home/sections/CategorySection";
import MarqueeSection from "./home/sections/Marquee";
import NewEarbudsSection from "./home/sections/NewEarbudsSection";
import NewProductsSection from "./home/sections/NewProductsSection";
import SaleBannerSection from "./home/sections/SaleBannerSection";
import ShippingInfoSection from "./home/sections/ShippingInfoSection";
import TopProducts from "./home/sections/TopProducts";
import Message from "../components/Message";



const Home = () => {
  const { keyword } = useParams();
  const { isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
     {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.message || isError.error}
        </Message>
      ) : (
        <>   
         {/* category - section */}
         <CategorySection />
         {/* new products section */}
         <NewProductsSection />
          {/* NewEarbuds - product */}
          <NewEarbudsSection />
          {/* top - product */}
          <TopProducts />
          {/* bestseller - product - section */}
          <BestSellerSection />
          {/* sale banner */}
          <SaleBannerSection />
          {/* brands & collaboration */}
          <MarqueeSection />
          {/* shipping - info - section */}
          <ShippingInfoSection />
         </>  
      )       
    }
    </>
  )
};

export default Home;
