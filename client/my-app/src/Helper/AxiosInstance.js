import axios from 'axios'

const BASE_URL = "http://localhost:5656"; 

//  here  we are creating axios instance by crate function.
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.defaults.withCredentials = true

export default axiosInstance