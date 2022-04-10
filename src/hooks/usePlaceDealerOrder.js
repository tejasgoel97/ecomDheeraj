import firestore from "@react-native-firebase/firestore"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";


const usePlaceDealerOrder = () =>{
    const [loadingD_Order, setLoadingD_Order] = useState(false);
    const [errorD_Order, setErrorD_Order] = useState(null)
    const currentOrderState = useSelector(state=> state.PreOrderReducer)

    const navigation = useNavigation();

    const addDealerOrder = (dealerInfo) =>{
        setLoadingD_Order(true)
        setErrorD_Order(null)
        console.log("in Add DealerOrder")
        console.log(currentOrderState)

        console.log(dealerInfo)
        const finalOrder = {
            dealerCode: dealerInfo.dealerCode,
            validDealer: true,
            deliveryAddress: currentOrderState.deliveryAddress,
            items: currentOrderState.cartList,
            orderValue: 0,
            dealerName: dealerInfo.dealerName,
        }
        console.log("DINFO",finalOrder)
        firestore().collection("orders-Dealer").add(finalOrder)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setLoadingD_Order(false)
            setErrorD_Order(null)
            navigation.navigate("Tabnav", {screen: "Home"})
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setLoadingD_Order(false)
            setErrorD_Order("Can't Create Order")
            
            
        });
            console.log("ADTER ORDER")
        }
    return {
        loadingD_Order, errorD_Order, addDealerOrder
    }
}
function dealerOrderModel (){
    return {

    }
}
export default usePlaceDealerOrder; 