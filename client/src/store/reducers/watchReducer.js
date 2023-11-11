import { GET_CONFIRMED_WATCHES } from "../actions/watchTypes";

const initialState = {
    watches: []
}

export function watchReducer(state = initialState,action) {

    if(action.type === GET_CONFIRMED_WATCHES) {
        return {
            ...state,
            watches: action.payload
        }
    }

    return state;
}