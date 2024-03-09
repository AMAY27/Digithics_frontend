import React from 'react'
import { postVerification, getSpecificPattern } from '../../services/expertServices';
import { useExpertContext } from '../../context/ExpertContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerifyPatternProps } from '../../types';

const ConfirmVerifyModal: React.FC<VerifyPatternProps> = ({isOpen, onClose, patternExists, expertId}) => {
    const { patternData, setPatternData } = useExpertContext();
    const handleVerifySubmit = async() => {
        try {
          const response = await postVerification(patternData.websiteId, patternData.id, expertId, patternExists);
          if(response === 200){
            onClose();
            toast.success("Verified Successfully", {
              position: toast.POSITION.TOP_CENTER
            });
            const data = await getSpecificPattern(patternData.id , patternData.websiteId);
            if(data){
              data.phaseColor = data.patternPhase === "InProgress" ? "#F9C32F" : data.patternPhase === "Verified" && data.isPatternExists === true ? "#E6321D" : "#538D3F";
              setPatternData(data)
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error("An unknown error occurred.");
          }
        }
      }
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white px-4 py-2 rounded-lg relative z-[50] w-80 h-40'>
            <div className='flex justify-center pt-2'>
                <div className='font-bold text-blue-500'>Are you sure you want to complete verification ?</div>
            </div>
            <div className="flex mt-8">
                <button className='w-1/2 p-2 bg-white border-2 border-blue-500 mr-2 rounded-xl hover:bg-green-300' onClick={handleVerifySubmit}>Yes</button>
                <button className='w-1/2 p-2 bg-white border-2 border-blue-500 rounded-xl hover:bg-red-300' onClick={onClose}>No</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmVerifyModal