import { SET_CATEGORIES, SET_PRODUCTS } from "../store/ACTION_DEFINATION";

const initialState = {
    categories:[],
    products:[]
}


const ProductReducer = (state=initialState, action) =>{
    switch (action.type) {
        case SET_CATEGORIES:
            return {...state, categories:action.payload.categories} 
        case SET_PRODUCTS:
            return {...state, products:action.payload.products}
        default:
            break;
    }
    return state
}


export default ProductReducer;