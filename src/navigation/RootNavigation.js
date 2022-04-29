import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainTabNav from './MainTabNav';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';
import { useDispatch } from 'react-redux';
import auth, { firebase } from "@react-native-firebase/auth";
import { LogoutUser, SignInUser } from '../reduxStore/actions/UserActions';
import { loadPinFromStorage } from '../reduxStore/actions/AreaInfoAction';

export default function RootNavigation() {
  const dispatch = useDispatch()
  React.useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      console.log("userRootNav", user)
      if (user) {
        console.log('user is logged', user);
        return dispatch(SignInUser(user))
      }
      else{
        console.log("user is loggedOut");
        return dispatch(LogoutUser())         
      }
    });
  }, [])
  React.useEffect(()=>{
    dispatch(loadPinFromStorage())
  },[])
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
