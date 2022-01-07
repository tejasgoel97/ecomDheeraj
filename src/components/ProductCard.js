import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react' 
import { Button } from 'react-native-paper';
import { AddToCartColor, priceTextColor } from '../static/AppColors';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCartAction } from '../reduxStore/actions/CartActions';
import FlexView from '../bootstrap/FlexView';
import FontAwsome5 from "react-native-vector-icons/FontAwesome5"



const ProductCard = ({item, navigation}) =>{
    let {id } = item
    const CartItems= useSelector(state=> state.CartReducer.CartList);
    
    console.log(CartItems)
    const dispatch = useDispatch()
    // let CartItemsArray = []
    // for(let ItemIndex in CartItems){
    //     // console.log(CartItem);
    //     CartItemsArray.push(CartItems[ItemIndex]);
    // }
    const{width,height} = useWindowDimensions()
    console.log(height,width);
    let imageHeight = (width/1.8)-30
    function IncreaseCarthandler(){
        dispatch(AddToCartAction({item}))
    }
    let ButtonComp = <Button mode="contained" color={AddToCartColor} onPress={()=> IncreaseCarthandler()}>Add To Cart</Button>
    if(CartItems[id]){
        console.log("hai ", )
        ButtonComp = (
            <FlexView row justify="sb" alignItems="c">
                <Button mode="text" color={AddToCartColor} onPress={()=> IncreaseCarthandler()}>
                    <FontAwsome5 name="minus" size={20}></FontAwsome5>
                </Button>
                <Text style={{color:"red"}}>{CartItems[id].quantity}</Text>
                <Button mode="text" color={AddToCartColor} onPress={()=> IncreaseCarthandler()}> 
                    <FontAwsome5 name="plus" size={20}></FontAwsome5>
                </Button>
            </FlexView>)
    }
    return(
        <View style={[styles.mainContainer, {width:imageHeight, height: imageHeight+120}]}>
            <Pressable onPress={()=> navigation.navigate("ProductScreen")}>
                <View style={styles.imageContainer}>
                    <Image 
                    source={{uri:item.imgUrl[0]}}
                    style={{height: imageHeight, width: imageHeight}}
                    height={imageHeight}
                    width={imageHeight}/>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.priceText}> ₹ {item.price}</Text>
                    <Text style={styles.text}>{item.productName}</Text>
                    {/* <Button mode="contained" color={AddToCartColor} onPress={()=> IncreaseCarthandler()}>Add To Cart</Button> */}
                    {ButtonComp}
                </View>
            </Pressable> 
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        margin: 10,
        backgroundColor:"white",
        borderRadius: 10,
        overflow:"hidden",
    },
    imageContainer:{
        width: "100%",
        
    },
    detailContainer:{
        margin: 5,
        justifyContent:"space-between",
        height: 110
    },
    text:{
        color: "rgb(77, 77, 77)",
    },
    priceText:{
        color:priceTextColor,
        fontSize: 15,
        fontWeight:"700"
    }
})
export default ProductCard;