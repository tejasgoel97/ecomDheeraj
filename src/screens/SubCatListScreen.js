import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ErrorComp from '../bootstrap/ErrorComp';
import LoadingComp from '../bootstrap/LoadingComp';
import CardFullWidth from '../components/CardFullWidth';
import ProductCard from '../components/ProductCard';
import useSubCatItems from '../hooks/useSubCatItems';

const SubCategoryScreen = ({ navigation, route}) =>{
    console.log("PARAMS", route?.params);
    const subCatId = route?.params.id;
    console.log(subCatId)
    const {itemsLoading, error, fetchItems, items} = useSubCatItems(subCatId);

    if(error !== null){
        console.log(error)
        return <ErrorComp onTryAgain={fetchCaregories}/>
    }
    // LOADING CONDITION
    if(itemsLoading){
        return <LoadingComp />
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList 
                data={items}
                renderItem={({item , index})=>{
                    return <CardFullWidth item={item}/>
                }}
                />
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})

export default SubCategoryScreen;