import React, { useEffect, useState, useContext, useCallback } from 'react'
import { getWebsites, getKpiDetails } from '../../services/expertServices'
import Navbar from '../../components/expert/Navbar';
import { useNavigate } from 'react-router-dom';
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";
import withExpertAuth from '../../hoc/withExpertAuth';
import { toast } from "react-toastify";
import { ExpertKpi, WebsiteData } from '../../types';
import { Tooltip } from '@mui/material';
import KpiCard from '../../components/expert/KpiCard';
import LoadingExpertDashboard from '../../components/expert/LoadingExpertDashboard';
import WebsiteAdditionForm from '../../components/expert/WebsiteAdditionForm';

const ExpertDashboard : React.FC = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        setRedirectCallback(() => {
          authContext?.logoutUser();
        });
    
        return () => {
          setRedirectCallback(null);
        };
    }, [authContext]);
    const [websiteData, setWebsiteData] = useState<WebsiteData[]>([])
    const [kpiData, setKpiData] = useState<ExpertKpi[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const id  = localStorage.getItem("userId")
    const authToken = localStorage.getItem("authToken")
    const getWebsiteData = useCallback( async () => {
        setIsLoading(true);
        setWebsiteData([]);
        try {
            if(id && authToken){
                let websites : any = []
                websites = await getWebsites(id);
                let kpis:ExpertKpi[] = await getKpiDetails(id);
                setKpiData(kpis);
                setWebsiteData(websites);
                setIsLoading(false)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
              } else {
                toast.error("An unknown error occurred.");
            }
        }
    },[id,authToken])

    useEffect(()=>{
        getWebsiteData();
    },[getWebsiteData])

    const handleClick = (id:string, websiteName: string) => {
        sessionStorage.setItem("websiteId", id);
        sessionStorage.setItem("websiteName", websiteName);
        navigate('/expert/website')
    }
    const handleClose = () => {
        setIsFormOpen(false);
        getWebsiteData();
    }
    const handleOpen = () => {
        setIsFormOpen(true)
    }

  return (
    <>
        <Navbar/>
        {isLoading ? <LoadingExpertDashboard/> :
        <>
        <WebsiteAdditionForm isOpen={isFormOpen} onClose={handleClose} id={id ?id: ""}/>
        <div className='grid md:grid-cols-4 gap-4 mx-8 my-6 bg:white'>
            {kpiData.map((kpi:ExpertKpi) => (
                <KpiCard title={kpi.title} count={kpi.count} color={kpi.color}/>
            ))}
        </div>
        <div className='flex justify-between items-center mx-8'>
            <h2 className='text-3xl text-blue-500'>Websites in evaluation for Dark Patterns</h2>
            <button className='ml-6 px-12 py-2 border-[1px] border-blue-500 rounded-xl text-md hover:bg-blue-500 hover:text-white' onClick={handleOpen}>Add website for Dark Pattern evaluation</button>
        </div>
        <div className='grid md:grid-cols-3 mx-8 my-2 bg:white'>
            {websiteData.map((website, index)=>(
                <div key={website.websiteId} 
                    className='p-3 my-3 mx-4 shadow-md bg-white rounded-xl border-blue-300 cursor-pointer'  
                >
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className='font-bold text-xl text-blue-500'>{website.websiteName}</h2>
                            <Tooltip title={website.hoverText} arrow>
                                <div className={`p-2 font-bold text-white rounded-2xl ${website.phaseColor}`}>{website.phaseText}</div>
                            </Tooltip>
                        </div>
                        <div className='w-60'><p className="truncate ... text-blue-500">{website.baseUrl}</p></div>
                        <button 
                            className='w-full my-4 py-1 px-2 border-2 border-blue-500 rounded-xl font-bold hover:bg-blue-300'
                                onClick={() => handleClick(website.websiteId, website.websiteName)}
                            >Website Dashboard
                        </button>
                    </div>
                </div>
            ))}
        </div></>}
    </>
  )
}

export default withExpertAuth(ExpertDashboard)