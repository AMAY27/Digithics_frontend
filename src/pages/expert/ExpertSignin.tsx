import React, { useState } from 'react'
import './Expertsignin.css'
import AuthContext from "../../context/AuthContext1";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserCredentials } from '../../types';
import { getUserDetails } from '../../services/expertServices';

const ExpertSignin = () => {
    const [credentials, setCredentials] = useState<UserCredentials>({
        email: "",
        password: "",
        role: "Expert"
    });
    const navigate = useNavigate();

    const authContext = useContext(AuthContext)
    if(!authContext) {
        return null
    };
    const { loginUser } = authContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const loginSuccess = await loginUser(credentials);
        if (loginSuccess) {
            const userId = localStorage.getItem("userId");
            const userName = await getUserDetails(userId ? userId : "");
            localStorage.setItem("userName", `${userName.firstName} ${userName.lastName}`)
            navigate('/expert/dashboard');
          } 
      }
  return (
        <div className='grid md:grid-cols-4'>
            <div className='md:col-span-1 items-center justify-center w-full mt-30 bg-slate-800'>
                <div className='flex justify-center w-full mt-24'><img src='/assets/logo.png' className='w-24' alt='backdrop'/></div>
                <div className="space-y-4 p-4 m-5">
                    <h2 className='text-base font-bold leading-7 flex text-blue-500 font-bold text-xl justify-center mb-12'>Sign In To the Expert portal</h2>
                    <div className='space-y-4 w-80'>
                        <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="patterntype" className='mb-2 block text-md font-medium text-blue-500'>Enter Email</label>
                            <div className='rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                                <input 
                                    type='text' 
                                    name='email' 
                                    id='patterntype'
                                    onChange={handleChange}
                                    className='block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 w-full text-white' 
                                    placeholder="Enter your email"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="patternlink" className='my-2 block text-md font-medium text-blue-500'>Password</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                                <input 
                                    type='password' 
                                    name='password' 
                                    id='patternlink'
                                    onChange={handleChange}
                                    className='block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 text-white w-full' 
                                    placeholder="Enter your password"/>
                            </div>
                        </div>
                        <div className='border-2 border-blue-500 bg-blue-200 rounded-xl mt-4 p-3'>
                            <p className='text-blue-500 font-bold'>For Project Demo use following Credentials:</p>
                            <p><span className='text-blue-500 font-bold'>Email:</span> amay@expert.com</p>
                            <p><span className='text-blue-500 font-bold'>Password:</span> expert</p>
                        </div>
                        <button className='bg-blue-500 p-2 rounded-md mt-4 w-full font-bold hover:bg-blue-700' type='submit'>Login</button>
                        </form>
                    </div> 
                </div>
            </div>
            <div className='h-screen md:col-span-3' id='secondarydiv'>
                {/* <div className='w-3/5'><img src='../../public/assets/virtual-5663279.svg'/></div> */}
            </div>
        </div>
  )
}

export default ExpertSignin