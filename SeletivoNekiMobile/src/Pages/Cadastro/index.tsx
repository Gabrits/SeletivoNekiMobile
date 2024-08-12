import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./style";
import { ButtonComponent } from '../../Components/ButtonComponent';
import { TextInputComponentEmail } from '../../Components/TextInputEmail';
import { TextInputComponentSenha } from '../../Components/TextInputSenha';

interface CadastroProps {
  navigation: any;
}

function Cadastro({ navigation }: CadastroProps) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (value: string, field: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem. Por favor, verifique e tente novamente.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.2:8080/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
          role: 'ADMIN'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erro', `HTTP error! Status: ${response.status}\n${errorData.message}`);
        return;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        console.log('Cadastro realizado:', json);
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      }
    } catch (err) {
      console.error('Erro ao realizar o cadastro:', err);
      Alert.alert('Erro', 'Erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#97a2b0" />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.titulo}>CADASTRO</Text>
          <View style={styles.caixaEntrada}>
            <TextInputComponentEmail
              placeholder='Email'
              value={formData.login}
              onChangeValue={(text) => handleInputChange(text, 'login')}
            />
            <TextInputComponentSenha
              placeholder='Senha'
              value={formData.password}
              onChangeValue={(text) => handleInputChange(text, 'password')}
            />
            <TextInputComponentSenha
              placeholder='Confirmar senha'
              value={formData.confirmPassword}
              onChangeValue={(text) => handleInputChange(text, 'confirmPassword')}
            />
            <ButtonComponent title='Continuar' handleOnPress={handleSubmit} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Cadastro;
