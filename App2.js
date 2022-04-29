import React from 'react'

import {View, Button} from 'react-native'
import RazorpayCheckout from 'react-native-razorpay'


const App = () =>{

  const makeOrder = async () => {
    const data = await fetch("http://192.168.1.4:3000/createOrder", {
     method:"POST",
     headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
     body:JSON.stringify({
      "amount": 5000,
      "currency": "INR",
      "receipt": "rcptid_11"
  })  
  })
  const order = await data.json()

  console.log(order)
    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_0oDAQt9kIu8hUw',
    amount: '5000',
    name: 'Acme Corp',
    order_id: order.id,//Replace this with an order_id created using Orders API.
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}

  return(
    <View style={{flex:1, justifyContent:"center"}}>
        <Button title='Pay' onPress={makeOrder}></Button>
    </View>
  )
}


export default App