import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react' 
import CategoryComp from '../components/CategoryComp'
import ItemListComp from '../components/ItemListComp'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
const HomeScreen = ({navigation}) =>{
   const state= useSelector(state=> state)
    return(
        <View style={styles.mainContainer}>
            <Button onPress={()=> console.log(state.CartReducer.CartList)}>Clivk me</Button>
            <ScrollView>
                <CategoryComp/>
                <ItemListComp navigation={navigation}/>
            </ScrollView>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        margin: 10
    }
})
export default HomeScreen;