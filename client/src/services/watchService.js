import axiosInstance from "./axiosInstance";


export function getAllWatches() {
    return axiosInstance.get('/watches')
}

export function getWatch(watchId) {
    return axiosInstance.get(`/watches/${watchId}`)
}

export function createWatch(brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance) {

const watchData = {
    brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance
}

    return axiosInstance.post(`/watches/create`,watchData)
}

export function deleteWatch(watchId) {
    return axiosInstance.delete(`/watches/${watchId}`)
}

export function editWatch(watchId,brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance) {

const watchData = {
    brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance
}

    return axiosInstance.put(`/watches/${watchId}`,watchData)
}

export function getAllWatchesBeforeSearch() {
    return axiosInstance.get('/watches/search')
}

export function searchByBrand(brand) {
    return axiosInstance.post('/watches/search',{searchValue:brand})
}

export function addWatchToCart(watchId) {
    return axiosInstance.post(`/watches/${watchId}`,{watchId})
}

export function rate(watchId,userRating) {
    let userDetailsString = localStorage.getItem('userDetails')
    let userDetails;
    if(userDetailsString) {
        userDetails = JSON.parse(userDetailsString)
    }
    let userId = userDetails?._id;
    return axiosInstance.post(`/watches/${watchId}/rating`,{userId,watchId,userRating})
}

export function getRate(watchId) {
    return axiosInstance.get(`/watches/${watchId}/rating`)
}