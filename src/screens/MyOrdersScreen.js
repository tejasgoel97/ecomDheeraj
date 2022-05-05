import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import TextPara from '../bootstrap/TextPara'
import useLoadMyOrders from '../hooks/useLoadMyOrders'
import { themeColor } from '../static/AppColors'


const MyOrdersScreen = () =>{
    const {error, loading, orders, dealerOrders} = useLoadMyOrders()
    console.log(orders)
    const dd = dealerOrders[0]?.createdAt
    if(dd) console.log(new Date(dd.toDate()).toDateString())
    console.log("dealer orders", dealerOrders[0]?.createdAt)

    return( 
    <ScrollView style={styles.mainContainer}>
        {orders.length >0 &&
        <View> 
            <TextPara size={15}> Order History</TextPara>
            <View>
                {orders.map((order)=>{
                    const date = new Date(order.createdAt.toDate()).toDateString();
                    return <View style={styles.orderItem}>
                        <TextPara color={themeColor} style={{fontSize: 14, fontWeight:"bold"}}>{date}</TextPara>
                        <View>
                            <TextPara>Amount: {order.amountAfterCoupon}</TextPara>
                        </View>
                        {order.items.map((item)=>{
                            return <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"yellow", padding:5, margin:2, alignItems:"center"}}>
                                    <View style={{width: "80%"}}>
                                        <TextPara numberOfLines={2}>{item.productName}</TextPara>
                                    </View>
                                    <View style={{flexDirection:"row-reverse"}}>
                                        <TextPara >X {item.quantity}</TextPara>
                                    </View>
                                </View>
                        })}
                        <View>
                            <TextPara>Devieveribg to</TextPara>
                            <TextPara>Name: {order.deliveryAddress.name} {order.deliveryAddress.number}, </TextPara>
                            <TextPara>{order.deliveryAddress.houseNo} {order.deliveryAddress.street}</TextPara>
                            <TextPara>{order.deliveryAddress.landmark}</TextPara>
                            <TextPara>{order.deliveryAddress.pinCode}, {order.deliveryAddress.city}</TextPara>
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"space-between" }}>
                            <TextPara style={{backgroundColor:"green", padding: 5}} color="white">
                                {order.status}
                            </TextPara>
                            <Pressable onPress={()=> console.log("handleOrder cancel")}>
                                <TextPara color="red">Cancel Order</TextPara>
                            </Pressable>
                        </View>
                    </View>
                })}
            </View>
        </View>
        }
    </ScrollView>
    )
}

const styles = StyleSheet.create({
   mainContainer:{ 
    padding: 10,
    flex:1,
    backgroundColor: "red",
},
orderItem:{
    backgroundColor:"white",
    borderRadius:10,
    padding:10,
    marginTop:10
    
}
})


export default MyOrdersScreen