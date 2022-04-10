import { CHANGE_AREA_PINCODE } from "../store/ACTION_DEFINATION"

const initialState = {
    PINCODE : "121102"
}

const AreaInfoReducer = (state=initialState, action) =>{

    switch(action.type){
        case CHANGE_AREA_PINCODE:
            return {...state, PINCODE: action.payload.PinCode}
    }

    return state
}

export default AreaInfoReducer;