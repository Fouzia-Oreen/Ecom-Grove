
import { NavLink } from 'react-router-dom'
import { category } from '../../assets/data'
import Title from '../../components/Title'

const CategorySection = () => {
  return (
    <>
            {/* category */}
            <div className="grid md:grid-cols-3 gap-4 container my-4 overflow-hidden p-4">
             <div className="md:mt-20 pr-4">
             <Title text1={"Our"} text2={"Category"} />
             <h4 className="text-gray-600 text-wrap">Discover the future of convenience with our Ultimate Tech Gadgets Collection, where cutting-edge innovation meets everyday practicality. This curated selection features the latest gadgets tailored to enhance your lifestyle, making everyday tasks easier and adding a touch of flair to your tech arsenal.
              <p className="lg:block  hidden"> From smart home devices to portable chargers, each product is designed with a focus on user-friendly functionality and sleek aesthetics. Elevate the way you interact with technology and bring joy and efficiency into your daily routines. </p>
            </h4>
             </div>   
             <div className="relative">
              <NavLink to="">
              <h1 className="absolute text-color_1 mt-8 ml-4 font-medium  bg-color_6 px-3 rounded-full">Play Station</h1>
              <img src="https://i.ibb.co.com/2WVp1BJ/cat-1.webp" alt="big" className="rounded  "/>
              </NavLink>
             </div>
             <div className="flex flex-col gap-2">
             <div className=" grid-cols-2 grid gap-2 ">
              {category.map((item) => (
                <div key={item._id} className='bg-gray-300 rounded'>
                  <NavLink to="">
                  <img src={item.url} alt={item.name} className=" rounded " />
                  <h1 className="absolute text-color_1 bg-color_6 px-2 rounded-full -mt-7 ml-1.5 text-sm ">{item.name}</h1>
                  </NavLink>
                </div>
              ))}
             </div>
             <div className="relative">
              <NavLink to="">
                <img src="https://i.ibb.co.com/j663WXZ/cat-8.jpg" alt="" className="rounded h-[85%] w-full" />
                <h1 className="absolute text-color_1 bg-color_6 px-2 rounded-full -mt-8 ml-2 font-medium">Camera</h1>
              </NavLink>
             </div>
             </div>
             </div>
    </>

  )
}

export default CategorySection
