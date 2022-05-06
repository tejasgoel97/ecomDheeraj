import React, { useState } from "react";

import auth, { firebase } from "@react-native-firebase/auth";

import {View, StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import { Avatar, Button, Snackbar } from "react-native-paper";
import CustomInput from "../../bootstrap/CustomInput"
import { themeColor, themeColorDull } from "../../static/AppColors";
import TextPara from "../../bootstrap/TextPara";


const AuthWithPhone2 = () =>{
    const [phoneNumber, setPhoneNumber] = useState("7404121102");
    const [errorSnack, setErrorSnack] = useState("");
    const [confirm, setConfirm] = useState(null)
    const [page, setPage] = useState(1)
    const [code, setCode] = useState('');
    


    function handlePhoneInput(value){
        if(isNaN(value)) return
        else if(value.length >10) return
        setPhoneNumber(value)
    }
    function handleCodeInput(value){
        if(isNaN(value)) return
        else if(value.length >6) return
        setCode(value)
    }

    async function handleConfirmCode() {
        try {
            const user = await confirm.confirm(code);
            console.log(user)
    
        } catch (error) {
            console.log('Invalid code.');
            }
        }

    async function handleSendOtp(){
        console.log()
        if(phoneNumber.length<10) {
            setErrorSnack("Please enter a 10 digit number")
            setPage(2)
            return
        }
        try{
            const confirmation = await auth().signInWithPhoneNumber("+91 " + phoneNumber);
            setConfirm(confirmation);
            console.log(confirmation)
            setPage(2)
        }catch(err){
            setErrorSnack("Can't connect to the server... Try Again")
        }    
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Snackbar visible={errorSnack} onDismiss={()=> setErrorSnack("")} duration={1000} color="white">{errorSnack}</Snackbar>
            <View style={styles.logoContainer}>
                <Image source={require("../../static/images/logo_horizontal.png")}/>
            </View>
            {page === 1 &&<View style={styles.phoneInputContainer}>
                <CustomInput label={"Enter Mobile Number"} setText={handlePhoneInput} text={phoneNumber} type="phone-pad"/>
                <Button icon="send" color={themeColor} mode="contained" onPress={handleSendOtp}>Send OTP</Button>
            </View>}
            {page === 2 && 
            <View style={styles.optContainer}>
                <View style={styles.editPhoneContainer}>
                    <TextPara size={20}>OTP Verification</TextPara>
                    <TextPara size={13} style={{paddingTop: 5}} color={themeColorDull}>OTP has been sent to +91{phoneNumber}</TextPara>
                    {/* <Avatar.Icon size={24} color='green' backgroundColor="transparent" icon="pencil" style={{alignSelf:"flex-end"}} />
                    <Avatar.Text size={24} color='green' backgroundColor="transparent" label="edit" /> */}

                </View>
                <CustomInput label={"Enter OTP"} setText={handleCodeInput} text={code} type="phone-pad"/>
                <Button icon="send" color={themeColor} mode="contained" onPress={handleConfirmCode}>Verify OTP</Button>
            </View>}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        
    },
    logoContainer:{
        backgroundColor:"red"
    },
    phoneInputContainer:{
        height: 50,
        width: "90%",
        marginVertical: 60
    },
    optContainer:{
        height: 70,
        width: "90%",
        marginVertical: 60
    },
    editPhoneContainer:{
        // flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginVertical: 20
    }
})

export default AuthWithPhone2;