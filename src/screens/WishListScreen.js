import React from "react";

import {View, Text, Button, FlatList} from 'react-native'
import { useSelector } from "react-redux";
import CardFullWidth from "../components/CardFullWidth";

const WhishListScreen = ({navigation}) =>{
    const wishList = useSelector(state=> state.WishlistReducer)
    const products = useSelector(state=> state.ProductReducer.products);
    console.log(wishList)
    return <View style={{flex:1, backgroundColor:"red"}}>
        <FlatList 
            data={wishList.whishlistItems}
            renderItem={({item})=>{
                console.log(item);
                const product = products.find(p=> p.id == item)
                return<CardFullWidth item={product} navigation={navigation}/>
            }}
        >
            
        </FlatList>
        
    </View>
}

export default WhishListScreen;