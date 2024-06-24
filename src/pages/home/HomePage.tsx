import React from 'react'
import '../home/homePage.css'
import HomeNav from '../../components/expert/HomeNav'
import Demo from '../../components/expert/Demo'
import DarkTypes from '../../components/expert/DarkTypes'
import Footer from '../../components/expert/Footer'

const HomePage = () => {
  return (
    <div id='homemain' className='h-screen'>
        <HomeNav/>
        <div className='mx-2 mt-12 md:mx-40 md:mt-16 sm:border-2 rounded-xl border-cyan-300 bg-transparent text-cyan-600 font-copperPlate font-bold'>
          <h2 className='hidden md:block text-[4rem] lg:text-[10rem] font-copperPlate bg-cyan-200 rounded-t-xl px-4'>
            DIGITHICS
          </h2>
          <h2 className='text-lg sm:text-xl text-white text-center sm:text-left font-bold font-copperPlate my-4 mx-6 z-10'>
            Navigating the digital world should be a fair and transparent experience for everyone. At Digithics, we empower users to share and expose dark patterns—deceptive design techniques that manipulate your choices online. Join our community to uncover unethical practices and learn how to recognize and avoid these traps. Together, we can promote digital ethics and advocate for more honest, user-friendly web interfaces. Explore, report, and stay informed with Digithics.
          </h2>
        </div>
        <Demo/>
        <DarkTypes isDisplayedOnDashboard={false}/>
        <Footer/>
    </div>
  )
}

export default HomePage