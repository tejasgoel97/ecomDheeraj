import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import CartReducer from "../reducers/CartReducer"
import ProductReducer from "../reducers/ProductReducer";

const rootReducer = combineReducers({CartReducer, ProductReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;