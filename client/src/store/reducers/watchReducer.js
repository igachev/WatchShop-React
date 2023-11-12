import { CREATE_CONFIRMED_WATCH, DECREASE_CURRENT_PAGE, GET_CONFIRMED_WATCH, GET_CONFIRMED_WATCHES, INCREASE_CURRENT_PAGE } from "../actions/watchTypes";

const initialState = {
    watches: [],
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 0,
    watch: {}
}

export function watchReducer(state = initialState, action) {
    

        if(action.type === GET_CONFIRMED_WATCHES) {
            return {
                ...state,
                watches: action.payload.watches,
                totalPages: action.payload.totalPages
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

        if(action.type === GET_CONFIRMED_WATCH) {
            return {
                ...state,
                watch: action.payload
            }
        }

        if(action.type === CREATE_CONFIRMED_WATCH) {
            const watches = [...state.watches]
            watches.push(action.payload)
            return {
                ...state,
                watches
            }
        }

       
            return state;
    
}