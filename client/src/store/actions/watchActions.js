import { getAllWatches } from "../../services/watchService";
import { GET_CONFIRMED_WATCHES } from "./watchTypes";


export function confirmedGetAllWatchesAction(data) {
    return {
        type: GET_CONFIRMED_WATCHES,
        payload: data
    }
}

export function getAllWatchesAction() {
    return (dispatch) => {
        getAllWatches()
        .then((response) => {
            dispatch(confirmedGetAllWatchesAction(response.data))
        })
    }
}