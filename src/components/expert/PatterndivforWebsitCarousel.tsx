import React, { useState } from 'react'
import { PatternCarouselDivProps } from '../../types'
import ImageSlides from './ImageSlides';

const PatterndivforWebsitCarousel:React.FC<PatternCarouselDivProps> = ({ description, expertName , patternImageUrls, patternType, z_index}) => {
  const [imgToDisplay, setImgToDisplay] = useState<string>();
  const [imgOpen, setImageOpen] = useState<boolean>(false);
  const [zindex, setZindex ] = useState(false)
  // const z_index = zindex ? "z-[-10]" : "z-[30]";

  const handleImageClick = (img:string) => {
    setImgToDisplay(img);
    setImageOpen(true);
    setZindex(true);
  }

const handleImageClose = () => {
    setImageOpen(false);
    setZindex(false);
}
  return (
    <>
    <ImageSlides image={imgToDisplay ? imgToDisplay : ""} isOpen={imgOpen} onClose={handleImageClose}/>
    <div className='border-2 px-2 md:px-4 py-2 w-[100%] rounded-xl col-span-1 mt-3'>
        <h2 className='text-blue-500 text-xl'>{patternType}</h2>
        <p className='text-gray-500 font-italic'>Contributed By: {expertName}</p>
        <div className='p-2 bg-gray-100 mt-3'>
          <h2 className='font-bold'>Description</h2>
          <p>{description}</p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 mt-3 relative ${zindex ? "z-[-10]" : z_index} `}>
          {patternImageUrls.map((img, index)=>(
            <img
              src={img}
              alt={`Preview ${index + 1}`}
              className="w-full h-20 object-cover rounded-md border-2 border-gray-200 opacity-75 cursor-pointer"
              onClick={()=>handleImageClick(img)}
            />
          ))}
        </div>
    </div>
    </>
  )
}

export default PatterndivforWebsitCarousel