import axios from './axios'
import {useAuth} from '../hooks/appHooks'

const REFRESH_URL = '/users/refresh'

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
    console.log("CALLING REFRESH TOKEN...");
        const response = await axios.get(`${REFRESH_URL}/${auth.refreshToken}`, {headers: {"Access-Control-Allow-Origin":"*"}});
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            return {...prev, token: response.data.token, refreshToken: response.data.refreshToken};
        });
        return {token: response.data.token, refreshToken: response.data.refreshToken}
    }
  return refresh;
}

export default useRefreshToken