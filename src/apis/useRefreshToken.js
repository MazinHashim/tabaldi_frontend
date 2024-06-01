import axios from './axios'
import {useAuth} from '../hooks/appHooks'

const REFRESH_URL = '/users/refresh'

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
    console.log("CALLING REFRESH TOKEN...");
        const response = await axios.get(`${REFRESH_URL}/${auth.refreshToken}`);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return {...prev, token: response.data.token};
        });
        return response.data.token
    }
  return refresh;
}

export default useRefreshToken