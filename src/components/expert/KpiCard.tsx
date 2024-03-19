import React from 'react'
import { ExpertKpi } from '../../types'
import {
    ErrorOutline as ErrorOutlineIcon,
    HourglassTop as HourglassTopIcon,
    Menu as MenuIcon,
    Verified as VerifiedIcon,
  } from "@mui/icons-material";

const KpiCard: React.FC<ExpertKpi> = ({title, count, color}) => {
    const heading = title==="totalWebsitesAssigned" ? "Total Assigned Websites" : title === "totalInProgressWebsites" ? "Websites In Progress" : title==="totalPublishedWebsites" ? "Published Websites" : "Total Patterns Detected";
    const icon = title==="totalWebsitesAssigned" ? <MenuIcon /> : title === "totalInProgressWebsites" ? <HourglassTopIcon/> : title==="totalPublishedWebsites" ? <VerifiedIcon/> : <ErrorOutlineIcon/>
    //const iconbg = title==="totalWebsitesAssigned" ? "bg-[#9C770A]" : title==="totalPatternsCreated" ? "bg-[#533F5C]" : title==="verifiedWithPattern" ? "bg-[#2E5222]" : "bg-[#8C1A0A]"
    const iconbg = title==="totalWebsitesAssigned" ? "bg-[#533F5C]" : title==="totalInProgressWebsites" ? "bg-[#9C770A]" : title==="totalPublishedWebsites" ? "bg-[#2E5222]" : "bg-[#8C1A0A]"
    //const bgColor = title==="totalWebsitesAssigned" ? "bg-[#805DA8]" : title==="totalInProgressWebsites" ? "bg-[#F9C32F]" : title==="totalPublishedWebsites" ? "bg-[#538D3F]" : "bg-[#E6641D]"
    const bgGradient = title==="totalWebsitesAssigned" ? "#805DA8" : title==="totalInProgressWebsites" ? "#F9C32F" : title==="totalPublishedWebsites" ? "#538D3F" : "#E6641D"
    const bgRight = title==="totalWebsitesAssigned" ? "#533F5C" : title==="totalInProgressWebsites" ? "#9C770A" : title==="totalPublishedWebsites" ? "#2E5222" : "#8C1A0A"
  return (
    <div className={`shadow-xl rounded-md md:col-span-1 px-2 py-4 mt-2`} style={{
        background:`linear-gradient(to right, ${bgRight}, ${bgGradient})`,
    }}>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-2xl mx-4 text-white'>{count}</p>
          <div className={` p-1 rounded-md ${iconbg}`}>{icon}</div>
        </div>
        <h2 className='mb-4 mx-4 text-lg text-white'>{heading}</h2>
    </div>
  )
}

export default KpiCard