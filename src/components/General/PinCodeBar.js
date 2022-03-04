import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from 'react-native'
import { Button } from 'react-native-paper'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { useSelector } from 'react-redux'
import FlexView from '../../bootstrap/FlexView'
import TextPara from '../../bootstrap/TextPara'
import { textColor, themeColor } from '../../static/AppColors'

const PinCodeBar = () =>{
    const PinCode =  useSelector(state=> state.AreaInfoReducer.PINCODE)
    const [showEditPinCode, setShowEditPinCode] = useState(false)
    const inputRef = useRef();
    console.log("pinCode", PinCode)

    return (
    <View style={styles.rootContainer}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showEditPinCode}
        onRequestClose={() => {
          setShowEditPinCode(!showEditPinCode);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextPara style={{width: "100%"}}>Change Pin Code</TextPara>
            <TextInput style={styles.input} ref={inputRef}/>
            <FlexView row>
                <Button>Submit</Button>
                <Button>Cancel</Button> 
            </FlexView>         
          </View>
        </View>
      </Modal>
        <TextPara color="white">
            Delievering to {PinCode}
        </TextPara>
        {/* <TextPara color="white">Edit</TextPara> */}
        <Pressable onPress={()=> setShowEditPinCode(true)}>
            <FontAwesome size={23} name="edit" color="white"/>
        </Pressable>
    </View>)
}

const styles =StyleSheet.create({
    rootContainer:{
        width: "100%",
        backgroundColor: themeColor,
        padding: 10,
        justifyContent:'space-between',
        flexDirection:"row"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:"rgba(255, 255, 255, 0.5)"
      },
      modalView: {
        width: "100%",
        maxWidth: 500,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "90%"
      },
})

export default PinCodeBar;