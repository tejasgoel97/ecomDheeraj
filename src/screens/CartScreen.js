// Basic React Import
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react' 
//Redux Import
import { useDispatch, useSelector } from 'react-redux'
// React Native Paper
import { Button } from 'react-native-paper'
// Custom Components
import CardFullWidth from '../components/CardFullWidth'

// FlexView and Static Colors
import FlexView from '../bootstrap/FlexView'
import { themeColor } from '../static/AppColors'
import TextPara from '../bootstrap/TextPara'


// Here Main Component Starts
const CartScreen = ({navigation}) =>{
    const {CartList, total} = useSelector(state=> state.CartReducer)
    let CartListArray = []
    for(let i in CartList){
        CartListArray.push(CartList[i])
    }
    let totalPrice = 0;
    totalPrice = CartListArray.reduce((tot, item)=>{
        return tot + item.SP*item.quantity
    }, 0 )

    function handlePlaceOrder(){
        if(totalPrice<0){
            return null
        }
        navigation.navigate("SelectAddressScreen");
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.total}>
                <FlexView style={styles.totalPriceContainer} justify="sb" row>
                    <TextPara>Cart Total</TextPara>
                    <TextPara>{totalPrice}</TextPara>
                </FlexView>
                <FlexView justify='sb' row style={styles.discountPriceContainer}>
                    <TextPara>Discount</TextPara>
                    <TextPara>300</TextPara>
                </FlexView>
            </View>
            <View style={styles.placeOrderContainer}>
                <Button mode='contained' color={themeColor} onPress={handlePlaceOrder}>Place Order</Button>
            </View>
            <FlatList 
                data={CartListArray}
                renderItem={({item})=><CardFullWidth item={item}/>}
                />
        </View>
    )
} 

// Styles are Here
const styles = StyleSheet.create({
    mainContainer:{
        flex:1, 
        paddingBottom: 40
    },
    total:{
        margin: 20
    },
    totalPriceContainer:{
    },
    placeOrderContainer:{
        position:"absolute",
        bottom:0,
        width: "100%"
    }
})
export default CartScreen;