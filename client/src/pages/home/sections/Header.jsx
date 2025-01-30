import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
//import { headerSlider } from "../../../assets/data";
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { useFetchAllHeadersQuery } from '../../../redux/api/headerSlice';


const Header = () => {
  const  {data: headers, isLoading, error} = useFetchAllHeadersQuery();
  

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
    {headers.map((item, i) => (
        <SwiperSlide key={item.id || i}>
            <Link to="/shop">
                <div className="md:h-[500px] h-[300px]">
                    <img src={item.image} alt="" className="absolute"/> 
                    <div className="hover:bg-color_4 hover:bg-opacity-20 w-full h-full relative flex items-start flex-col justify-end md:pl-40 md:pb-20 pl-6 pb-8 transition duration-300">
                        <h1 className="md:text-5xl text-xl text-color_6 font-semibold">{item.title}</h1>
                        <h1 className="md:text-xl text-sm md:pt-4 text-color_1 text-left">{item.description}</h1>
                    </div>     
                </div>
            </Link>
        </SwiperSlide>
    ))}
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