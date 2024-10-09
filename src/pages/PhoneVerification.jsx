import React, { useRef } from 'react';
import {useAuth} from '../hooks/appHooks';
import otpImage from '../img/otp-image.svg';
import { useNavigate } from 'react-router-dom';
import {FaPhone} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from '../apis/axios';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../utils/LanguageSelector';

const VERIFIY_OTP_URL = "/users/verify/otp/login";
// const VERIFIY_OTP_URL = "/users/verify/otp";

const PhoneVerification = () => {
    const {auth, setAuth} = useAuth()
    const otpCodeRef = useRef(null);
    
    // const location = useLocation()
    const navigate = useNavigate()
    const{t, i18n} = useTranslation();
    const tVerfiy = t("verify");
    // const from = location.state?.from?.pathname
    
    const handleSendOtpCode = async (e)=>{
        e.preventDefault();
        try {
            const otpCode = otpCodeRef.current.value;
            const payload= {phone: auth.phone,
                keyRef: auth.keyRef.split(" ").shift(),// remove split in production
                otpCode: parseInt(otpCode)};
            const response = await axios.post(VERIFIY_OTP_URL,
                JSON.stringify(payload),
                { headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json' }}
            );
            console.log(JSON.stringify(response?.data));

            localStorage.setItem("session_token", response?.data.token)
            localStorage.setItem("refresh_token", response?.data.refreshToken)
            setAuth(response?.data);
            const from = response?.data.role.includes("VENDOR")?"/vendor" : "/admin" // "/" to navigate to admin -- "/vendor" to navigate to vendors
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
            <div className='flex flex-col justify-end my-10 px-10 md:w-1/2 lg:w-1/2'>
                <div className='flex justify-start items-center'>
                    <h2 className='font-medium uppercase'>
                        {tVerfiy.title}
                    </h2>
                        <span className='m-3 bg-white font-extrabold p-2 rounded-xl'>
                            {auth.phone??tVerfiy.phonePlaceholder} <span><FaPhone style={{display: 'inline'}} /></span>
                        </span>
                </div>
                <h3 className="text-lg font-normal md:text-xl m-12 dark:text-white">
                    {tVerfiy.subtitle}
                </h3>
                <form className="space-y-4 md:space-y-12 py-12 mx-12" onSubmit={handleSendOtpCode} method='post'>
                    <div>
                      <label htmlFor="otpCode" className="mb-2 text-lg uppercase font-normal">{tVerfiy.otpLabelText}</label>
                      <input ref={otpCodeRef} type='text' name="otpCode" id="otpCode" className={`otp-style sm:text-3xl text-center rounded-lg w-full p-5 p${i18n.dir()==='rtl'?'e':'s'}-16 shadow-lg`} placeholder="1234" minLength={4} maxLength={4} required />
                    </div>
                    <button type="submit" className="font-extrabold uppercase w-full text-white bg-primary-color px-5 py-2.5 shadow-lg">{tVerfiy.loginBtnText}</button>
                </form>
            </div>
            
            <div className='hidden md:block md:w-3/4'>
                <div className='otp_svg_bg p-8 flex justify-end items-start min-h-screen'>
                    <img src={otpImage} width={400} height={100} alt='otp_svg_bg' className='self-end' />
                    <div className='w-32'>
                        <LanguageSelector />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PhoneVerification