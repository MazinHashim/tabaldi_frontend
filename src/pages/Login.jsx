import React, { useRef } from 'react';
import ecommerce from '../img/ecommerce.png';
import logo from "../img/tabaldi_logo.png"
import { useNavigate } from 'react-router-dom';
import {FaSignInAlt} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from '../apis/axios';
import { useAuth } from '../hooks/appHooks';
import LanguageSelector from "../utils/LanguageSelector.jsx"
import { useTranslation } from 'react-i18next';

const SEND_OTP_URL = "/users/send/otp";

const Login = () => {
    const {setAuth} = useAuth()
    const phoneRef = useRef(null);
    const{t, i18n} = useTranslation();
    const tLogin = t("login");
    const navigate = useNavigate()
    const from = "/verify"
    
    const handleSendOtpCode = async (e)=>{
        e.preventDefault();
        try {
            const phone = phoneRef.current.value;
            const response = await axios.post(SEND_OTP_URL,
                JSON.stringify({phone}),
                { headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json' }});
            console.log(JSON.stringify(response?.data));
            setAuth(response?.data)
            navigate(from, { replace: true })
            toast.success(response?.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
    return (
    <div className='transparent_bg'>
        <ToastContainer/>
        <div className='flex'>
            {/* <div className={i18n.dir()==="rtl"?'flex':'flex body_bg'}> */}
            <div className='flex flex-col justify-end my-10 px-10 md:w-1/2 lg:w-1/2'>
                <div className='flex justify-between'>
                    <div className=''>
                        <img src={logo} width={150} height={150} alt='logo' />
                    </div>
                    <h2 className='uppercase'>
                        <sub className='m-2 bg-white font-extrabold p-2 rounded-xl'>
                        {tLogin.title} <span><FaSignInAlt style={{display: 'inline'}} /></span>
                        </sub>
                    </h2>
                    <div className='w-32 md:hidden'>
                        <LanguageSelector/>
                    </div>
                </div>
                <h3 className="text-lg font-normal md:text-xl m-12 dark:text-white">
                    {tLogin.subtitle}
                </h3>
                <form className="space-y-4 md:space-y-12 py-12 mx-12" onSubmit={handleSendOtpCode} method='post'>
                    <div>
                      <label htmlFor="phone" className="mb-2 text-lg">{tLogin.phoneLabel}</label>
                      <input ref={phoneRef} type='text' name="phone" id="phone" className="sm:text-3xl rounded-lg w-full p-5 shadow-lg" placeholder="0512345678" minLength={10} maxLength={10} required />
                    </div>
                    <button type="submit" className="font-extrabold uppercase w-full text-white bg-primary-color px-5 py-2.5 shadow-lg">{tLogin.sendBtnText}</button>
                </form>
            </div>
            
            <div className='hidden md:block md:w-3/4'>
                <div className='login_svg_bg p-8 flex justify-end items-start min-h-screen'>
                    <img src={ecommerce} width={400} height={100} alt='login_svg_bg' className='self-end' />
                    <div className='w-32'>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login