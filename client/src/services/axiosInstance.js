import axios from "axios";
import { store } from "../store/store";
import { startSpinnerAction, stopSpinnerAction } from "../store/actions/spinnerActions";


const axiosInstance = axios.create({
    baseURL:'http://localhost:5000'
  // baseURL: 'https://watch-shop-iwta.onrender.com'
})

 axiosInstance.interceptors.request.use((config) => {

    const state = store.getState()
    const accessToken = state.auth.auth.accessToken;
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
    }

    store.dispatch(startSpinnerAction())

    return config
}) 

axiosInstance.interceptors.response.use((response) => {
    store.dispatch(stopSpinnerAction())
    return response
},
    (error) => {
        store.dispatch(stopSpinnerAction())
        return Promise.reject(error)
    }
)

export default axiosInstance