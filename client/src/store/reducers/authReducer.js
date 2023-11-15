import { ADD_CONFIRMED_WATCH_TO_CART, LOGIN_CONFIRMED_ACTION, LOGIN_FAILED_ACTION, LOGOUT_CONFIRMED_ACTION, REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION } from "../actions/authTypes";

const initialState = {
    auth: {
        _id: '',
        email: '',
        accessToken: '',
        isOwner: false
    },
    shopCart: [],
    errorMessage: ''
}

export function authReducer(state = initialState,action) {

    if(action.type === REGISTER_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: {
                _id: '',
                email: '',
                accessToken: '',
                isOwner: false
            },
            errorMessage: ''
        }
    }

    if(action.type === REGISTER_FAILED_ACTION ||
       action.type === LOGIN_FAILED_ACTION) {
        return {
            ...state,
            errorMessage: action.payload
        }
    }

    if(action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: ''
        }
    }

    if(action.type === LOGOUT_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: {
                _id: '',
                email: '',
                accessToken: '',
                isOwner: false
            },
            errorMessage: ''
        }
    }

    if(action.type === ADD_CONFIRMED_WATCH_TO_CART) {
        const shopCart = [...state.shopCart]
        shopCart.push(action.payload)
        return {
            ...state,
            shopCart
        }
    }

    return state;
}