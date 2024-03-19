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
import PatterndivforWebsitCarousel from '../../components/expert/PatterndivforWebsitCarousel';

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
    const [activePatternIndex, setActivePatternIndex] = useState(0);
    const [websiteIdforPatternCarouselShift, setWebsiteIdforPatternCarouselShift] = useState("");

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

    const handleNextPatternClick = () => {
        setActivePatternIndex(activePatternIndex + 1);
    }

  return (
    <>
        <Navbar/>
        {isLoading ? <LoadingExpertDashboard/> :
        <>
        <WebsiteAdditionForm isOpen={isFormOpen} onClose={handleClose} id={id ?id: ""}/>
        <div className='grid grid-cols-1 md:grid-cols-3 md:mt-8 mt-4 md:mx-40 mx-4'>
            <div className='col-span-1 md:col-span-2'>
                <div className='md:flex justify-between items-center mx-8 shadow-xl bg-white mb-4 p-8 rounded-xl'>
                    <h2 className='flex text-center text-xl text-blue-500'>Websites in evaluation for Dark Patterns</h2>
                    <button className='ml-6 px-12 py-2 border-[1px] border-blue-500 rounded-xl text-md hover:bg-blue-500 hover:text-white' onClick={handleOpen}>Add website for Dark Pattern evaluation</button>
                </div>
                <div className='grid md:grid-cols-1 mx-8 my-2 bg:white'>
                    {websiteData.map((website, index)=>(
                        <div key={website.websiteId} 
                            className='p-3 my-3 shadow-md bg-white rounded-xl border-blue-300 cursor-pointer'  
                        >
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className='font-bold text-xl text-blue-500'>{website.websiteName}</h2>
                                    <Tooltip title={website.hoverText} arrow>
                                        <div className={`p-2 font-bold text-white rounded-2xl ${website.phaseColor}`}>{website.phaseText}</div>
                                    </Tooltip>
                                </div>
                                <div className='w-60'><p className="truncate ... text-blue-500">{website.baseUrl}</p></div>
                                {website.patternDetails.length !== 0 ? 
                                    <div className='flex bg-green-100 mt-4 py-6'>
                                        <button>Prev</button>
                                        <PatterndivforWebsitCarousel comments={website.patternDetails[activePatternIndex].comments} description={website.patternDetails[activePatternIndex].description} expertName={website.patternDetails[activePatternIndex].expertName} patternImageUrls={website.patternDetails[activePatternIndex].patternImageUrls} patternType={website.patternDetails[activePatternIndex].patternType}/>
                                        <button onClick={handleNextPatternClick}>Next</button>
                                    </div> : 
                                    <div className='bg-gray-100 flex justify-center items-center mt-4 py-6 px-8 w-full'>
                                        <h2 className='text-blue-500 '>No Pattern detetcted yet for this website</h2>
                                    </div>
                                }
                                <button 
                                    className='w-full my-4 py-1 px-2 border-2 border-blue-500 rounded-xl font-bold hover:bg-blue-300'
                                    onClick={() => handleClick(website.websiteId, website.websiteName)}
                                >Website Dashboard
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-span-1 gap-4 mx-8 bg:white'>
                {kpiData.map((kpi:ExpertKpi) => (
                    <KpiCard title={kpi.title} count={kpi.count} color={kpi.color}/>
                ))}
            </div>
        </div>
        </>}
    </>
  )
}

export default withExpertAuth(ExpertDashboard)