import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import FlexView from '../../bootstrap/FlexView';
import TextPara from '../../bootstrap/TextPara';
import useCouponandDealer from '../../hooks/useCouponAndDealer';

import Ionicions from "react-native-vector-icons/Ionicons"
import { themeColor } from '../../static/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import usePlaceDealerOrder from '../../hooks/usePlaceDealerOrder';
import usePlaceOrder from '../../hooks/usePlaceOrder';
import { removeCouponCode, removeDealerCode } from '../../reduxStore/actions/PreOrderActions';

const MainPlaceOrder = () =>{
    const {couponCode, setCouponCode, couponValid,setCouponValid, couponLoading, couponError, dealerCode, setDealerCode,dealerInfo, dealerValid,setDealerValid, dealerError, dealerLoading, handleDealerSubmit,handleCouponSumbit} = useCouponandDealer();
    const {addDealerOrder} = usePlaceDealerOrder();
    const {makeOrder, loading} = usePlaceOrder()
    const preOrderReducerState = useSelector(state=> state.PreOrderReducer);

    const dispatch = useDispatch()

    const {amountBeforeCoupon} = preOrderReducerState
    let discountAbs = 0;
    if(dealerValid)discountAbs = amountBeforeCoupon;
    let GrandTotal = amountBeforeCoupon - discountAbs;

    function handlePlaceOrder(){
        console.log("inside Place ORder")
        makeOrder(couponValid, couponCode)
    }
    function changeDealerCode(){
        setDealerValid(false)
        dispatch(removeDealerCode())
    }
    function changeCouponCode(){
        setCouponValid(false)
        dispatch(removeCouponCode())
    }

    const OrderButtonComp = dealerValid ?
        <Button mode="contained" color={themeColor} style={styles.orderButton} onPress={()=> addDealerOrder(dealerInfo)}>Place DealerOrder</Button>
        :
        <Button mode="contained" color={"red"} style={styles.orderButton} onPress={()=> handlePlaceOrder()}>{loading?"Loading...":"Place Order"}</Button>
    return (
    <View style={styles.mainContainer}>
        <View style={styles.discountContainer}>
            <FlexView row alignItems="fe"> 
            <TextInput style={styles.textInput} 
                type="text"
                label="Enter Coupon Code"
                theme={{colors:{text:couponValid?themeColor: "black", placeholder:"grey"}}} 
                underlineColor="black"  
                activeUnderlineColor="green"
                value={couponCode}
                disabled={couponValid}
                onChangeText={setCouponCode}
                right={couponValid ? <TextInput.Icon name="check-decagram" color={themeColor}/>: null}

            />
            {
                couponValid ?
                <Button color="green" onPress={changeCouponCode}  disabled={dealerLoading}>change</Button>
                : 
                <Button color="green" onPress={handleCouponSumbit } loading={couponLoading} >Apply</Button>

            }
            </FlexView>
            {couponError!==null && <TextPara color="red">{couponError}</TextPara>}

        </View>
        <View style={styles.dealerCodeContainer}>
           <FlexView row alignItems="fe"> 
            <TextInput style={styles.textInput} 
                type="text"
                label="Enter Dealer Code"
                theme={{colors:{text:dealerValid?themeColor: "black", placeholder:"grey"}}} 
                underlineColor="black"  
                activeUnderlineColor="green"
                value={dealerCode}
                disabled={dealerValid}
                onChangeText={value => setDealerCode(value)}
                right={dealerValid ? <TextInput.Icon name="check-decagram" color={themeColor}/>: null}
            />
            {
                dealerValid ?
                <Button color="green" onPress={changeDealerCode} loading={dealerLoading} disabled={dealerLoading}>change</Button>
                : 
                <Button color="green" onPress={handleDealerSubmit } loading={dealerLoading} >Apply</Button>

            }
            </FlexView>
            {dealerError!==null && <TextPara color="red">{dealerError}</TextPara>}

        </View>
        <View style={styles.totalContainer}>
            <FlexView row justify="sb" >
                <TextPara>Item Total</TextPara>
                <TextPara>₹{amountBeforeCoupon}</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara>Discount</TextPara>
                <TextPara>-₹{discountAbs}</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara>Delievery Charges</TextPara>
                <TextPara>₹0</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara style={{fontSize: 20}}>Grand Total</TextPara>
                <TextPara style={{fontSize: 20}}>₹{GrandTotal}</TextPara>
            </FlexView>
        </View>
        {OrderButtonComp}
    </View>)
}

const styles = StyleSheet.create({
    mainContainer:{
        margin: 10,
        flex:1
    },
    discountContainer:{
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingBottom: 10
    },
    dealerCodeContainer:{

        backgroundColor:'white',
        paddingHorizontal:10,
        paddingBottom: 10
    },
    textInput:{
        flex:1,
        backgroundColor:"transparent",
        textShadowColor:'green'
    },
    totalContainer:{
        backgroundColor:"white",
        padding: 10,
    },
    orderButton:{
        position:"absolute",
        bottom:0,
        width: "100%"
    }



})

export default MainPlaceOrder;