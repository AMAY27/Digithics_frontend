import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { useExpertContext } from '../../context/ExpertContext'
import { extensionImages } from '../../types';

interface ImageCarouselProops {
    image?: File;
    isOpen : boolean;
    patternTime : number;
    imageTime : number;
    onClose : () => void;
}

const ImageCarousel:React.FC<ImageCarouselProops> = ({image, isOpen, patternTime, imageTime, onClose}) => {
    const { extensionPatterns, setExtensionPatterns } = useExpertContext();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingEnabled, setDrawingEnabled] = useState<boolean>(false);
    const [startPoint, setStartPoint] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
    const [endPoint, setEndPoint] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
    const [color, setColor] = useState<string>("black")
    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && image && canvas) {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = URL.createObjectURL(image);
            context.lineCap = "round";
            context.lineWidth = 10;
            context.strokeStyle = color;
            contextRef.current = context;
        }
        // eslint-disable-next-line
    },[image])

    const handleImageSubmitAfterEdit = async () => {
        
        const canvas = canvasRef.current;
        let imgObj:extensionImages
        if (canvas) {
            const imageDataUrl = canvas.toDataURL(); 
            const base64 = imageDataUrl.replace(/^data:image\/?[A-z]*;base64,/,"");
            imgObj = {
                name: "image",
                timestamp:Date.now(),
                file_base64: base64.toString()
            }
        }
        const updatedPatterns = extensionPatterns.map((expats) => {
            if (expats.patternTime === patternTime) {
                const filteredImages = expats.patternimages.filter((img) => img.timestamp !== imageTime);
                return {
                    ...expats,
                    patternimages: filteredImages.concat(imgObj ? [imgObj] : [])
                };
            }
            return expats;
        });
        setExtensionPatterns(updatedPatterns);
        window.postMessage({action : 'updateDatainStorage', updatedData : extensionPatterns},'*')
        setDrawingEnabled(false);
        onClose();
    };

    const handleSelectOption = (color: string) => {
        setColor(color)
    };

    const drawRectangle = (startX:number, startY:number, endX:number, endY:number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if(context && canvas && image){
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 5
            context.rect(startX, startY, endX - startX, endY - startY);
            context.stroke();
        }
    }

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawingEnabled) return;
        //const { offsetX, offsetY } = event.nativeEvent;
        //contextRef.current?.beginPath();
        //contextRef.current?.moveTo(offsetX, offsetY);
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        setIsDrawing(true);
        if (startPoint.x === null && startPoint.y === null) {
            setStartPoint({ x: offsetX, y: offsetY });
        }
    }
    const finishDrawing = () => {
        setIsDrawing(false);
        if (startPoint && endPoint && startPoint.x !== null && startPoint.y !== null && endPoint.x !== null && endPoint.y !== null) {
            drawRectangle(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            setStartPoint({ x: null, y: null });
            setEndPoint({ x: null, y: null });
        }
    }
    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        // if (!isDrawing || !drawingEnabled) {
        //     return;
        // }
        // const { offsetX, offsetY } = event.nativeEvent;
        // contextRef.current?.lineTo(offsetX, offsetY);
        // contextRef.current?.stroke();
        if (!isDrawing || !drawingEnabled) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        setEndPoint({ x: offsetX, y: offsetY });
    }
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    const toggleDrawing = () => {
        setDrawingEnabled((prev) => !prev);
    };
    const clearDrawing = () => {
        if (contextRef.current) {
            contextRef.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            const img = new Image();
            img.onload = () => {
                contextRef.current!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
            if(image){
                img.src = URL.createObjectURL(image)
            }
        }
    };
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white rounded-lg relative z-50 space-y-8 w-4/5 h-4/5 overflow-auto'>
            <div className='sticky top-0 left-0 right-0 flex items-center justify-between w-100 p-4 bg-gray-200'>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={toggleDrawing}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
                    >
                        {drawingEnabled ? "Pause Drawing" : "Start Drawing"}
                    </button>
                    <button
                        type="button"
                        onClick={clearDrawing}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Clear Drawing
                    </button>
                    <div className='mx-4 flex items-center'>
                        {/* <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Stroke Color</label> */}
                        <select id="orient" 
                            className='p-2 bg-white rounded-md w-40'
                            onChange={(e) => handleSelectOption(e.target.value)}
                        >
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={handleImageSubmitAfterEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                </div>
                <button
                    type="button"
                    onClick={()=>{
                    onClose();
                    clearCanvas();
                    }}
                    className="text-black-500 cursor-pointer bg-gray-200 rounded-full shadow-xl hover:bg-blue-300"
                >
                    <IoMdClose
                        className="p-2 text-4xl font-bold"
                    />
                </button>
            </div>
            {/* <div className="flex justify-center">{image && <img src={URL.createObjectURL(image)} className='w-fit p-5 h-fit border-2 border-gray-200' alt='Preview'/>}</div> */}
            <canvas
                className='border-4 m-4'
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseLeave={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    </div>
  )
}

export default ImageCarousel