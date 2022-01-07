import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MainTabNav from './MainTabNav';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Tabnav" component={MainTabNav} options={{ headerShown: false }} />
            <Stack.Screen name="ProductScreen" component ={ProductScreen} />
      </Stack.Navigator>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default StackNavigator;