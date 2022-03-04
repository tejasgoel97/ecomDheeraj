import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import React, {useEffect} from 'react' 
import { useSelector } from 'react-redux'
import firestore from "@react-native-firebase/firestore"

// Conponents Import
import CategoryComp from '../components/CategoryComp'
import ItemListComp from '../components/ItemListComp'

//Paper Import 
import { Button } from 'react-native-paper'
import PinCodeBar from '../components/General/PinCodeBar';


const HomeScreen = ({navigation}) =>{
   const state= useSelector(state=> state)

    useEffect(()=>{
        console.log("In HomePage")
        const categoryCollection = firestore().collection('category')
        categoryCollection.get().then(data=> console.log(data.get))
    }, [])

    return(
        <View style={styles.mainContainer}>
            <PinCodeBar />
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