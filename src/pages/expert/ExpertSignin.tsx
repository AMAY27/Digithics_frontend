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
    <div className='h-screen flex justify-center items-center py-24' id='secondarydiv'>
        <div className='w-full sm:w-3/5 lg:w-1/3 mx-4 sm:mx-12 md:mx-24 p-6 md:p-12 h-auto mix-blend-hard-light bg-slate-600 border-2 border-blue-500'>
            <h2 className='flex justify-center w-full text-white font-copperPlate font-bold text-4xl mb-12'>DIGITHICS</h2>
            <div className="space-y-4">
                <div className='space-y-4 w-full'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="patterntype" className='mb-2 block text-md font-medium text-white'>Enter Email</label>
                            <div className='rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                                <input 
                                    type='text' 
                                    name='email' 
                                    id='patterntype'
                                    onChange={handleChange}
                                    className='block border-0 py-1.5 bg-transparent pl-1 placeholder:text-gray-300 w-full text-white' 
                                    placeholder="Enter your email"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="patternlink" className='my-2 block text-md font-medium text-white'>Password</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300'>
                                <input 
                                    type='password' 
                                    name='password' 
                                    id='patternlink'
                                    onChange={handleChange}
                                    className='block border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-300 w-full text-white' 
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
        {/* <div className='w-3/5'><img src='../../public/assets/virtual-5663279.svg'/></div> */}
    </div>
  )
}

export default ExpertSignin