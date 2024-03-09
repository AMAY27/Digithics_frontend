import React from 'react'

const LoadingPatternCard = () => {
  return (
    <div className='grid md:grid-cols-3 gap-4 mt-8 px-24'>
        <div className='md:col-span-1 shadow-xl rounded-2xl bg-white h-fit py-6 px-6'>
            <div className='w-1/3 h-[40px] bg-gray-100 animate-pulse'></div>
            <div className='w-full h-[120px] bg-gray-100 mt-2 rounded-lg animate-pulse'></div>
            <div className='flex items-center my-2 animate-pulse'>
                <div className='rounded-full bg-gray-200 h-10 w-10'></div>
                <div className='w-1/3 h-[10px] bg-gray-200 mx-3'></div>
            </div>
            <div className='flex items-center my-2 animate-pulse'>
                <div className='rounded-full bg-gray-200 h-10 w-10'></div>
                <div className='w-1/3 h-[10px] bg-gray-200 mx-3'></div>
            </div>
            <div className='flex items-center my-2 animate-pulse'>
                <div className='rounded-full bg-gray-200 h-10 w-10'></div>
                <div className='w-1/3 h-[10px] bg-gray-200 mx-3'></div>
            </div>
        </div>
        <div className='md:col-span-2 h-full px-12 py-4 shadow-xl rounded-2xl bg-white'>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
            <div className='h-[140px] w-full bg-gray-200 shadow-xl py-1 rounded-xl animate-pulse mt-8'></div>
        </div>
    </div>
  )
}

export default LoadingPatternCard