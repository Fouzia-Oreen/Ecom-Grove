import { Link } from 'react-router-dom'
import { slides } from '../../../assets/data'
import Carousel from '../../../components/Carousel'
import Title from '../../../components/Title'

const BestSellerSection = () => {
  return (
    <>
        {/* bestseller - product - section */}
        <div className="container flex flex-col my-4 lg: overflow-hidden md:p-4 p-2">
            <Title text1={"Bestseller"} text2={"Product"} />
            <div className="grid gap-6 md:grid-cols-2 mx-12 items-center">
              <div className="max-w-lg">
                <Carousel>
                  {
                    slides.map(slide => (
                      <>
                      <img key={slide.id}
                        src={slide}
                        alt={""}
                        className="rounded bg-color_2"
                      />
                      </>
                    ))
                  }
                </Carousel>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-4">MG20 Gaming (Galactic White)</h1>
                <h4 className="underline mb-2 text-xl"><strong>Brand : </strong>Gigabyte</h4>
                <p className="text-gray-500 text-lg">These headphones are not only amazing for the design and features, but also for the audio quality. They are comfortable and lightweight for hours</p>
                <div className="flex gap-6 mt-8">
                <Link className="btn add-btn" to="/shop"> View More</Link>
                <button className="btn submit-btn" onClick={''}> Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default BestSellerSection
