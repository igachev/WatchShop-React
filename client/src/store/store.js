import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk)

const reducers = combineReducers({
    auth: authReducer

})

export const store = createStore(reducers,composeEnhancers(middleware))
