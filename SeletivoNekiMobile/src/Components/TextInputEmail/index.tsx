import {styles} from './style'
import React from 'react'
import { TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

interface PropsComponent {
    placeholder: string;
    type?: boolean;
    onChangeValue?: (value: string) => void;
    value?:string;
  }

export function TextInputComponentEmail({ placeholder, type, onChangeValue, value}: PropsComponent){
    return (
      <View>
        <MaterialIcons name="person" size={24} color="#97a2b0" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#97a2b0"}
        style={styles.estiloTextInput}
        secureTextEntry={type}
        onChangeText={onChangeValue}
        value={value}
        />
        </View>
      
    )
  }