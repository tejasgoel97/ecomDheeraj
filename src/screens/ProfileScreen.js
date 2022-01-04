import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
const ProfileScreen = () =>{
    return(
        <View style={styles.mainContainer}>
            <Text>ProfileScreen</Text>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default ProfileScreen;