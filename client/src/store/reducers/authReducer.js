import { ADD_CONFIRMED_WATCH_TO_CART, ADD_FAILED_WATCH_TO_CART, BUY_CONFIRMED_WATCH, GET_CONFIRMED_ADMIN_PURCHASE_HISTORY, GET_CONFIRMED_USER_PURCHASE_HISTORY, GET_CONFIRMED_WATCHES_FROM_CART, LOGIN_CONFIRMED_ACTION, LOGIN_FAILED_ACTION, LOGOUT_CONFIRMED_ACTION, REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION, REMOVE_CONFIRMED_WATCH_FROM_CART } from "../actions/authTypes";

const initialState = {
    auth: {
        _id: '',
        email: '',
        accessToken: '',
        isOwner: false
    },
    shopCart: [],
    userPurchaseHistory: [],
    adminHistory: [],
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
       action.type === LOGIN_FAILED_ACTION ||
       action.type === ADD_FAILED_WATCH_TO_CART) {
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
            shopCart: [],
            userPurchaseHistory: [],
            adminHistory: [],
            errorMessage: ''
        }
    }

    if(action.type === ADD_CONFIRMED_WATCH_TO_CART) {
        const shopCart = [...state.shopCart]
        shopCart.push(action.payload)
        return {
            ...state,
            shopCart,
            errorMessage: ''
        }
    }

    if(action.type === GET_CONFIRMED_WATCHES_FROM_CART) {
        const shopCart = action.payload
        return {
            ...state,
            shopCart
        }
    }

    if(action.type === REMOVE_CONFIRMED_WATCH_FROM_CART) {
        const shopCart = [...state.shopCart]
        const watchIndex = shopCart.findIndex((watch) =>
        watch._id === action.payload);
        shopCart.splice(watchIndex,1);

        return {
            ...state,
            shopCart
        }
    }

    if(action.type === BUY_CONFIRMED_WATCH) {
       // const userPurchaseHistory = [...state.userPurchaseHistory]
      //  userPurchaseHistory.push(action.payload)
        return {
            ...state,
          //  userPurchaseHistory
        }
    }

    if(action.type === GET_CONFIRMED_USER_PURCHASE_HISTORY) {
        return {
            ...state,
            userPurchaseHistory: action.payload
        }
    }

    if(action.type === GET_CONFIRMED_ADMIN_PURCHASE_HISTORY) {
        return {
            ...state,
            adminHistory: action.payload
        }
    }

    return state;
}