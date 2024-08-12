import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

function Navbar() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout', 'Você foi desconectado.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível desconectar. Tente novamente.');
      console.error('Erro ao realizar logout:', error);
    }
  };

  return (
    <View style={styles.containerGeral}>
      <Image 
        source={require('../../Assets/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={handleLogout}>
        <Icon 
          name="sign-out"
          size={30} 
          color="#FFFFFF" 
          style={styles.logoutIcon} 
        />
      </TouchableOpacity>
    </View>
  );
}

export default Navbar;
