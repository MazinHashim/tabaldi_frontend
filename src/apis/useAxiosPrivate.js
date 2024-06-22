import { useEffect } from 'react'
import { axiosPrivate } from './axios'
import useRefreshToken from './useRefreshToken'
import {useAuth} from '../hooks/appHooks';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                if(!config.headers['Access-Control-Allow-Origin']){
                    config.headers['Access-Control-Allow-Origin'] = `*`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                console.log(`BREAER TOKEN NOT EXPRIED YET`);    
                return response;
            },
            async (error) => {
                console.log(error);
                const prevRequest = error?.config;
                // console.log(prevRequest);
                // should access response object and check if its status is 403 instead of ERR_NETWORK
                if(error?.code === "ERR_NETWORK" && !prevRequest?.sent){
                    console.log(`BREAER TOKEN RESETING ${error?.response?.status}`);  
                    prevRequest.sent = true;
                    const newAuth = await refresh();
                    localStorage.setItem("refresh_token", newAuth.refreshToken)
                    localStorage.setItem("session_token", newAuth.token)
                    prevRequest.headers["Authorization"] = `Bearer ${newAuth.token}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        );

        return ()=>{
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [refresh, auth])
  return axiosPrivate
}

export default useAxiosPrivate