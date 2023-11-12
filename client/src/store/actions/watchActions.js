import { getAllWatches, getWatch } from "../../services/watchService";
import { DECREASE_CURRENT_PAGE, GET_CONFIRMED_WATCH, GET_CONFIRMED_WATCHES, INCREASE_CURRENT_PAGE } from "./watchTypes";


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