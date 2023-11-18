import { addToUserPurchaseHistory, adminPurchaseHistory, getUserPurchaseHistory, login, register, removeWatchFromUserCart, saveUserDetailsInLocalStorage, watchesFromUserCart } from "../../services/authService";
import { addWatchToCart } from "../../services/watchService";
import { ADD_CONFIRMED_WATCH_TO_CART, ADD_FAILED_WATCH_TO_CART, BUY_CONFIRMED_WATCH, GET_CONFIRMED_ADMIN_PURCHASE_HISTORY, GET_CONFIRMED_USER_PURCHASE_HISTORY, GET_CONFIRMED_WATCHES_FROM_CART, LOGIN_CONFIRMED_ACTION, LOGIN_FAILED_ACTION, LOGOUT_CONFIRMED_ACTION, REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION, REMOVE_CONFIRMED_WATCH_FROM_CART } from "./authTypes";


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

export function logoutAction(navigation) {
    localStorage.removeItem('userDetails')
    navigation('/')
    return {
        type: LOGOUT_CONFIRMED_ACTION
    }
}

export function confirmedAddWatchToCartAction(watchId) {
    return {
        type: ADD_CONFIRMED_WATCH_TO_CART,
        payload: watchId
    }
}

export function failedAddWatchToCartAction(message) {
    return {
        type: ADD_FAILED_WATCH_TO_CART,
        payload: message
    }
}

export function addWatchToCartAction(watchId) {
    return (dispatch) => {
        addWatchToCart(watchId)
        .then((response) => {
            dispatch(confirmedAddWatchToCartAction(watchId))
           
        })
        .catch((error) => {
            dispatch(failedAddWatchToCartAction(error.response.data.message))
            setTimeout(() => {
                dispatch(failedAddWatchToCartAction(''));
              }, 1000);
        })
    }
}

export function confirmedGetWatchesFromCartAction(watchesFromCart) {
    return {
        type: GET_CONFIRMED_WATCHES_FROM_CART,
        payload: watchesFromCart
    }
}

export function getWatchesFromCartAction() {
    return (dispatch) => {
        watchesFromUserCart()
        .then((response) => {
            dispatch(confirmedGetWatchesFromCartAction(response.data))
        })
    }
}

export function confirmedRemoveWatchFromUserCartAction(watchId) {
    return {
        type: REMOVE_CONFIRMED_WATCH_FROM_CART,
        payload: watchId
    }
}

export function removeWatchFromUserCartAction(watchId) {
    return (dispatch) => {
        removeWatchFromUserCart(watchId)
        .then((response) => {
            dispatch(confirmedRemoveWatchFromUserCartAction(watchId))
        })
    }
}

export function confirmedBuyWatchAction(watchId) {
    return {
        type: BUY_CONFIRMED_WATCH,
        payload: watchId
    }
}

export function buyWatchAction(watchId,name,phone,address,quantity,price) {
    return (dispatch) => {
        addToUserPurchaseHistory(watchId,name,phone,address,quantity,price)
        .then((response) => {
            dispatch(confirmedBuyWatchAction(watchId))
            removeWatchFromUserCart(watchId)
            .then((response) => {
                dispatch(confirmedRemoveWatchFromUserCartAction(watchId))
            })
        })
    }
}

export function confirmedGetUserPurchaseHistoryAction(watches) {
    return {
        type: GET_CONFIRMED_USER_PURCHASE_HISTORY,
        payload: watches
    }
}

export function getUserPurchaseHistoryAction() {
    return (dispatch) => {
        getUserPurchaseHistory()
        .then((response) => {
            dispatch(confirmedGetUserPurchaseHistoryAction(response.data))
        })
    }
}

export function confirmedGetAdminPurchaseHistoryAction(watches) {
    return {
        type: GET_CONFIRMED_ADMIN_PURCHASE_HISTORY,
        payload: watches
    }
}

export function getAdminPurchaseHistoryAction() {
    return (dispatch) => {
        adminPurchaseHistory()
        .then((response) => {
            dispatch(confirmedGetAdminPurchaseHistoryAction(response.data))
        })
    }
}