import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';




const BannerComp = ({data}) =>{
    const { width } = useWindowDimensions();
    const height = width/2
    const navigation = useNavigation();
    function handleBannerComp(){
        console.log(data)
        if(data.navScreen=== "subCategory"){
            return navigation.navigate("SubCatList",{id:data.navValue})
        }
        if(data.navScreen=== "product")
            return navigation.navigate("ProductScreen",{productId:data.navValue})

    }


    return <Pressable style={styles.mainContainer} onPress={()=> handleBannerComp()}>
        <Image source={{uri: data.imgUrl}} style={{width: width-20, height: height, backgroundColor:"green"}} />
    </Pressable>
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems:"center",
        margin:5,
        borderRadius: 10,
        overflow:'hidden'
    }
});


export default BannerComp;