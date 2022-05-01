import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore"



const useLoadMyOrders = () =>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);
    const [dealerOrders, setDealerOrders] = useState([]);
    const userInfo = useSelector((state)=> state.UserReducer.userInfo)
    let userId = userInfo.uid

    async function loadOrders(){
        setLoading(true)
        setError("")
        try {
            const querySnapshot = await firestore().collection('orders-customer').where('customeruid', "==" , userId).get()
            let orderArray = []
            querySnapshot.forEach(documentSnapshot => {
                orderArray.push({id:documentSnapshot.id, ...documentSnapshot.data()})
            });

            const dealerOrdersSnapshot = await firestore().collection('orders-dealer').where('customeruid', "==" , userId).get()
            let dealerOrdersArray = []
            dealerOrdersSnapshot.forEach(documentSnapshot => {
                dealerOrdersArray.push({id:documentSnapshot.id, ...documentSnapshot.data()})
            });
            setDealerOrders(dealerOrdersArray)
            setOrders(orderArray)
            setLoading(false)
            setError("")
            

            
        } catch (error) {
            setLoading(false)
            setError("Error Occoured")
            console.log(error)
        }
    }

    useEffect(()=>{
        loadOrders();
    },[])
    
    return {loading, error, orders,dealerOrders, loadOrders}
}


export default useLoadMyOrders