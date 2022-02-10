import { SELECT_ORDER_ADDRESS } from "../store/ACTION_DEFINATION";

const initialState = {

}


const CurrentOrderReducer = (state=initialState, action)=>{

    switch (action.type) {
        case SELECT_ORDER_ADDRESS:
            
            break;
    
        default:
            break;
    }
    return state
}

export default CurrentOrderReducer