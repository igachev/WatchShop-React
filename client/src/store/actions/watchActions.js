import { getAllWatches } from "../../services/watchService";
import { DECREASE_CURRENT_PAGE, GET_CONFIRMED_TOTAL_PAGES, GET_CONFIRMED_WATCHES, INCREASE_CURRENT_PAGE } from "./watchTypes";


export function confirmedGetAllWatchesAction(data) {
    return {
        type: GET_CONFIRMED_WATCHES,
        payload: data
    }
}

export function getAllWatchesAction(currentPage,itemsPerPage) {
    return (dispatch) => {
        getAllWatches()
        .then((response) => {
            let watches = response.data;
            let trimStart = (currentPage - 1) * itemsPerPage
            let trimEnd = trimStart + itemsPerPage
            watches = watches.slice(trimStart,trimEnd)
            dispatch(confirmedGetAllWatchesAction(watches))
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

export function confirmedGetTotalPagesAction(data) {
    return {
        type: GET_CONFIRMED_TOTAL_PAGES,
        payload: data
    }
}

export function getTotalPagesAction() {
    return (dispatch) => {
        getAllWatches()
        .then((response) => {
            let totalWatches = response.data.length;
            let itemsPerPage = 5;
            let totalPages = Math.ceil(totalWatches / itemsPerPage)
            dispatch(confirmedGetTotalPagesAction(totalPages))
        })
    }
}