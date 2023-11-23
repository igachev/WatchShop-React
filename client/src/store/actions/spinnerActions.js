import { SPINNER_START, SPINNER_STOP } from "./spinnerTypes";


export function confirmedStartSpinnerAction(isLoading) {
    return {
        type: SPINNER_START,
        payload: isLoading
    }
}

export function startSpinnerAction() {
    return (dispatch) => {
        dispatch(confirmedStartSpinnerAction(true))
    }
}

export function confirmedStopSpinnerAction(isLoading) {
    return {
        type: SPINNER_STOP,
        payload: isLoading
    }
}

export function stopSpinnerAction() {
    return (dispatch) => {
        dispatch(confirmedStopSpinnerAction(false))
    }
}