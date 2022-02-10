import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import CartReducer from "../reducers/CartReducer"
import ProductReducer from "../reducers/ProductReducer";
import UserReducer from "../reducers/UserReducer";
import WishlistReducer from "../reducers/WishlistReducer"


const rootReducer = combineReducers({CartReducer, ProductReducer, UserReducer, WishlistReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;