import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import CartReducer from "../reducers/CartReducer"
import ProductReducer from "../reducers/ProductReducer";
import UserReducer from "../reducers/UserReducer";


const rootReducer = combineReducers({CartReducer, ProductReducer, UserReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;