import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Pages/Login';
import Cadastro from './src/Pages/Cadastro';
import Home from './src/Pages/Home';
import * as Font from 'expo-font';
import { Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'montserrat-regular': require('./src/Assets/Montserrat.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica o token quando o componente é montado
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
