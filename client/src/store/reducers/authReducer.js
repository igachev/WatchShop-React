import { REGISTER_CONFIRMED_ACTION } from "../actions/authTypes";

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
            ...state
        }
    }

    return state;
}