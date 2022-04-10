// Basic React Import
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react' 
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

import firestore from '@react-native-firebase/firestore'
import { LOAD_LATEST_CART } from '../reduxStore/store/ACTION_DEFINATION'
import { LoadLatestCart } from '../reduxStore/actions/CartActions'
import { AddPreOrderItems } from '../reduxStore/actions/PreOrderActions'



// Here Main Component Starts
const CartScreen = ({navigation}) =>{
    const {CartList, total} = useSelector(state=> state.CartReducer)
    const preOrderReducerState = useSelector(state=> state.PreOrderReducer)
    const userReducer = useSelector(state=> state.UserReducer)


    const dispatch = useDispatch()


    useEffect(()=>{
        firestore().collection('products').where(firestore.FieldPath.documentId() , "in" , ["IL6ZE074NaUUWBfKXvVX", "1evALvzYsbhufo6JhU3X"]).get()
        // firestore().collection('products').where("available", "==", true).get();
        
        .then(querySnapshot => {
            const itemArray = [];
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                let id = documentSnapshot.id;
                // let item = {id: documentSnapshot.id,...documentSnapshot.data() }
                let { productName,SP, featureImage, MRP} = documentSnapshot.data();
            //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());              itemArray.push(item)
               const itemCart = CartList.find(item => item.id ===id )
                if(itemCart){
                    const quantity = itemCart.quantity;
                    let item = {productName,SP, featureImage, MRP, id, quantity};
                    itemArray.push(item)

                }
            });
            dispatch(LoadLatestCart(itemArray))
          });

    }, [])
if(CartList?.length ==0){
    return <View style={styles.emptyCartContianer}>
        <TextPara size={22}>No item in the Cart</TextPara>
        <Button onPress={()=> navigation.navigate("Home")} color={themeColor}>Continue Shopping</Button>
    </View>
}
console.log("CartList", CartList)
let TotalAmount = 0;
CartList.forEach((i, index)=>{
    let {quantity, SP} = i;
    if(quantity && SP) {
        let itemAmount = SP*quantity;
        TotalAmount = TotalAmount + +itemAmount
    }
})
console.log("TotalAmount", TotalAmount)
function handlePlaceOrder(){
    if (!userReducer.isLoggedIn){
        return navigation.navigate("Login")
    }
    dispatch(AddPreOrderItems(CartList, TotalAmount))
    navigation.navigate("AddressFormScreen");
}
console.log("PRE PRDER",preOrderReducerState)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.total}>
                <FlexView style={styles.totalPriceContainer} justify="sb" row>
                    <TextPara>C art Total</TextPara>
                    <TextPara>{"totalPrice"}</TextPara>
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
                data={CartList}
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
    },
    emptyCartContianer:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default CartScreen;