import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, View, FlatList, Image, useWindowDimensions, Button } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'


const DUMMY = [{
    imgUrl: "https://www.bigbasket.com/media/uploads/banner_images/hp_cmc_m_PL-Fresho-Store_460-250222.jpg"
}, {
    imgUrl: "https://www.bigbasket.com/media/uploads/banner_images/hp_sbf_m_Adhoc-bbhomeHerbal_460-250222.jpg",
},{
    imgUrl: "https://www.bigbasket.com/media/uploads/banner_images/hp_sbf_m_Adhoc-bbhomeHerbal_460-250222.jpg",
}]

const CarouselComp = ({data}) =>{
    if(!data) data=DUMMY
    const [currentIndex, setCurrentIndex] = useState(0)
    const { width } = useWindowDimensions();
    const height = width /7;

    function handleScroll(e){
        let offset = e.nativeEvent.contentOffset.x;
        let index = (offset / width );
        if(currentIndex == Math.round(index))  return null 
        setCurrentIndex(Math.round(index))
    }

    return <View style={styles.mainContainer}>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            renderItem={({item})=> <ImageComp item={item} />}
            onMomentumScrollEnd={handleScroll}
            onScrollToIndexFailed={()=> console.log("failsed")}
        />
        <FlatList
            data ={data}
            horizontal
            style={{position:"absolute", bottom: 2}}
            extraData={currentIndex}
            showsHorizontalScrollIndicator={false}
            renderItem={({index})=> <View style={{height: 10, width:10, margin: 5}}>
                {index === currentIndex
                ?
                <Text style={{color:"white",  borderRadius:10, fontSize: 7, backgroundColor:"green"}}>.</Text>
                :
                <Text style={{color:"white",  borderRadius:10, fontSize: 7, backgroundColor:"grey"}}>.</Text>
                }
            </View>}
            />
    </View>
}


const ImageComp = ({item}) =>{
    const { width } = useWindowDimensions();
    const height = width/3
    const navigation = useNavigation();

    function handleNavigation(){
        console.log(item)
        if(item.navScreen=== "subCategory"){
            console.log("item")
            return navigation.navigate("SubCatList",{id:item.navValue})
        }
        if(item.navScreen=== "category")
            return navigation.navigate("CategoryList",{id:item.navValue})

    }
    return <Pressable onPress={()=> handleNavigation()}>
        <Image source={{uri: item.imgUrl}} style={{width: width, height: height, backgroundColor:"green"}} />
    </Pressable>
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems:"center",
    }
});


export default CarouselComp;