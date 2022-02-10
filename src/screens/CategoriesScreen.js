import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import MainCategoryComp from '../components/Categories/MainCategoryComp'
const CategoriesScreen = () =>{
    return(
        <View style={styles.mainContainer}>
            <MainCategoryComp />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default CategoriesScreen;