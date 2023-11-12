import axiosInstance from "./axiosInstance";


export function getAllWatches() {
    return axiosInstance.get('/watches')
}

export function getWatch(watchId) {
    return axiosInstance.get(`/watches/${watchId}`)
}

export function createWatch(brand,model,imageLink,battery,mechanism,
    price,strap,glass,waterResistance) {

const watchData = {
    brand,model,imageLink,battery,mechanism,
    price,strap,glass,waterResistance
}

    return axiosInstance.post(`/watches/create`,watchData)
}