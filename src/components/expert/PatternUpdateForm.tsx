import React from 'react'
import { useExpertContext } from '../../context/ExpertContext';
interface PatternUpdateProps {
    isOpen : boolean,
    onClose : () => void
}

const PatternUpdateForm: React.FC<PatternUpdateProps> = ({ isOpen, onClose }) => {
    const { patternData } = useExpertContext();
    if(!isOpen) return null
  return (
    <div className='space-y-4 px-4'>
                  <div>
                    <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Pattern Type</label>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-300'>
                      <input 
                        value={patternData.patternType}
                        type='text' 
                        name='patterntype' 
                        id='patterntype' 
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Pattern Type"/>
                    </div>
                  </div>
                  <div className='col-span-half'>
                    <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Link</label>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                      <input 
                        value={patternData.detectedUrl}
                        type='text' 
                        name='patternlink' 
                        id='patternlink'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Link where pattern is detected"/>
                    </div>
                  </div>
                  <div className='col-span-full'>
                    <label htmlFor="patterndescription" className='mb-2 block text-md font-medium'>Description</label>
                    <textarea 
                      value={patternData.description}
                      name="description" 
                      id="patterndescription"
                      className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' placeholder='Short description for pattern detection and review'></textarea>
                  </div>
                  <div className='space-x-4 border-b-2 pb-4 flex justify-start'>
                    <button className='bg-blue-300 p-2 rounded-lg' type='submit'>Save Changes</button>
                    <button className='hover:bg-gray-200 p-2 rounded-lg' type='submit' onClick={onClose}>Cancel</button>
                  </div>
                  </div>
  )
}

export default PatternUpdateForm