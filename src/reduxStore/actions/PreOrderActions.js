import { ADD_ADDRESS_PRE, ADD_COUPON_CODE, ADD_DEALER_CODE, ADD_ITEMS } from "../store/ACTION_DEFINATION"


export const AddPreOrderItems = (CartList, totalAmount) =>{

    return {type: ADD_ITEMS, payload:{
        cartList: CartList, totalAmount: totalAmount
    }}
}

export const AddAddressPre = (address) =>{
    console.log("IN AddAddressPre")
    return {type: ADD_ADDRESS_PRE, payload: address}

}
export const AddCouponCode = (couponCode) =>{

    return {type: ADD_COUPON_CODE, payload: couponCode}
}
export const AddDealerCode = (dealerCode) =>{

    return {type: ADD_DEALER_CODE, payload: dealerCode}
}