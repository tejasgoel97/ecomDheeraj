import { CHANGE_AREA_PINCODE, CLEAR_CART } from "../store/ACTION_DEFINATION"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updatePinCode = ({PinCode}) =>async (dispatch)=>{
    console.log(PinCode, "In action")
    try {
        await AsyncStorage.setItem("PINCODE", PinCode)
        dispatch({type: CHANGE_AREA_PINCODE, payload: {PinCode}})
        dispatch({type:CLEAR_CART})
      } catch (e) {
          console.log(err)
      }
}

export const loadPinFromStorage = () => async (dispatch)=>{
    try {
        
        const PinCode = await AsyncStorage.getItem("PINCODE")
        if(PinCode !== null) {
            console.log(PinCode)
            dispatch(updatePinCode({PinCode}))
          // value previously stored
        }
      } catch(e) {
        // error reading value
      }
    
}