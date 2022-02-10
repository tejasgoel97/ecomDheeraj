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
    
    // console.log(CartItems)
    const dispatch = useDispatch()
    // let CartItemsArray = []
    // for(let ItemIndex in CartItems){
    //     // console.log(CartItem);
    //     CartItemsArray.push(CartItems[ItemIndex]);
    // }
    const{width,height} = useWindowDimensions()
    let imageHeight = (width/1.8)-30
    function IncreaseCarthandler(){
        dispatch(AddToCartAction({item}))
    }
    let ButtonComp = <Button mode="contained" color={AddToCartColor} onPress={()=> IncreaseCarthandler()}>Add To Cart</Button>
    if(CartItems[id]){
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
    const discount = Math.floor((1-item.SP/item.MRP)*100)
    return(
        <View style={[styles.mainContainer, {width:imageHeight, height: imageHeight+120}]}>
            <Pressable onPress={()=> navigation.navigate("ProductScreen",{productId:item.id})}>
                <View style={styles.imageContainer}>
                    <Image 
                    source={{uri:item.featureImage}}
                    style={{height: imageHeight, width: imageHeight}}
                    height={imageHeight}
                    width={imageHeight}/>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.SPText}>₹{item.SP}</Text>
                        <Text style={styles.MRPText}>₹{item.MRP}</Text>
                        <Text style={styles.discount}>{discount}% OFF</Text>
                    </View>
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
    MRPText:{
        color:priceTextColor,
        fontSize: 12,
        fontWeight:"500",
        marginRight: 5,
        textDecorationLine: 'line-through',
    },
    SPText:{
        color:priceTextColor,
        fontSize: 15,
        fontWeight:"700" ,
        marginRight: 5
    },
    discount:{
        color:"white",
        fontSize: 12,
        fontWeight:"500",
        backgroundColor: "green",
        paddingHorizontal: 4,
        borderRadius: 5
    },
    priceContainer:{
        flexDirection:'row',
        alignItems:"center",
        alignItems:"center"

    }
})
export default ProductCard;