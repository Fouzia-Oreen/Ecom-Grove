import React from 'react';

const Title = ({text1, text2}) => {
    return (
        <div className='inline-flex items-baseline my-5 w-full gap-4  py-4 '>                        
            <p className="flex gap-2 text-2xl md:text-3xl text-color_4">
                {text1} 
                <span className='font-medium text-color_5'> { text2}</span>
            </p>
            <div className="h-[12px] w-[3px] bg-color_6 " ></div> 
      </div>
    );
};

export default Title;