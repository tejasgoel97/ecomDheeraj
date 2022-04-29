import { ADD_ADDRESS_PRE, ADD_COUPON_CODE, ADD_DEALER_CODE, ADD_ITEMS, REMOVE_COUPON_CODE, REMOVE_DEALER_CODE } from "../store/ACTION_DEFINATION";

const OrderStates={
    NOT_STARTED:"NOT_STARTED",
    ON_ADDRESS_PAGE : "ON_ADDRESS_PAGE",
    ON_ORDER_CONFIRM_PAGE: "ON_ORDER_CONFIRM_PAGE",
    PAYMENT_INITIATED: "PAYMENT_INITIATED",
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    PAYMENT_DECLINED: "PAYMENT_DECLINED"

}

const intialState = {
    amountBeforeCoupon: 0,
    amountAfterCoupon: 0,
    isCouponApplied: false,
    couponCode: "",
    isDealer: false,
    dealerCode: "",
    cartList: [],
    deliveryAddress:{

    },
    paymentOrderId: "",
    isSuccessFullPayment: "",
    currentStatus: OrderStates.NOT_STARTED,
    discountInRs: "",
    discountInPercent: "",
    
}


const PreOrderReducer = (state=intialState, action) =>{

    switch (action.type) {
        case ADD_ITEMS:
            const {cartList , totalAmount} = action.payload;
            if(cartList?.length && totalAmount) {
                const stateObj = {...state}
                return {...stateObj, cartList: cartList, amountBeforeCoupon:totalAmount, currentStatus: OrderStates.ON_ADDRESS_PAGE}
            }
            break;
        case ADD_ADDRESS_PRE:
            return {...state, deliveryAddress: action.payload, currentStatus:OrderStates.ON_ORDER_CONFIRM_PAGE};
        case ADD_DEALER_CODE:
            return {...state, isDealer: true , dealerCode: action.payload, isCouponApplied: false, couponCode: ""}
        case ADD_COUPON_CODE:
            return {...state, isDealer: false , dealerCode: "", isCouponApplied: true, couponCode: action.payload}
        case REMOVE_COUPON_CODE:
            return {...state, isDealer: false , dealerCode: "", isCouponApplied: false, couponCode: ""}
        case REMOVE_DEALER_CODE:
            return {...state, isDealer: false , dealerCode: "", isCouponApplied: false, couponCode: ""}
        default:
            break;
    }
    return state
}

export default PreOrderReducer