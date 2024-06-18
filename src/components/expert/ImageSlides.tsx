import React from 'react'
import { IoMdClose } from 'react-icons/io';

interface ImageSliderProops {
    image?: string | File;
    isOpen : boolean;
    onClose : () => void;
}

const ImageSlides:React.FC<ImageSliderProops> = ({image, isOpen, onClose})  => {
    if(!isOpen) return null
    let imageElement = null;

    if (typeof image === 'string') {
        imageElement = <img src={image} className='w-fit p-5 h-fit border-2 border-gray-200' alt='Preview' />;
    } else if (image instanceof File) {
        const imgSrc = URL.createObjectURL(image);
        imageElement = <img src={imgSrc} className='w-fit p-5 h-fit border-2 border-gray-200' alt='Preview' />;
    }
    return (
      <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white sm:p-8 sm:rounded-lg relative z-[50] sm:space-y-8 w-full h-full sm:w-4/5 sm:h-4/5 overflow-auto flex justify-center items-center '>
              <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 right-2 text-black-500 cursor-pointer bg-gray-200 rounded-full shadow-xl hover:bg-blue-300"
              >
                  <IoMdClose
                      className="p-2 text-4xl font-bold"
                  />
              </button>
              <div className="flex justify-center">{imageElement}</div>
          </div>
      </div>
    )
}

export default ImageSlides