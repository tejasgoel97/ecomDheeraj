import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Icons from "react-native-vector-icons"
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import { TabActiveColor } from '../static/AppColors';
import ProductScreen from '../screens/ProductScreen';
const MainTabNav = () =>{
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-sharp' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;

              }else if (route.name === 'Cart') {
                iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                return <Ionicons name={iconName} size={size} color={color} />;

              }else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search';
                return <Ionicons name={iconName} size={size} color={color}/>;

              }
              
  
              // You can return any component that you like here!
              
            },
            tabBarActiveTintColor: TabActiveColor,
            tabBarInactiveTintColor: 'gray',
          })}    
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={SearchScreen}/>
            <Tab.Screen name="Cart" component={CartScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
        
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})
export default MainTabNav;