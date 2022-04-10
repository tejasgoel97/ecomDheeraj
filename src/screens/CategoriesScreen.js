import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import MainCategoryComp from '../components/Categories/MainCategoryComp'
import useCategoriesHook from '../hooks/useCategoriesHook'
import LoadingComp from '../bootstrap/LoadingComp'
import ErrorComp from '../bootstrap/ErrorComp'
const CategoriesScreen = () =>{
    const {categoriesLoading, error, fetchCaregories, categories} = useCategoriesHook();

    if(error !== null){
        console.log(error)
        return <ErrorComp onTryAgain={fetchCaregories}/>
    }
    // LOADING CONDITION
    if(categoriesLoading){
        return <LoadingComp />
    }

    return(
        <View style={styles.mainContainer}>
            <MainCategoryComp categories={categories}/>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default CategoriesScreen;