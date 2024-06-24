import React from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='md:grid md:grid-cols-2 mix-blend-hard-light bg-cyan-800 border-t-2 border-cyan-500 mt-12 sm:mt-24 py-8'>
        <div className='col-span-1 flex justify-center'>
            <div className=''>
                <h1 className='text-[2rem] font-copperPlate text-white font-bold'>DIGITHICS</h1>
                <p className='font-copperPlate text-white'>&copy; All rights are reserved </p>
                <div className="flex justify-center sm:justify-start text-white text-[2rem] space-x-4 my-4">
                    <a href="https://github.com/AMAY27" target='blank'><FaGithub/></a>
                    <a href="https://www.linkedin.com/in/amay-rajvaidya" target='blank'><FaLinkedinIn/></a>
                </div>
            </div>
        </div>
        <div className='col-span-1 flex justify-center'>
            <div className='grid grid-cols-1 place-items-center font-copperPlate text-white text-center'>
                <img src='/assets/Amay Ventures (2).png' className='size-40 border-2 border-cyan-500 col-span-1 rounded-full'/>
                <p className='col-span-1'>Powered By: <br/>Amay Portfolio Projects</p>
            </div>
        </div>
    </div>
  )
}

export default Footer