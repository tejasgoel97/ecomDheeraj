import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
const SearchScreen = () =>{
    return(
        <View style={styles.mainContainer}>
            <Text>SearchScreen</Text>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default SearchScreen;