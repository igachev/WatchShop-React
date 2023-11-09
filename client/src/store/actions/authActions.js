import { register } from "../../services/authService";
import { REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION } from "./authTypes";


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



