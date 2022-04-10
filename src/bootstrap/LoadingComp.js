import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


const LoadingComp = () =>{

    return <View style={styles.mainContainer}>
        <ActivityIndicator animating={true} color="red" />
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
});


export default LoadingComp;