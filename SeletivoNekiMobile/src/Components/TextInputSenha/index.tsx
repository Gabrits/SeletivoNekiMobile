import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';

interface PropsComponent extends TextInputProps {
  placeholder: string;
  onChangeValue?: (value: string) => void;
  value?: string;
}

export function TextInputComponentSenha({
  placeholder,
  onChangeValue,
  value,
  ...rest
}: PropsComponent) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#97a2b0"}
        style={styles.estiloTextInput}
        secureTextEntry={!isPasswordVisible}
        onChangeText={onChangeValue}
        value={value}
        {...rest}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <MaterialIcons
          name={isPasswordVisible ? "visibility" : "visibility-off"}
          size={24}
          color="#97a2b0"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}
