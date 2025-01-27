
import { Link, NavLink } from 'react-router-dom'
import { category, iPhoneSlider, newEarbuds } from '../../../assets/data'
import Title from '../../../components/Title'
import Carousel from '../../../components/Carousel'

const CategorySection = () => {
  return (
    <>
            {/* category */}
            <div className='container  flex flex-col '>
            <div className='mx-auto'>
            <Title text1={"Our"} text2={"Categories"} />
            </div>
            <div className="grid md:grid-cols-3 gap-2 lg:gap-4 container my-4 p-4 overflow-hidden ">
             <div className='flex flex-col  items-center   gap-4
             '>
              <div className='rounded  flex flex-col items-center p-4  bg-color_5'> 
                <h1 className=" ctg_btn absolute z-10 mt-6">All new collection of iPhone 16</h1> 
              <Carousel>
                {
                  iPhoneSlider.map(slide => (
                    <img key={slide.id}
                      src={slide.url}
                      alt={""}
                      className="rounded w-full h-full m-auto relative" />
                  ))
                }
              </Carousel>
              </div>  
       
              <div className=' rounded-md  flex items-center  justify-between gap-4'>
              <Link to='/shop'>
              <div className=" bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center  justify-center  transition duration-300  rounded  ">
                <img src="https://i.ibb.co.com/SxTNZrM/macbook.webp" alt="big" 
                 style={{ height: "200px", objectFit: "contain", width:"220px" }}
                 className=" "
                />
                <h1 className=" ctg_btn  absolute  ">Mac-book</h1> 
              </div>
              </Link>
              <Link to='/shop'>
                <div className=" bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center  justify-center  transition duration-300  rounded  ">
                <img src="https://i.ibb.co.com/k44tjKG/cat-7.webp" alt="big" 
                 style={{ height: "200px", width:"210px", objectFit: "contain" }}
                 className=""
                />
                <h1 className=" ctg_btn  absolute  ">Drone</h1> 
              </div>
              </Link>
              </div>
          
             </div>

             <div className="">
              <Link to="/shop">
              <div className="hover:bg-color_4 hover:bg-opacity-50 relative flex items-center  justify-center  transition duration-300 rounded">
                <img src="https://i.ibb.co.com/2WVp1BJ/cat-1.webp" style={{  objectFit: "cover" }} alt="big" className="rounded "/>
                <h1 className=" ctg_btn  absolute ">Play Station</h1> 
              </div>
              </Link>
             </div>
             <div className="flex flex-col gap-4">
             <div className=" grid-cols-2 grid gap-2 ">
              {category.map((item) => (
                <div key={item._id} className='bg-gray-300 rounded'>
                  <Link to="/shop">
                  <div className=" bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center  justify-center  transition duration-300 rounded ">
                  <img src={item.url} alt={item.name} className=" rounded " />
                  <h1 className=" ctg_btn  absolute  ">{item.name}</h1> 
                </div>
                  </Link>
                </div>
              ))}
             </div>
             <div className="">
              <Link to="/shop">
                <div className=" bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center  justify-center  transition duration-300 rounded lg:h-[82%]">
                  <img src="https://i.ibb.co.com/j663WXZ/cat-8.jpg" alt="" className=" rounded  h-full w-full" />
                  <h1 className=" ctg_btn absolute">Camera</h1> 
                </div>
              </Link>
             </div>
             </div>
             </div>
             </div>
    </>

  )
}

export default CategorySection

{/* <img src={item.url} alt="" className="absolute"/> 
<div className="hover:bg-color_4 hover:bg-opacity-20 w-full h-full relative flex items-start flex-col justify-end md:pl-40 md:pb-20 pl-6 pb-8 transition duration-300">
  <h1 className="md:text-5xl text-xl text-color_1 font-semibold">{item.title}</h1>
  <h1 className="md:text-xl text-sm md:pt-4 text-color_2 text-left">{item.desc}</h1>
</div>  */}

{/* 
  <img src="https://i.ibb.co.com/SxTNZrM/macbook.webp" alt="big" className="rounded  absolute"/>
  <div className="hover:bg-color_4 hover:bg-opacity-20 w-full h-full relative flex items-start flex-col justify-end md:pl-40 md:pb-20 pl-6 pb-8 transition duration-300">
  <h1 className="md:text-5xl text-xl text-color_1 font-semibold">{item.title}</h1>
  <h1 className="absolute text-color_1 -mt-20 ml-64 md:ml-72 font-medium  bg-color_6 px-3 rounded-full">Macbook</h1> 
</div> 
*/}
             {/* <div className="md:mt-20 pr-4">
             <Title text1={"Our"} text2={"Category"} />
             <h4 className="text-gray-600 text-wrap">Discover the future of convenience with our Ultimate Tech Gadgets Collection, where cutting-edge innovation meets everyday practicality. This curated selection features the latest gadgets tailored to enhance your lifestyle, making everyday tasks easier and adding a touch of flair to your tech arsenal.
              <p className="lg:block  hidden"> From smart home devices to portable chargers, each product is designed with a focus on user-friendly functionality and sleek aesthetics. Elevate the way you interact with technology and bring joy and efficiency into your daily routines. </p>
            </h4>
             </div>    */}