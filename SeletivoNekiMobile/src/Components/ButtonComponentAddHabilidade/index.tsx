import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './style';

interface ButtonComponentProps {
  title: string;
  handleOnPress?: () => void;
}

export function ButtonComponentAddHabilidade({ title, handleOnPress }: ButtonComponentProps) {
  return (
    <TouchableOpacity style={styles.buttonstyles} onPress={handleOnPress}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}