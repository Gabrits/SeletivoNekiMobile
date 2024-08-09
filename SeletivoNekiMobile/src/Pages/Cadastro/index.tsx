import React from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones
import { styles } from "../Cadastro/style";
import { ButtonComponent } from '../../Components/ButtonComponent';
import { TextInputComponentEmail } from '../../Components/TextInputEmail';
import { TextInputComponentSenha } from '../../Components/TextInputSenha';


interface CadastroProps {
  navigation: any;
}

function Cadastro({ navigation }: CadastroProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#97a2b0" />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.titulo}>CADASTRO</Text>
          <View style={styles.caixaEntrada}>
            <TextInputComponentEmail placeholder='Email'/>
            <TextInputComponentSenha placeholder='Senha'/>
            <TextInputComponentSenha placeholder='Confirmar senha'/>
            <ButtonComponent title='Continuar'/>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Cadastro;
