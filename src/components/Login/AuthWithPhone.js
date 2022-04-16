import React, { useEffect, useState } from 'react';
import auth, { firebase } from "@react-native-firebase/auth";

import { Button, StyleSheet, Text, View } from "react-native"
import { useSelector } from 'react-redux';
import { TextInput, Button as PaperButton, HelperText } from 'react-native-paper';

import TextPara from "../../bootstrap/TextPara"
import AppColors, { textColor, themeColor } from "../../static/AppColors"
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const AuthWithPhone = () =>{
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState(null);
    const [otpTimer, setOtpTimer] = useState(0);


    async function signInWithPhoneNumber() {
        console.log("phone", phoneNumber)
        const confirmation = await auth().signInWithPhoneNumber("+91 " + phoneNumber);
        setConfirm(confirmation);
        setOtpTimer(1)
      }
    async function confirmCode() {
    try {
        const user = await confirm.confirm(code);
        console.log(user)

    } catch (error) {
        console.log('Invalid code.');
        }
    }
    async function handleLogout(){
        await auth().signOut();
        console.log("user is signedOut")
        setLoggedIn(false)

    }

    if(loggedIn){
        return <View style={styles.mainContainer}>
            <Button onPress={handleLogout} title="Logout"/>
        </View>
    }
    const hasErrorsInMobile = () => {
        return !phoneNumber.length >10
      };
    return <View style={styles.mainContainer}>
        <TextPara>You need to login to proceed....</TextPara>
        <TextInput value={phoneNumber} 
            style={styles.input} 
            onChangeText={(text)=> setPhoneNumber(text)} 
            label={"Enter Phone Number"}
            underlineColor={themeColor}
            activeUnderlineColor={themeColor}
            theme={{ colors: { text: textColor, placeholder:"grey"} }}
            right={<TextInput.Icon name="phone" color={themeColor}/>}
        />
        <HelperText type="error" visible={hasErrorsInMobile()}>
            Email address is invalid!
        </HelperText>
        
        {confirm ?  
        <>
        <View style={styles.resend}><TextPara>{otpTimer}</TextPara><PaperButton onPress={()=> console.log("Hi ther")} color={"black"} contentStyle={{fontSize:"5"}}>Resend</PaperButton></View>
        <TextInput value={code} 
            style={styles.input} 
            onChangeText={text => setCode(text)}
            label={"OTP"}
            underlineColor={themeColor}
            activeUnderlineColor={themeColor}
            theme={{ colors: { text: textColor, placeholder:"grey"} }}
            right={<TextInput.Icon name="text" color={themeColor}/>}
        />
        <Button title='Enter OTP' onPress={()=> confirmCode()} color={themeColor}/>
        </>
        : 
        <Button title='Send OTP' onPress={()=> signInWithPhoneNumber() } color={themeColor}/>
        } 
        {error && <TextPara style={styles.error}color="red">{error}</TextPara>}
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
        padding: 10,
        backgroundColor:"white"
    },
    input:{
        width: "80%",
        marginHorizontal: 50,
        marginVertical: 10,
        borderBottomWidth: 1,
        backgroundColor:"white",
        
    },
    error:{
        margin: 10
    },
    resend:{
        width:"80%",
        // backgroundColor:"red",
        flexDirection:"row",
        justifyContent:"flex-end"
    }
});

export default AuthWithPhone;