import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react' 
import { Button } from 'react-native-paper';
import { AddToCartColor, priceTextColor } from '../static/AppColors';
const ProductCard = ({item, navigation}) =>{
    const{width,height} = useWindowDimensions()
    console.log(height,width);
    let imageHeight = (width/1.8)-30
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
                    <Button mode="contained" color={AddToCartColor}>Add To Cart</Button>
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