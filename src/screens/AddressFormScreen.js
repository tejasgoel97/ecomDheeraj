import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';
import CustomInput from '../bootstrap/CustomInput';
import FlexView from "../bootstrap/FlexView"
import { textColor, themeColorDull } from '../static/AppColors';

function AddressFormScreen() {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState(null);
  const [houseNo, setHouseNo] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [landmark, setLandmark] = React.useState('');
  const [pinCode, setPinCode] = React.useState(number);
  const [nickName, setNickName] = React.useState('');
  const [addressType, setAddressType] = React.useState('Home')
  return (
    <ScrollView> 
      <KeyboardAvoidingView behavior='position' style={styles.mainContainer}>    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <View style={styles.section}>  
                <Text style={styles.headingText}>Personal Details</Text>
                <CustomInput label="Full Name" text={name} setText={setName}/>
                <CustomInput  label="Contact number to say hello" text={number} setText={setNumber} type='numeric'/>
            </View>
            <View style={styles.section}>           
                <Text style={styles.headingText}>Address Details</Text>
                <CustomInput  label="House/Flat Number" text={houseNo} setText={setHouseNo}/>
                <CustomInput  label="Street details to locate you" text={street} setText={setStreet}/>
                <CustomInput  label="Landmark for easy reach out" text={landmark} setText={setLandmark}/>
                <FlexView row>
                    <CustomInput style={{flex: 1, marginRight: 0}} label="City" text={houseNo} setText={setHouseNo}/>
                    <CustomInput style={{flex: 1, marginLeft:10}} label="PIN Code" text={pinCode} setText={setPinCode} type="number-pad"/>
                </FlexView >
            </View>
            <View style={styles.section}>
                <Text style={styles.headingText}>Address Type</Text>
                <FlexView row justify="se" style={{marginTop: 10}}>
                    <Chip icon="home" onPress={() => setAddressType("Home")} selected={addressType==="Home"}>Home</Chip>
                    <Chip icon="office-building"  onPress={() => setAddressType("Office")} selected={addressType==="Office"}>Office</Chip>
                    <Chip icon="factory" onPress={() => setAddressType("Other")} selected={addressType==="Other"}>Other</Chip>
                </FlexView>
            </View>
            <CustomInput style={{flex: 1, marginRight: 0}} label="Nick Name for this address" text={nickName} setText={setNickName}/>
            <Button mode='contained' color="green">
                Add Address
            </Button>
            </>
        </TouchableWithoutFeedback> 
      </KeyboardAvoidingView>
    </ScrollView>

   );
};

export default AddressFormScreen;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:10,
        // backgroundColor:themeColorDull
    },
    headingText:{
        fontSize: 15,
        color:textColor
    },
    section:{
        marginBottom: 15
    }
})