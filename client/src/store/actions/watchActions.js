import { createWatch, deleteWatch, getAllWatches, getWatch } from "../../services/watchService";
import { CREATE_CONFIRMED_WATCH, DECREASE_CURRENT_PAGE, DELETE_CONFIRMED_WATCH, GET_CONFIRMED_WATCH, GET_CONFIRMED_WATCHES, INCREASE_CURRENT_PAGE } from "./watchTypes";


export function confirmedGetAllWatchesAction(data,totalPages) {
    return {
        type: GET_CONFIRMED_WATCHES,
        payload: { watches: data, totalPages }
    };
}

export function getAllWatchesAction(currentPage,itemsPerPage) {
    return (dispatch) => {
        getAllWatches()
        .then((response) => {
            let watches = response.data;
            let totalWatches = watches.length;
            let totalPages = Math.ceil(totalWatches / itemsPerPage)
            let trimStart = (currentPage - 1) * itemsPerPage
            let trimEnd = trimStart + itemsPerPage
            watches = watches.slice(trimStart,trimEnd)
            dispatch(confirmedGetAllWatchesAction(watches,totalPages))
        })
    }
}

export function increasePageAction() {
    return {
        type: INCREASE_CURRENT_PAGE
    }
}

export function decreasePageAction() {
    return {
        type: DECREASE_CURRENT_PAGE
    }
}


export function confirmedGetSingleWatchAction(watchId) {
    return {
        type: GET_CONFIRMED_WATCH,
        payload: watchId
    }
}

export function getSingleWatchAction(watchId) {
    return (dispatch) => {
        getWatch(watchId)
        .then((response) => {
            dispatch(confirmedGetSingleWatchAction(response.data))
        })
    }
}

export function confirmedCreateWatchAction(watch) {
    return {
        type: CREATE_CONFIRMED_WATCH,
        payload: watch
    }
}

export function createWatchAction(brand,model,image,battery,mechanism,
    price,strap,glass,waterResistance,navigation) {
    return (dispatch) => {
    createWatch(brand,model,image,battery,mechanism,
        price,strap,glass,waterResistance)
    .then((response) => {
        dispatch(confirmedCreateWatchAction(response.data))
        navigation('/')
    })
    }
}

export function confirmedDeleteWatchAction(watchId) {
    return {
        type: DELETE_CONFIRMED_WATCH,
        payload: watchId
    }
}

export function deleteWatchAction(watchId,navigation) {
    return (dispatch) => {
        deleteWatch(watchId)
        .then((response) => {
            dispatch(confirmedDeleteWatchAction(watchId))
            navigation('/')
        })
    }
}