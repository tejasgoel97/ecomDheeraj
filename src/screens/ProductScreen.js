// BASIC REACT IMPORTS
import React, { useState } from 'react' 
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView , FlatList, Pressable} from 'react-native'
import { Button, Divider, IconButton, List } from 'react-native-paper'

// STATIC COLORS IMPORTS
import { priceTextColor, TabActiveColor, textColor, themeColor, themeColorDull } from '../static/AppColors'

// REDUX IMPORTS
import {useDispatch, useSelector } from 'react-redux'

// Custom Hook
import useProductById from "../hooks/useProductById"

// ICONS IMPORT
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from "react-native-vector-icons/Entypo"

// FLEXVIEW COMP IMPORT
import FlexView from '../bootstrap/FlexView'

// LOADING SCREEN
import LoadingComp from "../bootstrap/LoadingComp"
import TextPara from '../bootstrap/TextPara'
import StarRating from '../components/StarRating'
import { AddToCartAction, RemoveFromCartAction } from '../reduxStore/actions/CartActions'
import ErrorComp from '../bootstrap/ErrorComp'



// MAIN COMPONENT GOES HERE
const ProductScreen = ({navigation, route}) =>{
    const [ActiveImageIndex, setActiveImageIndex] = useState(0)
    const pinCode = useSelector((state)=> state.AreaInfoReducer.PINCODE);
    const dispatch = useDispatch();
    const {productId} = route.params;  
    const {productLoading, error, product,fetchProduct}  = useProductById(productId);
    // CALCULATING QUANTITY
    const CartList = useSelector(state => state.CartReducer.CartList);
    console.log(CartList)
    let itemInCart = CartList.find(item => item.id === productId )
    let quantity = itemInCart?.quantity

    const {width, height} = useWindowDimensions();
    if(productLoading) return <LoadingComp />
    if(error !== null){
        console.log(error)
        return <ErrorComp onTryAgain={fetchProduct}/>
    }

    // HANDLE CART INCREASE
    function IncreaseCarthandler() {
        dispatch(AddToCartAction({item:product}));
      }
    // HANDLE CART DECREASE
      function DecreaseCartHandler() {
        dispatch(RemoveFromCartAction({item:product}));
      }

    console.log('quantity',quantity)
    const AddToCartButton = (product.available ?
        quantity ?
        <FlexView row justify="sb" alignItems="c" style={{width: "100%"}}>
        {/* <Button mode="contained" style={{width: "100%", borderRadius:0}} color={themeColor} onPress={IncreaseCarthandler}>Add to Cart</Button>
        <Button mode="contained" style={{width: "100%", borderRadius:0}} color={themeColor} onPress={IncreaseCarthandler}>Add to Cart</Button> */}
        <IconButton
            icon="minus"
            color='white'
            style={{backgroundColor:"green",borderRadius: 5, width: "30%"}}
            size={25}
            onPress={() => DecreaseCartHandler()}
        />
        <TextPara size={23}>{quantity}</TextPara>
        <IconButton
            icon="plus"
            color="white"
            style={{backgroundColor:"green",borderRadius: 5, width: "30%"}}
            size={25}
            onPress={() => IncreaseCarthandler()}
        />
        </FlexView>
        :
        <Button mode="contained" style={{width: "100%", borderRadius:0}} color={themeColor} onPress={IncreaseCarthandler}>Add to Cart</Button>
        : 
        <Button mode="contained" style={{width: "100%", borderRadius:0}}  disabled>Out Of Stock</Button>
    )
    return(
        <View style={styles.rootContainer}>
            <View style={styles.buttonContainer}>
                {AddToCartButton}
            </View>
        <View style={styles.mainContainer}>    
            <ScrollView style={{padding: 10}}>
            <View style={{backgroundColor:"white"}}>
            <Image source={{uri:product.images[ActiveImageIndex].imgUrl}} height={width} width={width} style={{height:width, width:width}}/>
                <FlatList data={product.images} horizontal renderItem={({item, index})=>{
                    let borderStyle ={}
                        if(index===ActiveImageIndex){
                            borderStyle={borderColor: themeColor,borderWidth:3}
                        }
                    return (
                        <Pressable onPress={()=> setActiveImageIndex(index)} key={index}>
                        <Image source={{uri:item.imgUrl}} height={60} width={60} style={{...borderStyle,height:60, width:60, margin:5}}/>
                    </Pressable>
                        )
                } }/>

            </View>
            <View style={styles.productNameContainer}>
                <TextPara size={25}>{product.productName}</TextPara>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.SPText}>₹{product.SP}</Text>
              {product.MRP &&
              <>
                <Text style={styles.MRPText}>₹{product.MRP}</Text>
                <Text style={styles.discount}>{product.discount}% OFF</Text>
              </>
              }
          </View>
            <View style={styles.delieveryContainer}>
                {
                    product.available ?
                     <TextPara color={themeColorDull}>Available for {pinCode} </TextPara>
                    :
                     <TextPara color='red'>Out Of Stock for {pinCode} </TextPara>
                }
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
                {product.productDescription.map(item=> {
                return <FlexView key={item} alignItems="s" row>
                    <Entypo name="dot-single" size={20} color={textColor}/>
                    <Text style={styles.descriptionText} key={item}>{item}</Text>
                </FlexView>
                })}
            </View>
            <View style={styles.rrContainer}>
                <TextPara size={20}>Ratings and Reviews</TextPara>
                <StarRating rating={product.rating || 0}/>
                {product.reviews?.map((review)=>{
                    return <>
                    <Divider />
                    <FlexView style={styles.reviewContainer}>
                        <TextPara size={17}>"{review.reviewText}"</TextPara>
                        <FlexView row alignItems="c" flex={1}>   
                            <TextPara >By- {review.reviewerName}</TextPara>
                            <TextPara color="grey" size={12}>   Verified Customer<MaterialCommunityIcons name='check-decagram'/></TextPara>
                        </FlexView>
                    </FlexView>
                    </>
                })}

            </View>
            <View style={{height: 50}}>
                <Text>.</Text>
            </View>
            </ScrollView>
        </View>
        </View>
    )
} 
const styles = StyleSheet.create({
    rootContainer:{
        flex:1
    },
    mainContainer:{
        flex:1,
        marginBottom: 50,
    },
    buttonContainer:{
        flexDirection:'row',
        width: "100%",
        position:'absolute',
        bottom:0
    },
    productNameContainer:{
        marginTop:10,
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
        marginTop:10,
        paddingVertical: 10,
        backgroundColor:'white',
    },
    priceContainer:{
        flexDirection:'row',
        alignItems:"center",
        alignItems:"center",
        marginTop: 10,
        backgroundColor:"white"
    
    },
    MRPText:{
        color:priceTextColor,
        fontSize: 17,
        fontWeight:"500",
        marginRight: 5,
        textDecorationLine: 'line-through',
    },
    SPText:{
        color:priceTextColor,
        fontSize: 22,
        fontWeight:"700" ,
        marginRight: 5
    },
    discount:{
        color:"white",
        fontSize: 15,
        fontWeight:"500",
        backgroundColor: "green",
        paddingHorizontal: 4,
        borderRadius: 5
    },
    rrContainer:{
        backgroundColor:"white",
        marginTop:10
    },
    reviewContainer:{
        marginVertical:10,
        paddingVertical: 5
    }
    
})
export default ProductScreen;