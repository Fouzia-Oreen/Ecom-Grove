import React from 'react'
import { brandMarquee } from '../../../assets/data'
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <div className="my-12">     
    <Marquee className="" pauseOnHover={true} speed={70} gradient={true} gradientColor={"#8d0d1e"} gradientWidth={120}>
      {
        brandMarquee.map((item, index) => (
          <div key={index} className="w-[350px] bg-color_6 font-bold py-6">
          <img src={item} alt="" />
         </div>
        ))
      }
     </Marquee>
    </div>
  )
}

export default MarqueeSection
