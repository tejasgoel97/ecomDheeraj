import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../store/ACTION_DEFINATION"

const addToWishList = (productId) => async(dispatch)=>{
    dispatch({type:ADD_TO_WISHLIST, payload:{productId}})
}

const removeFromWishList = (productId) => async(dispatch)=>{
    dispatch({type:REMOVE_FROM_WISHLIST, payload:{productId}})
}

export {addToWishList, removeFromWishList}