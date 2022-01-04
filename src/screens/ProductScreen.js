import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView , FlatList, Pressable} from 'react-native'
import React, { useState } from 'react' 
import { Button } from 'react-native-paper'
import { priceTextColor, TabActiveColor, textColor, themeColor } from '../static/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from "react-native-vector-icons/Entypo"
import FlexView from '../bootstrap/FlexView'
const ProductScreen = ({productId, navigation}) =>{
    const [ActiveImageIndex, setActiveImageIndex] = useState(0)
    const DUMMY= {
        id:"1",
        productName:"Rose (Any Color) - Plant",
        imgUrl:[
            "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-rose-red-plant_303x303.jpg?v=1634228232",
            "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-miniature-rose-button-rose-red-plant-2_540x720.jpg?v=1634224111",
            "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-miniature-rose-button-rose-red-plant-4_540x720.jpg?v=1634224107"
        ],
        price:12.00,
        Description:[
            "Pack of 4 succulent Planta + 4 Colorful Pots in a single pack",
            "Plants in this pack are easy to care for and require low maintainacne",
            "Succulent plants are hard to kill and inpart beaut to your garden"
        ]
    }
    const {width, height} = useWindowDimensions();
    return(
        <View style={styles.mainContainer}>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={{width: "50%", borderRadius:0}}>Save For Later</Button>
                <Button mode="contained" style={{width: "50%", borderRadius:0}} color='red'>Add to Cart</Button>
            </View>
            <ScrollView style={{padding: 10}}>
            <View style={{backgroundColor:"white"}}>
            <Image source={{uri:DUMMY.imgUrl[ActiveImageIndex]}} height={width} width={width} style={{height:width, width:width}}/>
                <FlatList data={DUMMY.imgUrl} horizontal renderItem={({item, index})=>{
                    let borderStyle ={}
                        if(index===ActiveImageIndex){
                            borderStyle={borderColor: themeColor,borderWidth:3}
                        }
                    return (
                        <Pressable onPress={()=> setActiveImageIndex(index)}>
                        <Image source={{uri:item}} height={60} width={60} style={{...borderStyle,height:60, width:60, margin:5}}/>
                    </Pressable>
                        )
                } }/>

            </View>
            <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{DUMMY.productName}</Text>
                <Text style={styles.price}>MRP ₹ {DUMMY.price}</Text>

            </View>
            <View style={styles.delieveryContainer}>
                <Text style={{color:textColor}}>Delievers in 1 day</Text>
            </View>
            <View style={styles.descriptionContainer}>
                {/* <View style={styles.descriptionTitleContainer}>
                <MaterialCommunityIcons name="clipboard-list" size={20} color={textColor}/>
                <Text style={{color: textColor, fontSize:20}}>Description</Text>
                </View> */}
                <FlexView row alignItems="c">
                    <MaterialCommunityIcons name="clipboard-list" size={20} color={textColor}/>
                    <Text style={{color: textColor, fontSize:20}}>Description</Text>
                </FlexView>
                {DUMMY.Description.map(item=> {
                return <FlexView key={item} alignItems="s" row>
                    <Entypo name="dot-single" size={20} color={textColor}/>
                    <Text style={styles.descriptionText} key={item}>{item}</Text>
                </FlexView>
                })}
            </View>
            </ScrollView>

        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        
        paddingBottom: 50
    },
    buttonContainer:{
        flexDirection:'row',
        width: "100%",
        position:'absolute',
        bottom:0
    },
    productNameContainer:{
        backgroundColor:"white",
        
    },
    productName:{
        color: textColor,
        fontSize: 17,
        paddingVertical: 10
    },
    price:{
        color: priceTextColor,
        paddingBottom: 10
    },
    delieveryContainer:{
        backgroundColor: "white",
        marginTop: 10,
        paddingVertical: 10
    },
    descriptionText:{
        color:textColor
    },
    descriptionContainer:{
        marginVertical:10,
        paddingVertical: 10,
        backgroundColor:'white',
        
    }
    
})
export default ProductScreen;