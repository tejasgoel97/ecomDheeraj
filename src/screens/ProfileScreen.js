import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import auth, { firebase } from "@react-native-firebase/auth";


import { Button, List } from 'react-native-paper'
import { themeColor } from '../static/AppColors'
import { useSelector } from 'react-redux';
import TextPara from '../bootstrap/TextPara';

import AntDesignIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const ProfileScreen = ({ navigation }) => {
    const userReducer = useSelector(state => state.UserReducer)

    async function handleLogout() {
        await auth().signOut();
        console.log("user is signedOut")
    }
    if (!userReducer.isLoggedIn) {
        return <ScrollView style={styles.mainContainer}>
            <List.Item
                style={{ backgroundColor: themeColor }}
                title="Login"
                description="Login To See Your Profile"
                onPress={() => navigation.navigate("Login")}
                left={props => <List.Icon {...props} icon="account-arrow-down" />}
            />
        </ScrollView>
    }
    function handleEditUserInfo() {
        return null
    }
    const user = userReducer?.userInfo?._user

    return (
        <ScrollView style={styles.mainContainer}>
            
            <ItemTab title={`Hi, ${user.phoneNumber}`} description="Logout From the App" icon ="face-man-profile" onPress={()=> console.log("Hi tehere")}/>
            <ItemTab title="My Orders" description="Click to view your order history" icon ="cart-variant" onPress={()=> navigation.navigate("MyOrders")}/>
            <ItemTab title="Report Dispute" description="Click to Report a Payment Dispute" icon ="cash-100" onPress={()=> console.log("Hi tehere")}/>
            <ItemTab title="Contact Us" description="Click to Get in Touch" icon ="contacts-outline" onPress={()=> console.log("Hi tehere")}/>
            <ItemTab title="Term and Condition" description="Click to T&C and Policies" icon ="blinds" onPress={()=> console.log("Hi tehere")}/>
            <ItemTab title="About Us" description="Know more about us" icon ="focus-field" onPress={()=> console.log("Hi tehere")}/>
            <ItemTab title="Logout" description="Clicking here will log you out of app" icon ="logout" onPress={handleLogout}/>
        </ScrollView>
    )
}

const ItemTab = (props) => {

    const {title, description, icon, onPress} = props;

    return <Pressable style={styles.itemContainer} onPress={onPress}>
    <View style={{margin:10, marginRight:20,}}>
        <AntDesignIcon name={icon} size={34} color="grey"/>
    </View>
    <View style={{backgroundColor:"white", flex:1}}>
        <View>
            <TextPara size={14}>{title}</TextPara>
            <TextPara size={12}>{description}</TextPara>
        </View>
    </View>
</Pressable>
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    itemContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 5,
        padding:10, 
        alignItems: "center",
        backgroundColor:"white",

    }
})
export default ProfileScreen;