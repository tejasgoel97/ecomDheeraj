import { combineReducers, applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import asyncStorage  from "@react-native-async-storage/async-storage"
import thunk from "redux-thunk";


// All Reducers Import
import CartReducer from "../reducers/CartReducer"
import ProductReducer from "../reducers/ProductReducer";
import UserReducer from "../reducers/UserReducer";
import AreaInfoReducer from '../reducers/AreaInfoReducer'
import PreOrderReducer from '../reducers/PreOrderReducer'


const rootReducer = combineReducers({CartReducer, ProductReducer, UserReducer, AreaInfoReducer, PreOrderReducer})


const persistConfig = {
    key: 'root',
    storage: asyncStorage,
  }
  
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = createStore(persistedReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

// export const persistor = persistStore(store)
export default store;