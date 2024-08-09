import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Pages/Login';
import Cadastro from './src/Pages/Cadastro';
import * as Font from 'expo-font';
import Home from './src/Pages/Home';

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-regular': require('../SeletivoNekiMobile/src/Assets/Montserrat.ttf'),
  });
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
