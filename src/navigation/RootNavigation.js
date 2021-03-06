import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainTabNav from './MainTabNav';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';

export default function RootNavigation() {
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
