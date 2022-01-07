import { ADD_TO_CART, REMOVE_FROM_CART } from "../store/ACTION_DEFINATION"



export const AddToCartAction= ({item}) =>  async(dispatch) =>{
    const {id, productName, price, imgUrl } = item
    // console.log(id, productName, price, imgUrl)
    dispatch({type:ADD_TO_CART, payload: {item: {id, productName, price, imgUrl}}})
}
export const RemoveFromCartAction= ({product}) =>  async(dispatch) =>{
    dispatch({type:REMOVE_FROM_CART, payload: product})
}
