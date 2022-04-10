import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'


const ErrorComp = ({onTryAgain}) =>{

    return <View style={styles.mainContainer}>
        <Text>Something Went Wrong</Text>
        <Button onPress={()=> onTryAgain()}>Try Again</Button>
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
});


export default ErrorComp;