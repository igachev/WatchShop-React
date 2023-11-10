import { login, register, saveUserDetailsInLocalStorage } from "../../services/authService";
import { LOGIN_CONFIRMED_ACTION, LOGIN_FAILED_ACTION, REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION } from "./authTypes";


export function confirmedRegisterAction(data) {
    return {
        type: REGISTER_CONFIRMED_ACTION,
        payload: data
    }
}

export function failedRegisterAction(message) {
    return {
        type: REGISTER_FAILED_ACTION,
        payload: message
    }
}

export function registerAction(email,password,repeatPassword,navigation) {
return (dispatch) => {
    register(email,password,repeatPassword)
    .then((response) => {
        dispatch(confirmedRegisterAction(response.data))
        navigation('/users/login')
    })
    .catch((error) => {
        dispatch(failedRegisterAction(error.response.data.message))
    })
}
}


export function confirmedLoginAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data
    }
}

export function failedLoginAction(message) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: message
    }
}

export function loginAction(email,password,navigation) {
    return (dispatch) => {
    login(email,password)
    .then((response) => {
        console.log(response.data)
    saveUserDetailsInLocalStorage(response.data)
    dispatch(confirmedLoginAction(response.data))
    navigation('/')
    })
    .catch((error) => {
        dispatch(failedLoginAction(error.response.data.message))
    })
    }
}