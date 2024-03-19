import React from 'react'
import { PatternCarouselDivProps } from '../../types'

const PatterndivforWebsitCarousel:React.FC<PatternCarouselDivProps> = ({comments, description, expertName , patternImageUrls, patternType}) => {
  return (
    <div className='border-2 p-4 md:p-8 w-[100%] rounded-xl'>
        <h2 className='text-blue-500 text-xl'>{patternType}</h2>
    </div>
  )
}

export default PatterndivforWebsitCarousel