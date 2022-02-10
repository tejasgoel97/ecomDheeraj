import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST } from "../store/ACTION_DEFINATION"



export const AddToCartAction= ({item}) =>  async(dispatch) =>{
    const {id, productName, SP, featureImage, MRP} = item
    // console.log(id, productName, price, imgUrl)

    dispatch({type:ADD_TO_CART, payload: {item: {id, productName,SP, featureImage, MRP}}})
    dispatch({type:REMOVE_FROM_WISHLIST, payload:{productId: id}})
}
export const RemoveFromCartAction= ({item}) =>  async(dispatch) =>{
    const {id, productName, SP, featureImage, MRP } = item

    dispatch({type:REMOVE_FROM_CART, payload:{item: {id, productName, SP, featureImage, MRP}}})
}
