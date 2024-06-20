import React, { useState } from 'react'
import { useExpertContext } from '../../context/ExpertContext'
import { Avatar, IconButton} from '@mui/material';
import { Info } from "@mui/icons-material";
import { stringAvatar } from '../../services/expertServices';
import { patternSupportLinks } from '../../utils/patternSupportLinks';



interface websiteDetailsProps {
    experts : string[],
    patternTypes : string[],
    handleSelectOption: (filterType : string,option: string) => void
}

const WebsiteDetailsForWebsiteDashboard: React.FC<websiteDetailsProps> = ({experts, patternTypes, handleSelectOption}) => {
    const { websiteData, setWebsiteData } = useExpertContext();
    const expertName = localStorage.getItem("userName");
    const [supportUrl, setSupportUrl] = useState<string>("https://www.deceptive.design/types/fake-scarcity");


    const patternSupportUrl = (supportUrl:string) => {
        setSupportUrl(supportUrl);
    }
  return (
    <div className='mt-3 lg:hidden'>
        <div className='w-full bg-gray-200 py-2 px-2 mt-2 rounded-lg'>
            <h2 className='font-bold'>Description</h2>
            <p>{websiteData.description}</p>
        </div>
        <div className='w-full my-2 space-y-2'>
            <h2 className='font-bold'>Filters</h2>
            <div className='flex items-center'>
                <div className='text-sm sm:text-base w-1/2'>
                    <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Contributor</label>
                    <select id="orient" 
                        className='p-1 sm:p-2 bg-transparent border-2 rounded-md'
                        onChange={(e) => handleSelectOption('expertName', e.target.value)}
                    >
                        <option value="">All</option>
                        {experts.map((expert)=>(
                            expert === expertName ? <option value={expert}>You</option> : <option value={expert}>{expert}</option>
                        ))}
                    </select>
                </div>
                <div className='text-sm sm:text-base w-1/2'>
                    <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Pattern Type</label>
                    <select id="orient" 
                      className='p-1 sm:p-2 bg-transparent border-2 rounded-md'
                      onChange={(e) => handleSelectOption('patternType', e.target.value)}
                      >
                      <option value="">All</option>
                      {patternTypes.map((type)=>(
                          <option value={type}>{type}</option>
                      ))}
                    </select>
                </div>
            </div>
        </div>
        <div className='w-full rounded-lg mt-2 p-2'>
            <h2 className='font-bold'>Contributor</h2>
            {websiteData.expertDetails.map((expert)=>(
                <div className='flex items-center my-2'><Avatar {...stringAvatar(expert.name)} className='mx-2'/>{expert.name}</div>
            ))}
        </div>
        <h2 className='font-bold py-2 px-2'>Dark Pattern References</h2>
        <div className='flex bg-transparent border-2 rounded-xl px-4'>
            <select id="orient" 
                className='p-2 rounded-md w-full cursor-pointer'
                onChange={(e) => patternSupportUrl(e.target.value)}
                >
                {patternSupportLinks.map((url)=>(
                    <option value={url.patternUrl}>{url.patternName}</option>
                ))}
            </select>
            <IconButton
              aria-label="feedback-details"
              size="small"
              color="primary"
              href={supportUrl}
              target="_blank"
            >
              <Info />
            </IconButton>
        </div>
    </div>
  )
}

export default WebsiteDetailsForWebsiteDashboard