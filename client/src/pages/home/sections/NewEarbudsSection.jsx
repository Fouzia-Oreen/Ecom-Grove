import React from 'react'
import { Link, } from 'react-router-dom'
import { newEarbuds } from '../../../assets/data'
import Carousel from '../../../components/Carousel'

const NewEarbudsSection = () => {

    return (
        <div className='my-20 bg-color_5 lg:h-[70vh] lg:py-12 p-4'>
            {/* bestseller - product - section */}
            <div className="container ">
                <div className="grid gap-6 md:grid-cols-2 lg:mx-12 items-center lg:gap-40">
                <Link to=''>
                    <h1 className="text-4xl font-bold mb-4 text-color_1">Havit HV154 Sound canceling Earbuds</h1>
                    <h4 className=" mb-2 text-xl text-color_6"><strong  className='text-color_2'>Brand : </strong>Havit</h4>
                    <p className="text-gray-400 text-lg mt-4">These headphones are not only amazing for the design and features, but also for the audio quality. They are comfortable and lightweight for hours</p>
                    <p className="text-gray-400 text-lg mt-4">These headphones are not only amazing for the design and features, but also for the audio quality. They are comfortable and lightweight for hours</p>
                    <div className="flex gap-6 mt-8">
                    <button className="btn ctg_btn" onClick={''}> View More </button>
                    </div>
                </Link>
                <div className="max-w-lg rounded-md ">
                  <Carousel>
                    {
                      newEarbuds.map(slide => (
                        <>
                        <img key={slide.id}
                          src={slide}
                          alt={""}
                          className="rounded "
                        />
                        </>
                      ))
                    }
                  </Carousel>
                </div>
                </div>
              </div>
        </div>
      )
}

export default NewEarbudsSection
