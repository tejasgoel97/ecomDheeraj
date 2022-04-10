import { LOGOUT_USER, SIGNIN_USER } from "../store/ACTION_DEFINATION";

const initialState = {
    isLoggedIn: false,
    userInfo:{
        userId:"asdxjhasu11221001",
        userName:"uiuiui",
        displayName:"Tejas",     
    },
    userAddress:[
        {
            name:" sandy",
            houseNo:"216",
            streetName:" Huda Sector 2",
            landMark:" Near community Center",
            areaPin: 1212,
            City:" Palwal",
            addressNickName:"My Home"

        },  {
            name:" sandy",
            houseNo:"216",
            streetName:" Huda Sector 2",
            landMark:" Near community Center",
            areaPin: 1212,
            City:" Palwal",
            addressNickName:"My Home"

        },  {
            name:" sandy",
            houseNo:"216",
            streetName:" Huda Sector 2",
            landMark:" Near community Center",
            areaPin: 1212,
            City:" Palwal",
            addressNickName:"My Home"

        },  {
            name:" sandy",
            houseNo:"216",
            streetName:" Huda Sector 2",
            landMark:" Near community Center",
            areaPin: 1212,
            City:" Palwal",
            addressNickName:"My Home"

        },  {
            name:" sandy",
            houseNo:"216",
            streetName:" Huda Sector 2",
            landMark:" Near community Center",
            areaPin: 1212,
            City:" Palwal",
            addressNickName:"My Home"

        },
    ]
}
const UserReducer = (state=initialState, action) =>{
    switch (action.type) {
        case SIGNIN_USER:          
            console.log(action.payload)
            return {...state,isLoggedIn: true, userInfo:action.payload }
        case LOGOUT_USER:
            console.log("LOGGING OUT USER IN REDUCER")
            return {...state, isLoggedIn: false, userInfo: null}
    }
    return state
}

export default UserReducer;