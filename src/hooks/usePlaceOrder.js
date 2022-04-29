import React, { useState } from 'react'
import RazorpayCheckout from 'react-native-razorpay'
import { useSelector } from 'react-redux'
import {Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"



const usePlaceOrder = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const preOrderReducerState = useSelector((state)=> state.PreOrderReducer)
    const userInfo = useSelector((state)=> state.UserReducer.userInfo)
    const currentOrderState = useSelector(state=> state.PreOrderReducer)
    let phoneNumber = userInfo.phoneNumber
    let amountBeforeCoupon = preOrderReducerState.amountBeforeCoupon
    // console.log(preOrderReducerState.amountBeforeCoupon)
    // console.log(userInfo.phoneNumber)

    const makeOrder = async (couponValid, couponCode) => {
      console.log(couponValid, couponCode)
      const finalOrder = {
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
        const data = await fetch("http://192.168.1.6:3000/createOrder", {
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
        })
        .then(() => {
          console.log('User updated!');
          setLoading(false)
          setError(false)
        });

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
      }
    
      
    }

    return {loading, error, makeOrder}
}


export default usePlaceOrder