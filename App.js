import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NativeBaseProvider
} from 'native-base'

import Home from './screens/Home.js';
import Masuk from './screens/Masuk.js';
import Maps from './screens/Maps.js';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Masuk" component={Masuk} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  </NavigationContainer>

    </NativeBaseProvider>
  );
}
