import axiosInstance from "./axiosInstance"


export function register(email,password,repeatPassword) {
    const userData = {email,password,repeatPassword}
   return axiosInstance.post(`/users/register`,userData)
}

export function login(email,password) {
    const userData = {email,password}
    return axiosInstance.post(`/users/login`,userData)
}

export function saveUserDetailsInLocalStorage(userDetails) {
    localStorage.setItem('userDetails',JSON.stringify(userDetails))
}