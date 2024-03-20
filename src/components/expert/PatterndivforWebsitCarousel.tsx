import React from 'react'
import { PatternCarouselDivProps } from '../../types'

const PatterndivforWebsitCarousel:React.FC<PatternCarouselDivProps> = ({ description, expertName , patternImageUrls, patternType}) => {
  return (
    <div className='border-2 px-2 md:px-4 py-2 w-[100%] rounded-xl col-span-1 mt-3'>
        <h2 className='text-blue-500 text-xl'>{patternType}</h2>
        <p className='text-gray-500 font-italic'>Contributed By: {expertName}</p>
        <div className='p-2 bg-gray-100 mt-3'>
          <h2 className='font-bold'>Description</h2>
          <p>{description}</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 mt-3'>
          {patternImageUrls.map((img, index)=>(
            <img
              src={img}
              alt={`Preview ${index + 1}`}
              className="w-full h-20 object-cover rounded-md border-2 border-gray-200 opacity-75 cursor-pointer"
            />
          ))}
        </div>
    </div>
  )
}

export default PatterndivforWebsitCarousel