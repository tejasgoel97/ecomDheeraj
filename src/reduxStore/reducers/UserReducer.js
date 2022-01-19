const initialState = {
    userInfo:{
        userId:"asdxjhasu11221001",
        userName:"uiuiui",
        displayName:"Tejas",
        
    },
    userAddress:[
        {
            name:" sandy",
            houseNo:"",
            streetName:"",
            landMark:"",
            areaPin: 1212,
            City:"",

        }
    ]
}


const UserReducer = (state=initialState, action) =>{
    switch (action.type) {
        case "OK":            
            break;
          
    }
    return state
}