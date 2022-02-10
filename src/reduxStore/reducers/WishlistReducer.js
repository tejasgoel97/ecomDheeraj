import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../store/ACTION_DEFINATION";

const initialState = {
    whishlistItems:[]
}


const WishlistReducer = (state=initialState, action)=>{

    switch (action.type) {
        case ADD_TO_WISHLIST:
            if(state.whishlistItems.includes(action.payload.productId)) return state
            let items = [...state.whishlistItems]
            items.push(action.payload.productId)
            return {whishlistItems: items}
        case REMOVE_FROM_WISHLIST:
            items = [...state.whishlistItems];
            items = items.filter(item => item !==action.payload.productId)
            return {whishlistItems: items}
    
        default:
            break;
    }
    return state
}

export default WishlistReducer;