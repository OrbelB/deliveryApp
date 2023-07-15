import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import 'react-native-url-polyfill/auto'
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // NativeWindStyleSheet.setOutput({
  //   web: 'css',
  //   default: 'native'
  // })
  return (
  <NavigationContainer>
    <Provider store={store}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* restaurant screen */}
      {/* the names are important because that allows us to move to diffrent screens */}
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="Basket" component={BasketScreen} 
        options={{presentation: 'modal', headerShown: false}}
      />
      <Stack.Screen name="preparingOrderScreen" component={PreparingOrderScreen}
        options={{presentation:'fullScreenModal', headerShown: false}}
      />
      <Stack.Screen name="deliveryScreen" component={DeliveryScreen} 
        options={{presentation:'fullScreenModal', headerShown: false}}
      />
    </Stack.Navigator>
    </Provider>
  </NavigationContainer>
  );
};
