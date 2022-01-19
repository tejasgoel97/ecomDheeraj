import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import CardFullWidth from '../components/CardFullWidth'
import FlexView from '../bootstrap/FlexView'
import { themeColor } from '../static/AppColors'
const CartScreen = () =>{
    const {CartList, total} = useSelector(state=> state.CartReducer)
    let CartListArray = []
    for(let i in CartList){
        CartListArray.push(CartList[i])
    }
    let totalPrice = 0;
    totalPrice = CartListArray.reduce((tot, item)=>{
        return tot + item.price*item.quantity
    }, 0 )
    console.log("totalPrice")
    return(
        <View style={styles.mainContainer}>
            <View style={styles.total}>
                <Text>Order Details</Text>
                <FlexView style={styles.totalPriceContainer} justify="sb" row>
                    <Text>Cart Total</Text>
                    <Text>{totalPrice}</Text>
                </FlexView>
                <FlexView justify='sb' row style={styles.discountPriceContainer}>
                    <Text>Discount</Text>
                    <Text>300</Text>
                </FlexView>
            </View>
            <View style={styles.placeOrderContainer}>
                <Button mode='contained' color={themeColor}>Place Order</Button>
            </View>
            <FlatList 
                data={CartListArray}
                renderItem={({item})=><CardFullWidth item={item}/>}
                />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1, 
        paddingBottom: 40
    },
    total:{
        backgroundColor:"red",
        margin: 20
    },
    totalPriceContainer:{
        backgroundColor:'green'
    },
    placeOrderContainer:{
        position:"absolute",
        bottom:0,
        width: "100%"
    }
})
export default CartScreen;