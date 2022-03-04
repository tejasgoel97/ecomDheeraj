import React from 'react';
import {StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from "./src/navigation/RootNavigation"
import store, { persistor } from "./src/reduxStore/store/store"
import { PersistGate } from 'redux-persist/integration/react'
import PersistGateLoading from './src/components/Loading/PersistGateLoading';



const App =() => {
  
  return (      
        <Provider store={store}>
          <PersistGate loading={<PersistGateLoading/>} persistor={persistor}>
            <RootNavigation/>
          </PersistGate>
        </Provider>
  );
};



export default App;
