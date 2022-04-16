import { CHANGE_AREA_PINCODE } from "../store/ACTION_DEFINATION"

export const updatePinCode = ({PinCode}) =>async (dispatch)=>{
    console.log(PinCode, "In action")

    dispatch({type: CHANGE_AREA_PINCODE, payload: {PinCode}})
}