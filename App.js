
import React from 'react';
import {StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from "./src/navigation/RootNavigation"
import store from "./src/reduxStore/store/store"


const App =() => {
  
  return (      
        <Provider store={store}>
           <RootNavigation/>
        </Provider>
  );
};



export default App;
