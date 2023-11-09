import { register } from "../../services/authService";
import { REGISTER_CONFIRMED_ACTION } from "./authTypes";


export function confirmedRegisterAction(data) {
    return {
        type: REGISTER_CONFIRMED_ACTION,
        payload: data
    }
}

export function registerAction(email,password,repeatPassword,navigation) {
return (dispatch) => {
    register(email,password,repeatPassword)
    .then((response) => {
        dispatch(confirmedRegisterAction(response))
        navigation('/users/login')
    })
}
}