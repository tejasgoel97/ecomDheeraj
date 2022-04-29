import { ADD_TO_CART, CHANGE_AREA_PINCODE, CLEAR_CART, LOAD_LATEST_CART, REMOVE_FROM_CART } from "../store/ACTION_DEFINATION";

// const initialState = {
//     CartList:[],
//     total :0
// }

const initialState = {
    CartList:[],
    total:0
}


const CartReducer = (state=initialState, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            var {id, productName, SP, featureImage} = action.payload.item
            // console.log({id, productName, SP, featureImage})
            var {CartList, total} = {...state};
            var list = [...CartList]
            total = total+1;
            var index = list.findIndex(list=>{
                if(list.id === id) return true
            });
            if(index>-1){
                let quantity =  list[index].quantity +1
                list[index] = {id,productName, SP, featureImage, quantity}
            }
            else{
                let quantity = 1
                list.push({id,productName, SP, featureImage, quantity})
            }
            return { CartList:list, total}

        // case ADD_TO_CART:{
        //     let {id, productName, SP, featureImage, MRP} = action.payload.item
        //     console.log({id, productName, SP, featureImage})
        //         let list = {...state.CartList};
        //         let {total} = {...state};
        //         total = total+1;
        //         if(list[id]){
        //            list[id].quantity = list[id].quantity+1;

        //         }
        //         else{
        //             let newCartItem = {
        //                 id, productName, SP, MRP, featureImage, quantity:1
        //             }
        //             list[id] = newCartItem
        //         }
        //         return {total, CartList: list}
        // }
        // case REMOVE_FROM_CART:
        //     var {id, productName, SP, MRP, fearureImage} = action.payload.item
        //     console.log({id, productName, SP, fearureImage})
        //     var list = {...state.CartList};
        //     var {total} = {...state};
        //     total = total-1;
        //     if(!list[id]?.quantity){
        //         return state
        //     }
        //     if(list[id].quantity <=1){
        //         delete list[id]
        //     }else{
        //         let quantity = list[id].quantity -1;
        //         let newCartItem = {id, productName, SP, MRP, fearureImage,  quantity}
        //         list[id] = newCartItem;
        //     }
        //     return {total, CartList:list}
        case REMOVE_FROM_CART:
            var {id, productName, SP, featureImage} = action.payload.item
            // console.log({id, productName, SP, featureImage})
            var {CartList, total} = {...state};
            var list = [...CartList]
            total = total-1;
            var index = list.findIndex(item=>{
                if(item.id === id) return true
            });
            if(index>-1){
                let quantity =  list[index].quantity-1
                if(quantity === 0){
                    list = list.filter(item=> item.id !== id)
                }
                else{
                    list[index] = {id,productName, SP, featureImage, quantity}
                }                
            }

            return { CartList:list, total}
        case LOAD_LATEST_CART:
            console.log(" In teh load");
            console.log(action.payload);
        case CLEAR_CART:
            return {CartList:[], total: 0}
            
        default:
            return state
    }
}


export default CartReducer