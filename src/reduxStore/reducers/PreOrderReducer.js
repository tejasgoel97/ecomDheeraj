import { ADD_ADDRESS_PRE, ADD_ITEMS } from "../store/ACTION_DEFINATION";

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
    couponCodeApplied: "",
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
            return {...state, deliveryAddress: action.payload, state, currentStatus:OrderStates.ON_ORDER_CONFIRM_PAGE};
        default:
            break;
    }
    return state
}

export default PreOrderReducer