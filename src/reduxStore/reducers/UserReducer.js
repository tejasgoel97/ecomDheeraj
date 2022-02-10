const initialState = {
    isLoggedIn: true,
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
        case "OK":            
            break;
    }
    return state
}

export default UserReducer;