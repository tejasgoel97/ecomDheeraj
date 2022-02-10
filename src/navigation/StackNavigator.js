import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MainTabNav from './MainTabNav';
import ProductScreen from '../screens/ProductScreen';
import SelectAddressScreen from "../screens/SelectAddressScreen"
import AddressFormScreen from "../screens/AddressFormScreen"
import PlaceOrderScreen from '../screens/PlaceOrderScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Tabnav" component={MainTabNav} options={{ headerShown: false }} />
            <Stack.Screen name="ProductScreen" component ={ProductScreen} />
            <Stack.Screen name="SelectAddressScreen" component ={SelectAddressScreen} />
            <Stack.Screen name="AddressFormScreen" component ={AddressFormScreen} />
            <Stack.Screen name="PlaceOrderScreen" component ={PlaceOrderScreen} />
        </Stack.Navigator>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default StackNavigator;