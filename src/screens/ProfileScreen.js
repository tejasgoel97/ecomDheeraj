import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import auth, { firebase } from "@react-native-firebase/auth";


import { Button, List } from 'react-native-paper'
import { themeColor } from '../static/AppColors'
import { useSelector } from 'react-redux';
const ProfileScreen = ({navigation}) =>{
    const userReducer = useSelector(state=> state.UserReducer)

    async function handleLogout(){
        await auth().signOut();
        console.log("user is signedOut")
    }
    if (!userReducer.isLoggedIn){
        return <View style={styles.mainContainer}>
           <List.Item
                style={{backgroundColor:themeColor}}
                title="Login"
                description="Login To See Your Profile"
                onPress={()=>navigation.navigate("Login")}
                left={props => <List.Icon {...props} icon="account-arrow-down" />}
            />
        </View>
    }
    function handleEditUserInfo(){
        return null
    }
    const user = userReducer?.userInfo?._user

    return(
        <View style={styles.mainContainer}>
           <List.Item
                style={{backgroundColor:"white"}}
                title={`Hi, ${user.phoneNumber}`}
                description="Logout From the App"
                left={props => <List.Icon {...props} icon="account" />}
                right={props => <Button color='green' mode='outlined' icon="lead-pencil" onPress={handleEditUserInfo}>Edit</Button>}
            />
            <List.Item
                style={{backgroundColor:"white", marginTop: 10}}
                title="Logout"
                description="Logout From the App"
                onPress={handleLogout}
                left={props => <List.Icon {...props} icon="account-arrow-down" />}
            />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"white"
    }
})
export default ProfileScreen;