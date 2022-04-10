// BASIC REACT IMPORTS
import React from 'react' 
import { StyleSheet, Text, View } from 'react-native'
// NAVIGATOR IMPORTS
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//IMPORT FOR SCREENS
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import CategoriesScreen from '../screens/CategoriesScreen';


// ICONS IMPORT
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Icons from "react-native-vector-icons"

// STATIC COLORS IMPORT
import { TabActiveColor } from '../static/AppColors';
import SearchScreen from '../screens/SearchScreen';


// MAIN COMPONENT START HERE
const MainTabNav = () =>{
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } 
              else if (route.name === 'Profile') {
                iconName = focused ? 'person-sharp' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } 
              else if (route.name === 'Cart') {
                iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              } 
              else if (route.name === 'Categories') {
                iconName = focused ? 'apps-sharp' : 'apps-outline';
                return <Ionicons name={iconName} size={size} color={color}/>;
              } 
              else if (route.name === 'SearchScreen') {
                iconName = focused ? 'search-sharp' : 'search-outline';
                return <Ionicons name={iconName} size={size} color={color}/>;
              }
              
              
  
              // You can return any component that you like here!
              
            },
            tabBarActiveTintColor: TabActiveColor,
            tabBarInactiveTintColor: 'gray',
          })}    
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Categories" component={CategoriesScreen}/>
            {/* <Tab.Screen name="WishList" component={WishListScreen}/> */}
            <Tab.Screen name="SearchScreen" component={SearchScreen}/>
            <Tab.Screen name="Cart" component={CartScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
        
    )
} 


// COMPONENT STYLES
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
})


export default MainTabNav;