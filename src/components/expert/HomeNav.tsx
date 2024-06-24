import React from 'react'
import '../expert/homeNav.css';
import { useNavigate } from 'react-router-dom';

const HomeNav = () => {
    const navigate = useNavigate();
  return (
    <div 
      className='flex sticky top-0 inset-0 items-center justify-between px-8 py-4 md:px-20 md:pt-8 z-50' 
      id='homeNav'
    >
        <h2 className='text-3xl font-bold font-copperPlate text-white'>DIGITHICS</h2>
        <div>
            <button className='text-white shadow-xl border-2 bg-blue-800 border-blue-800 hover:bg-transparent px-3 py-2 rounded-lg ' onClick={()=> navigate('/expertsignin')}>SIGN IN</button>
        </div>
    </div>
  )
}

export default HomeNav