import axios from "axios";
import { store } from "../store/store";


const axiosInstance = axios.create({
    baseURL:'http://localhost:5000'
})

 axiosInstance.interceptors.request.use((config) => {
    const state = store.getState()
    const accessToken = state.auth.auth.accessToken;
    config.headers = {
        ...config.headers,
        Authorization: `${accessToken}`
    }
    return config
}) 

export default axiosInstance