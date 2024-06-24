import React from 'react'
interface ProductInfoGuideProps {
    onClose : () => void,
    isOpen : Boolean,
    stepCount : Number,
    nextStepChange : () => void
}

const ProductInfoGuide: React.FC<ProductInfoGuideProps> = ({onClose, isOpen, stepCount, nextStepChange}) => {
    if(!isOpen){
        return null
    }
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 z-10">
        <div className="px-4 py-2 relative z-10 mx-2 md:mx-7 my-2 md:my-4 rounded-lg border-2 border-cyan-300 bg-cyan-950 md:w-1/3">
            <div className='flex justify-between items-center'>
                {stepCount===1 ? 
                <><h2 className='text-lg sm:text-xl text-white font-bold'>Fake Urgency and Fake Scarcity</h2></> : 
                <><h2 className='text-lg sm:text-xl text-white font-bold'>Fake Social Proof</h2></>}
                <div className='flex space-x-4'>
                    <button className='rounded-md text-white py-1 px-2 border-2 border-cyan-300 hover:bg-blue-800 text-lg' onClick={nextStepChange}>&gt;</button>
                    <button className='rounded-md text-white py-1 px-2 border-2 border-cyan-300 hover:bg-blue-800 text-lg' onClick={onClose}>X</button>
                </div>
            </div>
            {stepCount === 1 ? 
                <div>
                    <p className='text-sm sm:text-base text-white'>
                        The kind of texts highlighted demonstrates two kinds of deceptive patterns which are Fake Scarcity and Fake Urgency. These kind of texts create a sense of urgency in user's mind and user tends to spend more then they intent to.
                    </p> 
                    <span  className='text-sm sm:text-base text-cyan-300 font-bold'>Now in the next step buy some products to explore other types of deceptive patterns.</span>
                </div> : 
                stepCount === 2 ? 
                <div>
                    <p className="text-sm sm:text-base text-white">
                        Testing the step div
                    </p>
                </div> :
                <div>
                    <p className='text-white'>
                        The kind of texts highlighted demonstrates two kinds of deceptive patterns which are Fake Scarcity and Fake Urgency. These kind of texts create a sense of urgency in user's mind and user tends to spend more then they intent to.
                    </p> 
                    <span  className='text-cyan-300 font-bold'>Now in the next step buy some products to explore other types of deceptive patterns.</span>
                </div>
            }
        </div>
    </div>
  )
}

export default ProductInfoGuide