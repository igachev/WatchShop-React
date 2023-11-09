import { REGISTER_CONFIRMED_ACTION, REGISTER_FAILED_ACTION } from "../actions/authTypes";

const initialState = {
    auth: {
        _id: '',
        email: '',
        accessToken: '',
        isOwner: false
    },
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

    if(action.type === REGISTER_FAILED_ACTION) {
        return {
            ...state,
            errorMessage: action.payload
        }
    }

    return state;
}