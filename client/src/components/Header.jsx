 import { headerSlider } from "../assets/data";
import { useGetTopProductsQuery } from "../redux/api/productSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';


const Header = () => {
  const { isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
  <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}      
        modules={[Autoplay]}
        className="mySwiper"
      >
    {
      headerSlider.map((item, i) => (
        <>
        <SwiperSlide>
          <NavLink to="">
          <div className="md:h-[500px] h-[300px]" key={i}>
          <img src={item.url} alt="" className="absolute"/> 
          <div className="hover:bg-color_4 hover:bg-opacity-20 w-full h-full relative flex items-start flex-col justify-end md:pl-40 md:pb-20 pl-6 pb-8 transition duration-300">
            <h1 className="md:text-5xl text-xl text-color_1 font-semibold">{item.title}</h1>
            <h1 className="md:text-xl text-sm md:pt-4 text-color_2 text-left">{item.desc}</h1>
          </div>     
          </div>
          </NavLink>
        </SwiperSlide>
        </>
      ))
    }
    </Swiper>
    </>
  );
};

export default Header;


{/* <div class="position-absolute" style="opacity: 0.4;
                          left: 0%;
                          right: 0%;
                          top: 0%;
                          bottom: 0%;
                          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 68.32%, #000000 103.12%), linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));">
              </div> */}