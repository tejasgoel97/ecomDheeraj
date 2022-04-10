import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useEffect} from 'react' 


//Paper Import 

import useHomeHook from '../../hooks/useHomeHook';
import LoadingComp from '../../bootstrap/LoadingComp';
import ErrorComp from '../../bootstrap/ErrorComp';
import BannerComp from './BannerComp';
import CarouselComp from '../../bootstrap/CarouselComp';
import HorizontalListComp from './HorizontalListComp';
import CategoryComp from '../CategoryComp';


const HomeContent = () =>{
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
               <FlatList 
                    data={homeData}
                    renderItem={({item}) => <RenderHomeContent item={item} />}
               />
            </View>
            )
        } 
    return <LoadingComp />

    }
    
const RenderHomeContent = ({item}) =>{
    if(item.type === "banner"){
    return <BannerComp data={item.value} />
    }
    if(item.type === "slider"){
        return <CarouselComp data={item.value} />
    }
    if(item.type === "productlist"){
        return <HorizontalListComp data={item.value} />
    }
    if(item.type === "allcategories"){
        return <CategoryComp />
    }
    return null
};


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    }
});


export default HomeContent;