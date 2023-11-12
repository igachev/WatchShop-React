import axiosInstance from "./axiosInstance";


export function getAllWatches() {
    return axiosInstance.get('/watches')
}

export function getWatch(watchId) {
    return axiosInstance.get(`/watches/${watchId}`)
}