import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, TextInput} from 'react-native-paper'
import FlexView from '../../bootstrap/FlexView';
import TextPara from '../../bootstrap/TextPara';

const MainPlaceOrder = () =>{

    return (
    <View style={styles.mainContainer}>
        <View style={styles.discountContainer}>
            <TextInput style={styles.textInput} 
            type="ou"
            label="Enter Coupon Code"
            theme={{colors:{text:"red", placeholder:"grey"}}} 
            underlineColor="black"  
            activeUnderlineColor="green"
            />
            <Button color="green">Apply</Button>
        </View>
        <View style={styles.totalContainer}>
            <FlexView row justify="sb" >
                <TextPara>Item Total</TextPara>
                <TextPara>₹290</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara>Discount</TextPara>
                <TextPara>₹90</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara>Delievery Charges</TextPara>
                <TextPara>₹20</TextPara>
            </FlexView>
            <FlexView row justify="sb" >
                <TextPara style={{fontSize: 20}}>Grand Total</TextPara>
                <TextPara style={{fontSize: 20}}>₹1000</TextPara>
            </FlexView>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    mainContainer:{
        display:"flex",
        margin: 10
    },
    discountContainer:{
        flexDirection:'row',
        alignItems:'flex-end',
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

    }


})

export default MainPlaceOrder;