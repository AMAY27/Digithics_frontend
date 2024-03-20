import React, { useState } from 'react'
import { WebsiteAdditionProps, WebsiteDetailsFormForExperts } from '../../types'
import { addWebsiteForCertificationforExpert } from '../../services/expertServices'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WebsiteAdditionForm:React.FC<WebsiteAdditionProps>= ({isOpen, onClose, id}) => {

    const [webSiteDetails, setWebsiteDetails] = useState<WebsiteDetailsFormForExperts>({
        userId: id,
        baseUrl: "",
        websiteName: "",
        description: "",
        primaryExpertId : id
    })

    const handleCloseClick = () =>{
        onClose();
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setWebsiteDetails(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        if(id){
            const response = await addWebsiteForCertificationforExpert(webSiteDetails ); 
            if(response.status===201){
                onClose();
                toast.success("Website added successfully", {
                    position: toast.POSITION.TOP_CENTER
                });
                setWebsiteDetails({
                    baseUrl : id,
                    userId : "",
                    websiteName : "",
                    description : "",
                    primaryExpertId : id
                })
            }
            else{
                toast.error("Error while adding pattern, try again", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    }

    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white py-2 px-8 rounded-lg relative z-10 space-y-8 h-3/5 w-3/5 overflow-auto'>
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 pt-5">
                <h2 className='text-2xl text-blue-500 leading-7'>Add a Website</h2>
                <div className='grid md:grid-cols-3 space-x-4'>
                    <div className='col-span-1'>
                        <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Website Name *</label>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                            <input 
                                type='text' 
                                name='websiteName'
                                required 
                                id='websitename' 
                                value={webSiteDetails.websiteName}
                                onChange={handleChange}
                                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Website Name"/>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Link *</label>
                        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                            <input 
                                type='text' 
                                name='baseUrl' 
                                id='websitelink'
                                required
                                value={webSiteDetails.baseUrl}
                                onChange={handleChange} 
                                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Link"/>
                        </div>
                    </div>
                </div>
                <div className='col-span-full'>
                    <label htmlFor="patterndescription" className='mb-2 block text-md font-medium'>Description *</label>
                    <textarea 
                        name="description" 
                        id="websitedescription"
                        value={webSiteDetails.description}
                        onChange={handleChange}
                        required
                        className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' placeholder='Short description for Website'></textarea>
                </div>
                            {/* <div className='col-span-full border-2 rounded-md flex flex-col items-center justify-center'>
                                <p className='mb-4 block text-md font-medium pt-4'>Select images from the pattern list from extension</p>
                                {/* <label htmlFor="images" className='mb-2 block text-md font-medium p-2 bg-gray-100 mb-4 rounded-md cursor-pointer'>
                                    <span className="text-blue-500">Choose File</span>
                                    <input
                                        type='file'
                                        name='images'
                                        id='images'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        multiple 
                                        className='hidden'
                                    />
                                </label>
                                {images.length > 0 && (
                                    <div className="my-2 px-6 grid grid-cols-4 gap-4 w-full">
                                        {images.map((image, index) => {
                                        //const file = formData.get('files') as File
                                        return(
                                            <div key={index} className={`relative ${z_index}`}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-md border-2 border-gray-200 opacity-50 cursor-pointer"
                                                    onClick={()=>handleAddedImageClick(image)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageDelete(index)}
                                                    className="absolute top-0 right-0 text-black-500 cursor-pointer bg-gray-200 rounded-full shadow-xl hover:bg-blue-300"
                                                >
                                                    <IoMdClose
                                                        className="p-1 text-2xl font-bold"
                                                    />
                                                </button>
                                            </div>)
                                        })}
                                    </div>
                                )}
                            </div> */}
                            <div className='grid md:grid-cols-3 space-x-7'>
                                <button className='col-span-2 border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white p-3 rounded-lg' type='submit'>Add website for review</button>
                                <button className='col-span-1 p-3 rounded-lg hover:bg-gray-300' onClick={handleCloseClick}>Close</button>
                            </div>
                        </div>
                    </form>
        </div>
    </div>
  )
}

export default WebsiteAdditionForm