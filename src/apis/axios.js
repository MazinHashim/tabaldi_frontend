import axios from "axios";

const BASE_URL = 'https://dev.rateena-app.com/api/v1';
export default axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: { "Access-Control-Allow-Origin": '*' }
});

console.log(process.env.NODE_ENV);
export const axiosPrivate = axios.create({
    baseURL: BASE_URL
});