import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputComponentEmail } from '../../Components/TextInputEmail';
import { TextInputComponentSenha } from '../../Components/TextInputSenha';
import { ButtonComponent } from '../../Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import Toast from 'react-native-toast-message';

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => setIsChecked(!isChecked);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.2:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email, password: senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro de autenticação',
          text2: errorData.message || 'Verifique suas credenciais e tente novamente.',
        });
        return;
      }

      const data = await response.json();
      console.log('Autenticação bem-sucedida:', data);

      if (!data.token) {
        throw new Error('Token não encontrado na resposta.');
      }
      if (!data.userId) {
        console.warn('userId não encontrado na resposta.');
      }

      await AsyncStorage.setItem('token', data.token);
      if (data.userId) {
        await AsyncStorage.setItem('userId', data.userId.toString());
      }

      if (isChecked) {
        await AsyncStorage.setItem('login', email);
        await AsyncStorage.setItem('password', senha);
      } else {
        await AsyncStorage.removeItem('login');
        await AsyncStorage.removeItem('password');
      }

      // Navegar para a tela "Home"
      navigation.navigate('Home');
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login realizado com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro ao autenticar',
        text2: 'Por favor, tente novamente.',
      });
    }
  };

  // Função de teste para AsyncStorage
  const testAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('testKey', 'testValue123');
      const value = await AsyncStorage.getItem('testKey');
      console.log('Valor do AsyncStorage:', value); // Deve ser 'testValue123'
      await AsyncStorage.removeItem('testKey');
    } catch (error) {
      console.error('Erro ao manipular AsyncStorage:', error);
    }
  };

  // Execute o teste de AsyncStorage ao montar o componente
  React.useEffect(() => {
    testAsyncStorage();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.titulo}>LOGIN</Text>
          <View style={styles.caixaEntrada}>
            <TextInputComponentEmail
              placeholder='Email'
              onChangeValue={setEmail}
              value={email}
            />
            <TextInputComponentSenha
              placeholder='Senha'
              onChangeValue={setSenha}
              value={senha}
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                {isChecked ? (
                  <MaterialIcons name="check-box" size={24} color="#97a2b0" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={24} color="#97a2b0" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Deseja salvar a sua senha?</Text>
            </View>
            <ButtonComponent title='Entrar' handleOnPress={handleLogin} />
          </View>
        </View>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
