import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { watchReducer } from "./reducers/watchReducer";
import { spinnerReducer } from "./reducers/spinnerReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk)

const reducers = combineReducers({
    auth: authReducer,
    watches: watchReducer,
    spinner: spinnerReducer
})

export const store = createStore(reducers,composeEnhancers(middleware))
