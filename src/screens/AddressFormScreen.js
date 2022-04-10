import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Chip, HelperText, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../bootstrap/CustomInput';
import FlexView from "../bootstrap/FlexView"
import TextPara from '../bootstrap/TextPara';
import { AddAddressPre } from '../reduxStore/actions/PreOrderActions';
import { textColor, themeColorDull } from '../static/AppColors';

function AddressFormScreen({navigation}) {
  const preOrderReducerState = useSelector(state=> state.PreOrderReducer)
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState(null);
  const [houseNo, setHouseNo] = React.useState('');
  const [city, setCity] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [landmark, setLandmark] = React.useState('');
  const [pinCode, setPinCode] = React.useState("121102");
  const [nickName, setNickName] = React.useState('');
  const [addressType, setAddressType] = React.useState('Home')
  const [error, setError] = React.useState({
      nameErr: null,
      numberErr: null,
      houseNoErr: null,
      streetErr: null,
      cityErr: null,
  })
  const dispatch = useDispatch()
    function addAddressHandler(){
        setError({})
        const errArray = {}
        if(!name){
            errArray.nameErr = "Please Enter a Valid Name"
        }
        if(!number){
            errArray.numberErr = "Please Enter Phone Number"
        }
        if(number?.length >10){
        errArray.numberErr = "Phone Number Can't be greater then 10 Digits"
        }
        if(!houseNo) errArray.houseNoErr="Please Enter House No"
        if(!street) errArray.streetErr="Please Enter Street"
        if(!city) errArray.cityErr="Please Enter City"
        if(Object.keys(errArray).length){
            return setError(errArray)
        }
        else{
            const address = {name, number, houseNo, street, city,landmark, pinCode, nickName,addressType}
            dispatch(AddAddressPre(address))
            navigation.navigate("PlaceOrderScreen")
        }
        
    }
    console.log("PREE",preOrderReducerState)
  return (
    <ScrollView> 
      <View behavior='position' style={styles.mainContainer}>    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <View style={styles.section}>  
                <TextPara style={styles.headingText} size={24}>Personal Details</TextPara>
                <CustomInput label="Full Name*" text={name} setText={setName}/>
                    {error.nameErr && <TextPara color="red">{error.nameErr}</TextPara>}
                <CustomInput  label="Contact number to say hello" text={number} setText={setNumber} type='numeric'/>
                {error.numberErr && <TextPara color="red">{error.numberErr}</TextPara>}
            </View>
            <View style={styles.section}>           
                <Text style={styles.headingText}>Address Details</Text>
                <CustomInput  label="House/Flat Number" text={houseNo} setText={setHouseNo}/>
                {error.houseNoErr && <TextPara color="red">{error.houseNoErr}</TextPara>}
                <CustomInput  label="Street details to locate you" text={street} setText={setStreet}/>
                {error.streetErr && <TextPara color="red">{error.streetErr}</TextPara>}
                <CustomInput  label="Landmark for easy reach out" text={landmark} setText={setLandmark}/>
                
                <FlexView row>
                    <View style={{flex: 1, marginRight: 0}}>
                        <CustomInput style={{flex: 1, marginRight: 0}} label="City" text={city} setText={setCity}/>
                        {error.cityErr && <TextPara color="red">{error.cityErr}</TextPara>}
                    </View>
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
            <Button mode='contained' color="green" onPress={addAddressHandler}>
                Add Address
            </Button>
            </>
        </TouchableWithoutFeedback> 
      </View>
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
        fontSize: 25,
        color:textColor
    },
    section:{
        marginBottom: 15
    }
})