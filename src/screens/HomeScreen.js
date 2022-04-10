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
import CarouselComp from '../bootstrap/CarouselComp';
import useHomeHook from '../hooks/useHomeHook';
import LoadingComp from '../bootstrap/LoadingComp';
import ErrorComp from '../bootstrap/ErrorComp';
import HomeContent from '../components/HomeScreen/HomeContent';


const HomeScreen = ({navigation}) =>{
    const state= useSelector(state=> state)
    const {homeLoading, error, fetchHomeData, homeData} = useHomeHook();
    if(error !== null){
        console.log(error)
        return <ErrorComp onTryAgain={fetchHomeData}/>
    }
    // LOADING CONDITION
    if(homeLoading){
        return <LoadingComp />
    }
    if(homeData){
        return(
            <View style={styles.mainContainer}>
                <PinCodeBar />
                <Button onPress={()=> console.log(state.CartReducer.CartList)}>Clivk me</Button>
                {/* <ScrollView> */}
                {/* <ItemListComp navigation={navigation}/> */}
                <HomeContent />
                {/* </ScrollView> */}
            </View>
            )
        } 
    return <LoadingComp />

    }
    
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    }
})
export default HomeScreen;