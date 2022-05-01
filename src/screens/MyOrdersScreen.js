import React from 'react'
import {View, StyleSheet} from 'react-native'
import TextPara from '../bootstrap/TextPara'
import useLoadMyOrders from '../hooks/useLoadMyOrders'


const MyOrdersScreen = () =>{
    const {error, loading, orders, dealerOrders} = useLoadMyOrders()
    console.log(orders)
    console.log("dealer orders", dealerOrders)

    return( 
    <View style={styles.mainContainer}>
        {orders.length >0 &&
        <View> 
            <TextPara size={15}> Order History</TextPara>
            <View>
                {orders.map((order)=>{
                    return <View style={styles.orderItem}>
                        <TextPara>{order.paymentId}</TextPara>
                    </View>
                })}
            </View>
        </View>
        }
    </View>
    )
}

const styles = StyleSheet.create({
   mainContainer:{ 
    padding: 10,
    flex:1,
    backgroundColor: "red"}
})


export default MyOrdersScreen