import { SPINNER_START, SPINNER_STOP } from "../actions/spinnerTypes";

const initialState = {
    isLoading: false
}

export function spinnerReducer(state = initialState , action) {

    if(action.type === SPINNER_START) {
        return {
            ...state,
            isLoading: action.payload
        }
    }

    if(action.type === SPINNER_STOP) {
        return {
            ...state,
            isLoading: action.payload
        }
    }

    return state;
}