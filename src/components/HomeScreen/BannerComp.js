import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';


const BannerComp = ({data}) =>{
    const { width } = useWindowDimensions();
    const height = width/4
    return <View style={styles.mainContainer}>
        <Image source={{uri: data.imgUrl}} style={{width: width, height: height, backgroundColor:"green"}} />
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems:"center"
    }
});


export default BannerComp;