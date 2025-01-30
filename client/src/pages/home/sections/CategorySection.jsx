
import { Link, NavLink } from 'react-router-dom'
import { category, iPhoneSlider, newEarbuds } from '../../../assets/data'
import Title from '../../../components/Title'
import Carousel from '../../../components/Carousel'

const CategorySection = () => {
  return (
    <div className="container flex flex-col">
      <div className="mx-auto">
        <Title text1={"Our"} text2={"Categories"} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-2 lg:gap-4 container my-4 p-4 overflow-hidden">
        {/* iPhone 16 Collection */}
        <div className="flex flex-col items-center gap-4">
          <div className="rounded flex flex-col items-center p-4 bg-color_5"> 
            <h1 className="ctg_btn absolute z-10 mt-6">All new collection of iPhone 16</h1> 
            <Carousel>
              {iPhoneSlider.map((slide, index) => (
                <img 
                  key={slide.id || index} 
                  src={slide.url} 
                  alt="iPhone Slide" 
                  className="rounded w-full h-full m-auto relative" 
                />
              ))}
            </Carousel>
          </div>  

          {/* MacBook & Drone */}
          <div className="rounded-md flex items-center justify-between gap-4">
            <Link to="/shop">
              <div className="bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center justify-center transition duration-300 rounded">
                <img 
                  src="https://i.ibb.co.com/SxTNZrM/macbook.webp" 
                  alt="MacBook" 
                  style={{ height: "200px", objectFit: "contain", width: "220px" }} 
                />
                <h1 className="ctg_btn absolute">MacBook</h1> 
              </div>
            </Link>
            <Link to="/shop">
              <div className="bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center justify-center transition duration-300 rounded">
                <img 
                  src="https://i.ibb.co.com/k44tjKG/cat-7.webp" 
                  alt="Drone" 
                  style={{ height: "200px", width: "210px", objectFit: "contain" }} 
                />
                <h1 className="ctg_btn absolute">Drone</h1> 
              </div>
            </Link>
          </div>
        </div>

        {/* PlayStation */}
        <div>
          <Link to="/shop">
            <div className="hover:bg-color_4 hover:bg-opacity-50 relative flex items-center justify-center transition duration-300 rounded">
              <img 
                src="https://i.ibb.co.com/2WVp1BJ/cat-1.webp" 
                style={{ objectFit: "cover" }} 
                alt="PlayStation" 
                className="rounded" 
              />
              <h1 className="ctg_btn absolute">Play Station</h1> 
            </div>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {category.map((item, index) => (
              <div key={item._id || index} className="bg-gray-300 rounded">
                <Link to="/shop">
                  <div className="bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center justify-center transition duration-300 rounded">
                    <img src={item.url} alt={item.name} className="rounded" />
                    <h1 className="ctg_btn absolute">{item.name}</h1> 
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Camera Section */}
          <div>
            <Link to="/shop">
              <div className="bg-color_2 hover:bg-color_4 hover:bg-opacity-40 relative flex items-center justify-center transition duration-300 rounded lg:h-[82%]">
                <img 
                  src="https://i.ibb.co.com/j663WXZ/cat-8.jpg" 
                  alt="Camera" 
                  className="rounded h-full w-full" 
                />
                <h1 className="ctg_btn absolute">Camera</h1> 
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySection
