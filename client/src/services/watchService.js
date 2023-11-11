import axiosInstance from "./axiosInstance";


export function getAllWatches() {
    return axiosInstance.get('/watches')
}