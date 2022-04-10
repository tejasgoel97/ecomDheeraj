import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import ErrorComp from '../../bootstrap/ErrorComp';
import LoadingComp from '../../bootstrap/LoadingComp';
import useSubCatItems from '../../hooks/useSubCatItems'
import ProductCard from '../ProductCard';
import TextPara from "../../bootstrap/TextPara"


const HorizontalListComp = ({data}) =>{
    const {itemsLoading, error, setError, fetchItems, items} =useSubCatItems(data.groupName);
    if(error !== null){
        console.log(error)
        return <ErrorComp onTryAgain={fetchItems}/>
    }
    // LOADING CONDITION
    if(itemsLoading){
        return null
    }
    return <View style={styles.mainContainer}>
        <TextPara>{data.title}</TextPara>
        <FlatList
            data={items}
            horizontal
            renderItem={({item})=><ProductCard item={item}/>}
        />
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems:"center"
    }
});


export default HorizontalListComp;