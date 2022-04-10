import { LOGOUT_USER, SIGNIN_USER } from "../store/ACTION_DEFINATION"


export const addAddress = () =>async(dispatch)=>{
    
}

export const SignInUser = (user) =>{
    
    return {type: SIGNIN_USER, payload: user}
}

export const LogoutUser = () =>{

    return {type: LOGOUT_USER}
}