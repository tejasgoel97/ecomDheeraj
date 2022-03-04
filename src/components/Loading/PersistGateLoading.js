
import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from "react-native"


const PersistGateLoading = () =>{

    return <View style={styles.rootContainer}>
        <ActivityIndicator size="large"/>
    </View>
}


const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default PersistGateLoading;