import axiosInstance from "./axiosInstance"


export function register(email,password,repeatPassword) {
    const userData = {email,password,repeatPassword}
   return axiosInstance.post(`/users/register`,userData)
}