import React, { useState } from 'react'
import CataloguGuide from './CataloguGuide';
import { IoMdShare, IoMdHeartEmpty, IoMdStarOutline , IoMdStarHalf, IoMdStar  } from "react-icons/io";
import ProductInfoGuide from './ProductInfoGuide';

const Demo = () => {
    const [componentDetector, setComponentDetector] = useState<String>("start");
    const [catalogueGuideOpen, setCatalogueGuideOpen] = useState<Boolean>(false)
    const [isProductInfoGuideOpen, setIsProductInfoGuideOpen] = useState<Boolean>(false)
    const [productInfoGuideStepCount, setProductInfoGuideStepCount] = useState(0)

    const handleStartClick = () => {
        setComponentDetector("catalogue")
    }
    const handleCatalogueClick = () => {
        setComponentDetector("start")
    }
    const handleCatalogueNextClick = () => {
        setCatalogueGuideOpen(true)
    }
    const handleCatalogueCloseClick = () => {
        setCatalogueGuideOpen(false)
    }
    const handleProductDetailClick = () => {
        setCatalogueGuideOpen(false)
        setComponentDetector("productdetail")
    }
    const handleProductInfoGuideRevealClicked = () => {
        setProductInfoGuideStepCount(productInfoGuideStepCount + 1)
        setIsProductInfoGuideOpen(true);
    }
    const handleProductInfoGuideRevealClose = () => {
        setIsProductInfoGuideOpen(false)
        setProductInfoGuideStepCount(0);
    }
    const handleProductInfoGuideNextClick = () => {
        if(productInfoGuideStepCount === 2){
            setIsProductInfoGuideOpen(false);
            setProductInfoGuideStepCount(0);
        }else{
            setProductInfoGuideStepCount(productInfoGuideStepCount + 1)
        }
    }
  return (
    <>
        {
            componentDetector === "start" ?
            <div className='relative mx-2 md:mx-10 lg:mx-40 mt-8 md:mt-12'>
            <div className="bg-cyan-900 border-2 border-cyan-500 p-4 rounded-t-md block sm:flex sm:justify-between sm:items-center">
                <p className='font-bold text-white'>Can you detect deceptive patterns in this Product Catalogue Page</p>
                <div className='flex justify-end space-x-2 sm:space-x-4'>
                    <button className='px-2 mt-2 sm:mt-0 py-1 sm:py-1 border-2 border-cyan-500 hover:bg-blue-800 text-white font-bols rounded-md' onClick={handleCatalogueNextClick}>Reveal Patterns</button>
                    <button className='px-2 mt-2 sm:mt-0 py-1 sm:py-1 border-2 border-cyan-500 hover:bg-blue-800 text-white font-bols rounded-md' onClick={handleProductDetailClick}>&gt;</button>
                </div>
            </div>
            <div className='bg-white relative rounded-b-md shadow-xl mb-12 sm:mb-24'>
                <CataloguGuide onClose={handleCatalogueCloseClick} isOpen={catalogueGuideOpen} handleNextStepClicked={handleProductDetailClick}/>
                <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:pt-4 pt-8'>
                <div className='flex md:block rounded-md mx-4 my-2 shadow-md md:max-h-full'>
                    <div className='rounded-l-md md:rounded-bl-none md:rounded-t-md md:h-[40%] w-[40%] md:w-full bg-gray-100 md:max-h-40'><img src="/assets/mountains-8314422.svg" alt="product-preview" className='w-full md:h-full'/></div>
                    <div className='bg-white rounded-md m-2'>
                        <div className='relative p-2 md:p-2 z-40 bg-white rounded-md'>
                            <div className='flex justify-end p-1 text-xs'><p className='text-white font-bold bg-red-500 rounded-md px-2'>Limited Time Deal</p></div>
                            <h2 className='text-blue-500 text-sm md:text-lg font-bold'>Product Name</h2>
                            <p className='text-red-500 text-xs md:text-base font-bold'>Only 3 left in stock</p>
                        </div>
                        <p className='text-xs md:text-base'>Product description and details</p>
                        <p className='text-xs md:text-base'>Product description and details</p>
                        <div className="flex justify-center space-x-4 py-2">
                            <button className='px-2 py-1 bg-yellow-500 rounded-md w-full'>View Details</button>
                        </div>
                        </div>
                    </div>
                    <div className='flex items-stretch md:block rounded-md mx-4 my-2 shadow-md md:max-h-full'>
                        <div className='rounded-l-md md:rounded-bl-none md:rounded-t-md md:h-[40%] w-[40%] md:w-full bg-gray-100 md:max-h-40'><img src="/assets/mountains-8314422.svg" alt="product-preview" className='w-full md:h-full'/></div>
                        <div className='m-3 md:m-4'>
                            <h2 className='text-blue-500 text-sm md:text-lg font-bold'>Product Name</h2>
                            <p className='text-red-500 text-xs md:text-base font-bold'>Only 3 left in stock</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <div className="flex justify-center space-x-4 py-2">
                                <button className='px-2 py-1 bg-yellow-500 rounded-md w-full'>View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex md:block rounded-md mx-4 my-2 shadow-md md:max-h-full'>
                        <div className='rounded-l-md md:rounded-bl-none md:rounded-t-md md:h-[40%] w-[40%] md:w-full bg-gray-100 md:max-h-40'><img src="/assets/mountains-8314422.svg" alt="product-preview" className='w-full md:h-full'/></div>
                        <div className='m-3 md:m-4'>
                            <h2 className='text-blue-500 text-sm md:text-lg font-bold'>Product Name</h2>
                            <p className='text-red-500 text-xs md:text-base font-bold'>Only 3 left in stock</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <div className="flex justify-center space-x-4 py-2">
                                <button className='px-2 py-1 bg-yellow-500 rounded-md w-full'>View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex md:block rounded-md mx-4 my-2 shadow-md md:max-h-full'>
                        <div className='rounded-l-md md:rounded-bl-none md:rounded-t-md md:h-[40%] w-[40%] md:w-full bg-gray-100 md:max-h-40'><img src="/assets/mountains-8314422.svg" alt="product-preview" className='w-full md:h-full'/></div>
                        <div className='m-3 md:m-4'>
                            <h2 className='text-blue-500 text-sm md:text-lg font-bold'>Product Name</h2>
                            <p className={`text-red-500 text-xs md:text-base font-bold`}>Only 3 left in stock</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <p className='text-xs md:text-base'>Product description and details</p>
                            <div className="flex justify-center space-x-4 py-2">
                                <button className='px-2 py-1 bg-yellow-500 rounded-md w-full' onClick={handleProductDetailClick}>View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div> : componentDetector === "productdetail" ? 
            <>
            <div className="relative bg-cyan-900 border-2 border-cyan-500 p-4 mx-2 md:mx-10 lg:mx-40 mt-8 md:mt-12 rounded-t-md block sm:flex sm:justify-between sm:items-center">
                <p className='font-bold text-white'>Can you detect deceptive patterns in this Product info page</p>
                <div className='flex justify-end space-x-4  '>
                <button className='px-2 mt-2 sm:mt-0 py-1 sm:py-1 border-2 border-cyan-500 hover:bg-blue-800 text-white font-bols rounded-md' onClick={handleCatalogueClick}>&lt;</button>
                    <button className='px-2 mt-2 sm:mt-0 py-1 sm:py-1 border-2 border-cyan-500 hover:bg-blue-800 text-white font-bols rounded-md' onClick={handleProductInfoGuideRevealClicked}>Reveal Patterns</button>
                </div>
            </div>
            <div className='md:flex bg-white relative rounded-b-md shadow-xl mx-2 md:mx-10 lg:mx-40 mb-12 sm:mb-24'>
                <ProductInfoGuide onClose={handleProductInfoGuideRevealClose} isOpen={isProductInfoGuideOpen} stepCount={productInfoGuideStepCount} nextStepChange={handleProductInfoGuideNextClick}/>
                <div className='md:hidden flex items-center justify-between col-span-1 px-6 py-2 '>
                    <h2 className='text-blue-500 font-bold text-xl'>Product Name</h2>
                    <div className="flex items-center text-2xl space-x-2">
                        <IoMdHeartEmpty/>
                        <IoMdShare/>
                    </div>
                </div>
                <div className='w-full md:w-1/2 grid grid-cols-1 place-items-center md:m-4 bg-gray-100'>
                    <img src="/assets/mountains-8314422.svg" alt="product-preview" className='size-60 md:size-96 col-span-1'/>
                </div>
                <div className='mx-6 md:my-6 md:w-1/2'>
                    <div className='flex justify-between items-center'>
                        <h2 className='hidden md:block text-xl text-blue-500 font-bold'>Product Name</h2>
                        <div className="hidden sm:flex items-center text-3xl space-x-6">
                            <IoMdHeartEmpty/>
                            <IoMdShare/>
                        </div>
                    </div>
                    <h2 className='text-2xl text-red-500 pt-4'>-50%  <span className='text-lg text-gray-400 pl-2'><s>100.00</s></span> <span className='text-lg text-blue-500 font-bold'>50.00</span></h2>
                    <div className={`${productInfoGuideStepCount === 1 ? "z-40" : null} relative rounded-md bg-white`}>
                        <p className={`text-blue-500 font-bold`}>Hurry!!! Offer closes soon</p>
                    </div>
                    <p className='text-base'>Product Description</p>
                    <div className={`${productInfoGuideStepCount === 2 ? "z-40" : null} flex relative bg-white sm:justify-end rounded-md sm:ml-6`}>
                        <p className='text-gray-400'>45 people near you ordered this item</p>
                    </div>
                    <p className='text-xl text-blue-500 font-bold'>Ratings</p>
                    <div className='md:flex md:justify-between items-center'>
                        <div className={`${productInfoGuideStepCount === 2 ? "z-40" : null} relative bg-white rounded-md text-blue-500`}>
                            70% of the users found this very useful
                        </div>
                        <div className="flex text-xl text-yellow-500">
                            <IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarHalf/>
                        </div>
                    </div>
                    <div className='bg-gray-100 rounded-md p-2 mt-2'>
                        <div className='flex items-center'>
                            <div className="text-xl rounded-full bg-green-200 text-green-500 p-1">AR</div>
                            <div className='flex items-center mx-2 text-yellow-500'><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarOutline/><IoMdStarOutline/></div>
                        </div>
                        <div className='px-2 py-2'>This is a very useful product</div>
                    </div>
                    <div className='bg-gray-100 rounded-md p-2 mt-2'>
                        <div className='flex items-center'>
                            <div className="text-xl rounded-full bg-red-200 text-red-500 p-1">PM</div>
                            <div className='flex items-center mx-2 text-yellow-500'><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarHalf/></div>
                        </div>
                        <div className='px-2 py-2'>Satisfied with the product</div>
                    </div>
                </div>
            </div>
            </> :
            <div className='bg-white rounded-md shadow-xl mx-8 md:mx-40 mt-8 md:mt-12'>
                <p className='flex justify-center md:pt-4 pt-8 md:text-2xl'>This short demo covers most used deceptive patterns in action</p>
                <div className="flex justify-center"><button className='flex justify-center border-2 border-blue-800 hover:bg-blue-800 hover:text-white px-6 py-2 my-4 rounded-md' onClick={handleStartClick}>Get Started</button></div>
            </div>
        }
    </>
  )
}

export default Demo