import { ADD_TO_CART, REMOVE_FROM_CART } from "../store/ACTION_DEFINATION";

// const initialState = {
//     CartList:[],
//     total :0
// }

const initialState = {
    CartList:{},
    total:0
}


const CartReducer = (state=initialState, action) =>{
    switch (action.type) {
        // case ADD_TO_CART:
        //     let {id, productName, SP, featureImage} = action.payload.item
        //     // console.log({id, productName, SP, featureImage})
        //     let {CartList, total} = {...state};
        //     let list = [...CartList]
        //     console.log(list)
        //     total = total+1;
        //     let index = list.findIndex(list=>{
        //         if(list.id === id) return true
        //     });
        //     console.log(index, index)
        //     if(index>-1){
        //         let quantity =  list[index].quantity +1
        //         list[index] = {id,productName, SP, featureImage, quantity}
        //     }
        //     else{
        //         let quantity = 1
        //         list.push({id,productName, SP, featureImage, quantity})
        //     }
        //     return { CartList:list, total}

        case ADD_TO_CART:{
            let {id, productName, SP, featureImage, MRP} = action.payload.item
            console.log({id, productName, SP, featureImage})
                let list = {...state.CartList};
                let {total} = {...state};
                total = total+1;
                if(list[id]){
                   list[id].quantity = list[id].quantity+1;

                }
                else{
                    let newCartItem = {
                        id, productName, SP, MRP, featureImage, quantity:1
                    }
                    list[id] = newCartItem
                }
                return {total, CartList: list}
        }
        case REMOVE_FROM_CART:
            let {id, productName, SP, MRP, fearureImage} = action.payload.item
            console.log({id, productName, SP, fearureImage})
            let list = {...state.CartList};
            let {total} = {...state};
            total = total-1;
            if(!list[id]?.quantity){
                return state
            }
            if(list[id].quantity <=1){
                delete list[id]
            }else{
                let quantity = list[id].quantity -1;
                let newCartItem = {id, productName, SP, MRP, fearureImage,  quantity}
                list[id] = newCartItem;
            }
            return {total, CartList:list}
            
        default:
            return state
    }
}


export default CartReducer