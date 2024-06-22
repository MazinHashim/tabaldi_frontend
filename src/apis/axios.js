import axios from "axios";

const BASE_URL = 'http://localhost:7070/api/v1';
export default axios.create({
    baseURL: BASE_URL,
    headers: { "Access-Control-Allow-Origin": '*' }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL
});