// BASIC REACT AND RN IMPORTS
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from "react-native";

// PAPER IMPORTS
import { Button, RadioButton } from "react-native-paper";

// REDUX IMPORTS
import { useSelector } from "react-redux";

// IONS IMPORT
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

// BOOTSTRAP COMPONENTS
import FlexView from "../bootstrap/FlexView";
import TextPara from "../bootstrap/TextPara";
import AddressFormScreen from "./AddressFormScreen";


// MAIN COMPONENT GOES HERE
const SelectAddressScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const userState = useSelector(state=> state.UserReducer)
  console.log(userState)
  return (
    <ScrollView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button onPress={()=> setModalVisible(false)}>Go Back</Button>
            <AddressFormScreen />
          </View>
        </View>
      </Modal>
      <Button color="green" onPress={() => setModalVisible(true)}>
        <Text>Add New Address</Text>
      </Button>
      <View style={{width: "100%", marginVertical: 10}}>

      {userState.userAddress.map((address, index)=>{
          const {houseNo, streetName,landMark,areaPin,City} = address
          const AddressText = houseNo+ streetName+landMark+areaPin+City
          return(
              <View style={{marginVertical:5, backgroundColor:"white", paddingHorizontal:10}}>
                    <FlexView row alignItems="c" justifyContent="sa" >
                        <RadioButton
                            value="first"
                            color="black"
                            uncheckedColor="grey"
                            status={ checked === index ? 'checked' : 'unchecked' }
                            onPress={() => setChecked(index)}
                            />
                        <FlexView row style={{flex:1}}>
                            <TextPara>Tejas</TextPara>
                            <TextPara >Home</TextPara>
                        </FlexView>
                        <Pressable><FontAwesome5 name="edit" size={20} color="black"/></Pressable>
                    </FlexView>
                    <View style={{marginHorizontal: 35}}>
                        <TextPara>
                            {AddressText}
                        </TextPara>
                        <TextPara>
                            7404121102
                        </TextPara>
                    </View>
                </View>
            )
        })}    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SelectAddressScreen;