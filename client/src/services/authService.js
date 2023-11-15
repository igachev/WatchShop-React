import { confirmedLoginAction, logoutAction } from "../store/actions/authActions"
import axiosInstance from "./axiosInstance"


export function register(email,password,repeatPassword) {
    const userData = {email,password,repeatPassword}
   return axiosInstance.post(`/users/register`,userData)
}

export function login(email,password) {
    const userData = {email,password}
    return axiosInstance.post(`/users/login`,userData)
}

export function checkAutoLogin(dispatch,navigation) {
    let userDetailsString = localStorage.getItem('userDetails')

    if(!userDetailsString) {
        dispatch(logoutAction(navigation))
        return;
    }

    let userDetails = JSON.parse(userDetailsString)
    dispatch(confirmedLoginAction(userDetails))
}

export function saveUserDetailsInLocalStorage(userDetails) {
    localStorage.setItem('userDetails',JSON.stringify(userDetails))
}

export function watchesFromUserCart() {
    let userDetailsString = localStorage.getItem('userDetails')
    let userDetails;
    if(userDetailsString) {
        userDetails = JSON.parse(userDetailsString)
    }
    let userId = userDetails?._id;
        return axiosInstance.get(`/users/${userId}/cart`)
}