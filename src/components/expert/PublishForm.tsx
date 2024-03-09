import React, { useState } from 'react'
import { PublishModalProps , PatternData} from '../../types'
import { publishWebsite } from '../../services/expertServices'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublishForm:React.FC<PublishModalProps> = ({isOpen, onClose, patterns, expertId, websiteId}) => {
    const [feedback, setFeedback] = useState<string>("")
    const handlePublish = async() => {
        const contsinsDarkPattern = patterns.some((pattern:PatternData)=>
        pattern.isPatternExists
        )
        const isCertified = !contsinsDarkPattern
      
      try {
        const resp = await publishWebsite(websiteId, expertId,isCertified, feedback)
        if(resp===200){
            toast.success("Website Published Successfully", {
                position: toast.POSITION.TOP_CENTER
            });
        }
      } catch (error) {
        if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error("An unknown error occurred.");
        }
      }
    }
    if(!isOpen){return null}
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white px-4 py-2 rounded-lg relative z-40 w-2/5 h-2/5'>
            <div className='flex justify-center pt-2'>
                <div className='font-bold text-blue-500 text-xl'>Publish Website</div>
            </div>
            <div className="mt-8">
                <form onSubmit={handlePublish}>
                    <div className='mx-6'>
                        <label htmlFor="feedback" className='font-bold'>
                            Final Feedback
                        </label>
                        <textarea 
                            name="description" 
                            id="patterndescription"
                            onChange={(e) => setFeedback(e.target.value)}
                            className='mt-2 w-full block h-10 rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-blue-300' 
                            placeholder='Enter final feedback'>
                        </textarea>
                    </div>
                    <div className='flex m-6'>
                        <button className='w-1/2 p-2 bg-white border-2 border-blue-500 mr-2 rounded-xl hover:bg-green-300' type='submit'>Publish</button>
                        <button className='w-1/2 p-2 bg-white border-2 border-blue-500 rounded-xl hover:bg-red-300' onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PublishForm