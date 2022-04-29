import { ADD_ADDRESS_PRE, ADD_COUPON_CODE, ADD_DEALER_CODE, ADD_ITEMS, PAYMENT_INITIATED, REMOVE_COUPON_CODE, REMOVE_DEALER_CODE } from "../store/ACTION_DEFINATION"


export const AddPreOrderItems = (CartList, totalAmount) =>{

    return {type: ADD_ITEMS, payload:{
        cartList: CartList, totalAmount: totalAmount
    }}
}

export const AddAddressPre = (address) =>{
    console.log("IN AddAddressPre")
    return {type: ADD_ADDRESS_PRE, payload: address}

}
export const AddCouponCode = (couponCode, discountPercent) =>{

    return {type: ADD_COUPON_CODE, payload: {couponCode, discountPercent}}
}
export const AddDealerCode = (dealerCode) =>{

    return {type: ADD_DEALER_CODE, payload: dealerCode}
}
export const  removeDealerCode = () =>{
    return {type: REMOVE_DEALER_CODE}
}
export const removeCouponCode = () => {
    return {type: REMOVE_COUPON_CODE}
}
export const paymentInitiated = () =>{
    return {type: PAYMENT_INITIATED}
}