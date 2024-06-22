import React, { useEffect } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../img/tabaldi_logo.png';
import {useAuth} from '../hooks/appHooks';
import useAxiosFetchApi from '../hooks/useFetch';
import AppLoading from '../utils/AppLoading';
import { adminMenue, vendorMenue } from '../utils/NavigationMenue';
import LanguageSelector from '../utils/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { CategoryProvider, OrderProvider, ProductProvider } from '../providers/AuthProvider';
import { IoLogOutOutline } from "react-icons/io5";
import useAxiosPrivate from '../apis/useAxiosPrivate';

const USER_PROFILE_URL = "/users/profile?vendorUserId=";
const LOGOUT_URL = "/users/logout";

const RequiredAuth = ({routeRole}) => {
    const { auth, setAuth } = useAuth();
    const token = auth.token;
    const refreshToken = auth.refreshToken;
    const{t, i18n} = useTranslation();
    const axiosPrivate = useAxiosPrivate()
    const [state] = useAxiosFetchApi(USER_PROFILE_URL, {}, token);
    const [vendorState, setVendorProfileUrl] = useAxiosFetchApi(null, {}, token);
    const location = useLocation();
    const navigate = useNavigate();
    const userProfile = state.data?.user;
    const newUser = state.data?.newUser;
    var userRole = {};
    const tMain = t("main")
    useEffect(()=>{
        if(state.data?.user && state.data?.user.role !=="SUPERADMIN"){
            setVendorProfileUrl("/vendors/profile")
            setAuth({...vendorState.data?.vendor, token, refreshToken})
        }
    }, [state.data, vendorState, token, refreshToken, setAuth, setVendorProfileUrl,])
    
    if(userProfile){
        userRole = userProfile.role;
        // console.log(userProfile);
    }
    
    const handleUserLogout = async (e)=>{
        e.preventDefault();
        const headers= {'Content-Type': 'application/json', 'Accept-Language': i18n.language};
        try {
            const response = await axiosPrivate.get(LOGOUT_URL,{headers});
            console.log(JSON.stringify(response?.data));
            setAuth(null);
            localStorage.removeItem("session_token")
            navigate("/login", { replace: true })
        } catch (error) {
            
        }
    }
    return (
        state.isLoading
        ?<AppLoading/>
        :userRole!==routeRole
        ? userProfile && userProfile.phone
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
        :newUser && userRole === "VENDOR"? "Wating..."
        :<div className='flex flex-col'>
            <header className={`px-9 pt-4 flex items-start header-info ${i18n.dir()} h-20`}>
                <div className='flex justify-end w-full items-center'>
                    <p className='font-semibold mx-5'><span className='font-normal'>{userProfile.email}</span></p>
                    <LanguageSelector/>
                    <button className='flex mx-5' onClick={handleUserLogout}>
                        {tMain.logoutNavBtn}
                        <IoLogOutOutline className='ms-3 size-6'/>
                    </button>
                </div>
            </header>
            <div className='flex flex-col'>
                
                <div className='flex flex-row justify-between'>
                    <div className='w-2/12 bg-primary-color rounded-se-3xl'>
                        <div className={`mx-10 -mt-10 border-8 border-white self-start h-20 bg-green-50 p-3 rounded-full flex justify-center items-center`}>
                            <img width={100} src={logo} alt='logo' />
                        </div>
                        {userRole === "VENDOR" &&
                            <nav className={`${i18n.dir()} pt-20 nav-height font-bold flex flex-col py-3 px-8`}>
                                {vendorMenue.map((navigator) =>
                                    <NavLink key={navigator.screenId} to={navigator.route}>{i18n.dir()==='rtl'?navigator.arTitle:navigator.title}</NavLink>)
                                }
                            </nav>}
                        {userRole === "SUPERADMIN" &&
                            <nav className={`${i18n.dir()} pt-20 nav-height font-bold flex flex-col py-3 px-8`}>
                                {adminMenue.map(navigator =>
                                    <NavLink key={navigator.screenId} to={navigator.route}>{i18n.dir()==='rtl'?navigator.arTitle:navigator.title}</NavLink>)
                                }
                            </nav>}
                    </div>
                    <main className='container me-14 mt-10 w-9/12'>
                        <ProductProvider>
                            <OrderProvider>
                                <CategoryProvider>
                                    <Outlet />
                                </CategoryProvider>
                            </OrderProvider>
                        </ProductProvider>
                    </main>
                </div>
            </div>
            {/* <footer className='self-stretch h-[200px] w-full bg-slate-800 mx-auto'>Footer</footer> */}
        </div>
    )
}

export default RequiredAuth