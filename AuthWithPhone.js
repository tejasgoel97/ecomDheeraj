import React, { useEffect, useState } from 'react';
import auth, { firebase } from "@react-native-firebase/auth";

import { Button, StyleSheet, Text, TextInput, View } from "react-native"

const AuthWithPhone = () =>{
    const [phoneNumber, setPhoneNumber] = useState("asdasd");
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('user is logged');
              console.log(user)
              setLoggedIn(true)
            }
      });
    }, [])
    async function signInWithPhoneNumber() {
        console.log("phone", phoneNumber)
        const confirmation = await auth().signInWithPhoneNumber("+91 " + phoneNumber);
        setConfirm(confirmation);
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
    return <View style={styles.mainContainer}>
        <Text>Hi there</Text>
        <TextInput value={phoneNumber} style={styles.input} onChangeText={(text)=> setPhoneNumber(text)}/>
        {confirm ?  
        <><TextInput value={code} onChangeText={text => setCode(text)} style={styles.input}/>
        <Button title='Enter OTP' onPress={()=> confirmCode() }/>
        </>
        : 
        <Button title='Send OTP' onPress={()=> signInWithPhoneNumber() }/>
        }   
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"red"
    },
    input:{
        backgroundColor:"white",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%"
    }
});

export default AuthWithPhone;