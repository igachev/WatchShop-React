import { ADD_CONFIRMED_RATING_TO_WATCH, ADD_FAILED_RATING_TO_WATCH, CREATE_CONFIRMED_WATCH, DECREASE_CURRENT_PAGE, DELETE_CONFIRMED_WATCH, EDIT_CONFIRMED_WATCH, GET_CONFIRMED_SEARCHED_WATCHES, GET_CONFIRMED_WATCH, GET_CONFIRMED_WATCHES, GET_CONFIRMED_WATCHES_BEFORE_SEARCH, INCREASE_CURRENT_PAGE } from "../actions/watchTypes";

const initialState = {
    watches: [],
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 0,
    watch: {},
    searchedWatches: [],
    errorMessage: ''
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

        if(action.type === DELETE_CONFIRMED_WATCH) {
            const watches = [...state.watches]
            const watchIndex = watches.findIndex((watch) =>
            watch._id === action.payload
            );
            watches.splice(watchIndex,1);
            
            return {
                ...state,
                watches,
                watch: {}
            }
        }

       if(action.type === EDIT_CONFIRMED_WATCH) {
        const watches = [...state.watches]
        const watchIndex = watches.findIndex((watch) =>
            watch._id === action.payload._id
            );
        
        watches[watchIndex] = action.payload;

        return {
            ...state,
            watches,
            watch: watches[watchIndex]
        }
        
       }

       if(action.type === GET_CONFIRMED_WATCHES_BEFORE_SEARCH) {
            return {
                ...state,
                searchedWatches: action.payload
            }
       }

       if(action.type === GET_CONFIRMED_SEARCHED_WATCHES) {
        
            return {
                ...state,
                searchedWatches:action.payload
            }
       }

       if(action.type === ADD_CONFIRMED_RATING_TO_WATCH) {
        return {
            ...state
        }
       }

       if(action.type === ADD_FAILED_RATING_TO_WATCH) {
            return {
                ...state,
                errorMessage: action.payload
            }
       }

            return state;
    
}