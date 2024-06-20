import React, {useState} from 'react'
import { patternPost, base64DataToFile } from '../../services/expertServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PatternAdditionFormProps } from '../../types';
import { IoMdClose, IoMdAdd  } from 'react-icons/io';
import ImageCarousel from './ImageCarousel';
import api from '../../utils/AxiosHelper';
import { Tooltip } from '@mui/material';
import { useExpertContext } from '../../context/ExpertContext'
import ImageSlides from './ImageSlides';
import { patternSupportLinks } from '../../utils/patternSupportLinks';


const PatternAdditionForm: React.FC<PatternAdditionFormProps> = ({isOpen, onClose}) => {
    const { extensionPatterns } = useExpertContext();
    const websiteId = sessionStorage.getItem("websiteId");
    const experId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const [formData, setFormData]  = useState({
        description : "",
        patternlink : "",
    })
    const [patternType, setPatternType] = useState<string>("Fake scarcity")
    const [images, setImages] = useState<File[]>([]);
    const [imgToDisplay, setImgToDisplay] = useState<File>();
    const [formImageToDisplay, setFormImageToDisplay] = useState<File>();
    const [formImgOpen, setFormImageOpen] = useState<boolean>(false);
    const [imgOpen, setImageOpen] = useState<boolean>(false);
    const [zIndex, setZindex] = useState<boolean>(false);
    const z_index = zIndex ? "-z-50" : "z-0";
    const [patternTime, setPatternTime] = useState<number>()
    const [imageTime, setImageTime] = useState<number>();
    const [browseImage, setBrowseImage] = useState<File>();
    const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        setFormData(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleSelectPatternType = (patterntype:string) =>{
        setPatternType(patterntype)
    }

    const handleImageDelete = (index: number) => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages.splice(index, 1);
          return newImages;
        });
      };


    const handleAddedImageClick = (img:File) => {
        setFormImageToDisplay(img);
        setFormImageOpen(true);
        setZindex(true);
    }

    const handleExtImageClick = (base64:string, patternTime:number, imageTime:number, index:number) => {
        const file = base64DataToFile(base64, index); 
        setPatternTime(patternTime);
        setImageTime(imageTime)
        setImgToDisplay(file)
        setImageOpen(true);
        setZindex(true);
    }

    // const browsedImageEditClick = (image:File) => {
    //     setPatternTime(image.lastModified);
    //     setImageTime(image.lastModified);
    //     setImgToDisplay(image);
    //     setImageOpen(true);
    //     setZindex(true);

    // }

    const handleFormImageClose = () => {
        setFormImageOpen(false);
        setZindex(false);
    }

    const handleImageClose = () => {
        setImageOpen(false);
        setZindex(false);
    }

    const extensionImageAddToSenderList = (base64: string,  index:number) => {
        const file = base64DataToFile(base64,index)
        const imageExists = images.some((img) => img.name === file.name);
        imageExists ? toast.error("image already added") : setImages((prev) => [...prev, file])
    }

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const browsedImages = e.target.files;
        console.log(browsedImages);
        if(browsedImages){
            const browsedImagesArray = Array.from(browsedImages)
            console.log(browsedImagesArray);
            browsedImagesArray.forEach((img)=>{
                const imageExists = images.some((prevImages) => prevImages.name === img.name);
                imageExists ? toast.error("image Already added") : setImages((prev) => [...prev, img])
            })
        }
        console.log(images);
        // const imageExists = images.some((img)=> img.name === browsedImg.name);
        // imageExists ? toast.error("image already added") : setImages((prev) => [...prev, browsedImg])
    }

    const handleAddclickExtensionPattern = (patternType:string, patternUrl: string, patternDesc:string) => {
        setFormData({
            description : patternDesc,
            patternlink : patternUrl
        })
        setPatternType(patternType)
    }

    const handleCloseClick = () => {
        setFormData({
            description : "",
            patternlink : "",
        })
        setPatternType("")
        setImages([]);
        onClose();
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setIsSubmitClicked(true)
        if(websiteId && experId && token){
            const response = await patternPost(websiteId,experId, patternType, formData.description, formData.patternlink ); 
            if(response.status === 200){
                try {
                    const files = new FormData();
                    images.forEach((file) =>{
                        files.append("files", file)
                    })
                    //const formData = new FormData()
                    const config = {
                        headers : {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                    const body = files
                    const imgResponse = await api.put(`/website/${response.data.patternId}/uploadImages`, body, config);
                    if(imgResponse.status===200){
                        //onClose();
                        toast.success("Pattern added successfully", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        setIsSubmitClicked(false)
                        setFormData({
                            description : "",
                            patternlink : ""
                        })
                        setPatternType("")
                        setImages([])
                    }else{
                        toast.error("Error while adding pattern, try again", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Error while adding pattern, try again", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }
        }
    }
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white py-2 px-4 sm:px-8 rounded-lg relative z-10 space-y-4 h-full w-full sm:h-4/5 sm:w-4/5 overflow-auto'>
            <ImageCarousel image={imgToDisplay} isOpen={imgOpen} patternTime={patternTime?patternTime:0} imageTime={imageTime?imageTime:0} onClose={handleImageClose}/>
            <ImageSlides image={formImageToDisplay} isOpen={formImgOpen} onClose={handleFormImageClose}/>
            <>
            <div className="flex items-center justify-end">
                <IoMdClose
                    onClick={handleCloseClick}
                    className="hover:bg-blue-200 rounded-lg p-2 text-4xl"
                />
            </div>
            <h2 className='text-lg text-blue-500 font-bold leading-7'>Contribute a Pattern</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                <div className='col-span-1 md:col-span-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2 sm:space-y-4">
                            <div className='md:grid md:grid-cols-3 md:space-x-4'>
                                <div className='col-span-1'>
                                    <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Pattern Type *</label>
                                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2'>
                                        {/* <input 
                                            type='text' 
                                            name='patterntype'
                                            required 
                                            id='patterntype' 
                                            value={formData.patterntype}
                                            onChange={handleChange}
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Pattern Type"/> */}
                                        <select 
                                            id="patterntype" 
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            name='patterntype'
                                            onChange={(e)=>handleSelectPatternType(e.target.value)}
                                        >
                                            {patternSupportLinks.map((url)=>(
                                                <option value={url.patternName}>{url.patternName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Link *</label>
                                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2'>
                                        <input 
                                            type='text' 
                                            name='patternlink' 
                                            id='patternlink'
                                            required
                                            value={formData.patternlink}
                                            onChange={handleChange} 
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Link where pattern is detected"/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-full'>
                                <label htmlFor="patterndescription" className='mb-2 block text-md font-medium'>Feedback *</label>
                                <textarea 
                                    name="description" 
                                    id="patterndescription"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2' placeholder='Short description for pattern detection and review'></textarea>
                            </div>
                            <div className='col-span-full border-2 rounded-md flex flex-col items-center justify-center px-4'>
                                <p className='mb-4 block text-center font-medium pt-4'>Select images from the pattern list from extension or</p>
                                <label htmlFor="images" className='mb-2 block text-md font-medium p-2 bg-gray-100 mb-4 rounded-md cursor-pointer'>
                                    <span className="text-blue-500">Browse Images</span>
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
                                    <div className="my-2 px-6 sm:grid grid-cols-4 gap-4 w-full">
                                        {images.map((image, index) => {
                                        //const file = formData.get('files') as File
                                        return(
                                            <div key={index} className={`relative ${z_index}`}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-md border-2 border-gray-200 opacity-50 cursor-pointer"
                                                    onClick={() => handleAddedImageClick(image)}
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
                            </div>
                            <div className='space-x-7'>
                                <button className='flex items-center justify-center col-span-2 bg-blue-300 p-3 rounded-lg w-full' type='submit' disabled={isSubmitClicked}>{isSubmitClicked ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>) : "Submit Pattern"}</button>
                                {/* <button className='col-span-1 bg-blue-300 p-3 rounded-lg' onClick={handleCloseClick}>Close</button> */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className='hidden md:block md:col-span-2 border-2 p-4 h-[30rem] overflow-auto'>
                    <div className='border-b-2 pb-2'><h1 className='text-lg text-blue-500 font-bold'>Pattern Details from DIGIHICS extension</h1></div>
                    <div className='pb-4'> 
                        {extensionPatterns.length===0 ? 
                        <div className="flex justify-center items-center h-20 bg-gray-100 shadow-md rounded-md my-4"><h2>No patterns added from extension</h2></div> : 
                        extensionPatterns.map((expats)=> (
                            <div className={`relative shadow-lg m-3 ${z_index} rounded-lg`}>
                                <p className='text-md font-bold px-4 pt-2'>Pattern type : {expats.patternType}</p>
                                <p className='text-md pt-1 px-4'>{expats.patternDesc}</p>
                                <p className="truncate ... px-4 pt-1 pb-2 text-blue-500">Detected At: {expats.patternUrl}...</p>
                                <Tooltip title="Add pattern for transfer"><button
                                    type="button"
                                    onClick={() => handleAddclickExtensionPattern(expats.patternType, expats.patternUrl, expats.patternDesc)}
                                    className="absolute top-0 right-0 rounded-tr-lg bg-gray-100 text-black-500 cursor-pointer hover:bg-blue-300"
                                >
                                    <IoMdAdd 
                                        className="p-1 text-3xl"
                                    />
                                </button></Tooltip>
                                <div className='grid md:grid-cols-2 gap-4 mt-3 mx-3 pb-5'>
                                    {expats.patternimages.map((eximages, index)=>(
                                        <div key={index} className={`relative ${z_index} col-span-1`}>
                                            <img src={`data:image/png;base64,${eximages.file_base64}`} 
                                                alt='extension snapshots' 
                                                className="h-20 w-full object-cover rounded-md border-2 cursor-pointer"
                                                onClick={()=>handleExtImageClick(eximages.file_base64, expats.patternTime, eximages.timestamp, index)}
                                            />
                                            <Tooltip title="Add image to send with pattern"><button
                                                type="button"
                                                onClick={() => extensionImageAddToSenderList(eximages.file_base64, index)}
                                                className="absolute top-0 right-0 text-black-500 cursor-pointer bg-gray-200 rounded-full shadow-xl hover:bg-blue-300"
                                            >
                                            <IoMdAdd 
                                                className="p-1 text-2xl font-bold"
                                            />
                                            </button></Tooltip>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer/>
            </>
        </div>
    </div>
    
  )
}

export default PatternAdditionForm