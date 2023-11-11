import { DECREASE_CURRENT_PAGE, GET_CONFIRMED_TOTAL_PAGES, GET_CONFIRMED_WATCHES, INCREASE_CURRENT_PAGE } from "../actions/watchTypes";

const initialState = {
    watches: [],
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 0
}

export function watchReducer(state = initialState,action) {

    if(action.type === GET_CONFIRMED_WATCHES) {
        return {
            ...state,
            watches: action.payload
        }
    }

   if(action.type === INCREASE_CURRENT_PAGE) {
    return {
        ...state,
        currentPage: state.currentPage + 1
    }
   }

   if(action.type === DECREASE_CURRENT_PAGE) {
    return {
        ...state,
        currentPage: state.currentPage - 1
    }
   }

   if(action.type === GET_CONFIRMED_TOTAL_PAGES) {
    return {
        ...state,
        totalPages: action.payload
    }
   }

    return state;
}