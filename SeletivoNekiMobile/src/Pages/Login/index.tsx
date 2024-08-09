import { styles } from "./style";
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones
import { ButtonComponent } from '../../Components/ButtonComponent';
import { TextInputComponentEmail } from '../../Components/TextInputEmail';
import { TextInputComponentSenha } from '../../Components/TextInputSenha';

interface LoginProps {
  navigation: any;
}

function Login({ navigation }: LoginProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => setIsChecked(!isChecked);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.titulo}>LOGIN</Text>
          <View style={styles.caixaEntrada}>
            <TextInputComponentEmail placeholder='Email'/>
            <TextInputComponentSenha placeholder='Senha'/>
            
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
                {isChecked && <MaterialIcons name="check-box" size={24} color="#97a2b0" />}
                {!isChecked && <MaterialIcons name="check-box-outline-blank" size={24} color="#97a2b0" />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Deseja salvar a sua senha?</Text>
            </View>
            
            <ButtonComponent title='Entrar' handleOnChange={() => navigation.navigate('Home')}/>
          </View>
          <View style={styles.textoCadastro}>
            <Text style={styles.texto}>Não possui uma conta?</Text>
            <Text style={styles.cadastro} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;
