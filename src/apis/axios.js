import axios from "axios";

export const baseURL = process.env.REACT_APP_API_ENDPOINT;
export default axios.create({baseURL,
    headers: { "Access-Control-Allow-Origin": '*' }
});

console.log(process.env.NODE_ENV);
console.log(baseURL);
export const axiosPrivate = axios.create({baseURL});