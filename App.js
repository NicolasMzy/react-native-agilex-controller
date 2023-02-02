import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/homeStack';
import { Provider } from 'react-redux'
import { store, persistor } from './store';
import {PersistGate} from 'redux-persist/es/integration/react'

const getFonts = () => Font.loadAsync({

})

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator/>
      </PersistGate>
    </Provider> 
  );
}

