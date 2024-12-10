/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const Carousel = ({children: slides}) => {
    const [curr, setCurr] = useState(0);
    
    const handlePrev = () => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    };
    const handleNext = () => {
        setCurr((curr) => (curr ===  slides.length - 1 ? 0 : curr + 1));
    };
    return (
        <div className="overflow-hidden relative">
            <div className='flex transition-transform ease-out duration-500' style={{transform:`translateX(-${curr*100}%)`}}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={handlePrev} className="p-1 shadow text-color_5 rounded-full hover:text-color_1 bg-color_1 hover:bg-color_6"><IoChevronBackOutline side={40}/></button>
                <button onClick={handleNext} className="p-1 shadow text-color_5 rounded-full hover:text-color_1 bg-color_1 hover:bg-color_6"><IoChevronForwardOutline side={40}/></button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {
                        slides.map((_, i) => (
                            <button key={i} className={`p-1 shadow text-color_5 bg-color_1 rounded-full ${curr === i? 'p-1.5' : 'bg-opacity-50 '}`} onClick={() => setCurr(i)}></button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Carousel;