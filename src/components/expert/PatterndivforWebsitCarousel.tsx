import React from 'react'
import { PatternCarouselDivProps } from '../../types'

const PatterndivforWebsitCarousel:React.FC<PatternCarouselDivProps> = ({ description, expertName , patternImageUrls, patternType}) => {
  return (
    <div className='border-2 px-2 md:px-4 py-2 w-[100%] rounded-xl'>
        <h2 className='text-blue-500 text-xl'>{patternType}</h2>
    </div>
  )
}

export default PatterndivforWebsitCarousel