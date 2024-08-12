import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface PropsComponent {
  title?: string;
  handleOnChange?: () => void;
}

export function ButtonComponentHabilidade({ title, handleOnChange }: PropsComponent) {
  return (
    <>
      <TouchableOpacity style={styles.buttonstyles} onPress={handleOnChange}>
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
