import React, { useState } from 'react'
import RazorpayCheckout from 'react-native-razorpay'
import { useDispatch, useSelector } from 'react-redux'
import {Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"
import { paymentInitiated } from '../reduxStore/actions/PreOrderActions'
import { useNavigation } from "@react-navigation/native";

import { PAYMENT_COMPLETED, PAYMENT_INITIATED } from '../reduxStore/store/ACTION_DEFINATION'



const usePlaceOrder = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const preOrderReducerState = useSelector((state)=> state.PreOrderReducer)
    const userInfo = useSelector((state)=> state.UserReducer.userInfo)
    const currentOrderState = useSelector(state=> state.PreOrderReducer)
    let phoneNumber = userInfo.phoneNumber
    let userId = userInfo.uid
    let amountBeforeCoupon = preOrderReducerState.amountBeforeCoupon;
    const dispatch = useDispatch();
    // console.log(preOrderReducerState.amountBeforeCoupon)
    // console.log(userInfo.phoneNumber)
    const navigation = useNavigation()
    const makeOrder = async (couponValid, couponCode) => {
      console.log(couponValid, couponCode)
      let finalOrder = {
        couponCode: couponValid ? couponCode: null,
        couponValid: true,
        deliveryAddress: currentOrderState.deliveryAddress,
        items: currentOrderState.cartList,
        amountBeforeCoupon: amountBeforeCoupon,
        amountAfterCoupon: 0,
        createdAt: new Date(),
        createdBy: {phoneNumber: userInfo.phoneNumber, uid:userInfo.uid},
        status: "Created",
        changesHistory: [{
            status: "created",
            time: new Date(),
            changedBy: {phoneNumber: userInfo.phoneNumber, uid:userInfo.uid},
        }]
    };
      console.log(finalOrder)
      const token = await auth().currentUser.getIdToken(true)
      console.log(token)

      setError("")
      setLoading(true)
      try{
        const data = await fetch("http://192.168.1.2:3000/createOrder", {
         method:"POST",
         headers: {
          'Content-Type': 'application/json'
        },
         body:JSON.stringify({
          "amount": 1000,
          "currency": "INR",
          "receipt": "rcptid_112",
          token: token
        })  
      })
      const order = await data.json()
      console.log(order)
        var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_0oDAQt9kIu8hUw',
        amount: amountBeforeCoupon,
        name: 'Sunway Hub',
        order_id: order.id,//Replace this with an order_id created using Orders API.
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: phoneNumber,
          name: 'Gaurav Kumar'
        },
        theme: {color: '#53a20e'}
      }
      dispatch({type: PAYMENT_INITIATED})
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        console.log("data", data)
        firestore()
        .collection('payment')
        .doc(order.id)
        .update({
          paymentId: data.razorpay_payment_id,
          status: "COMPLETED"
        }).then(()=>{
          finalOrder = {...finalOrder,paymentId: data.razorpay_payment_id, orderId: order.id }
          firestore().collection("orders-customer").doc(order.id).set(finalOrder)
        })
        .then((docRef) => {
            setLoading(false)
            setError(null)
            console.log('User updated!');
            dispatch({type: PAYMENT_COMPLETED})
            setLoading(false)
            setError(false)
            navigation.navigate("Tabnav", {screen: "Home"})
        })
        

      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
        firestore()
        .collection('payment')
        .doc(order.id)
        .update({
          error:{
            code: error.code,
            description: error.description
          },
          status: "FAILED"
        })
        .then(() => {
          console.log('User updated!');
        });
      });
      }catch(err){
        setLoading(false)
        setError(true)
        Alert.alert("Can't Place Order Try Again", "Try Again",[
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
        console.log(err)
        setLoading(false)
        setError(true)
      }
    
      
    }

    return {loading, error, makeOrder}
}


export default usePlaceOrder