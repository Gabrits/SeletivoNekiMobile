import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ou outra fonte de ícones que você prefira
import { styles } from './style';

function Footer() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir URL", err));
  };

  return (
    <View style={styles.footer}>
        <View style={styles.icons}>
      <TouchableOpacity onPress={() => openLink('https://www.instagram.com/nekitechnologies/')}>
        <Icon name="instagram" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/company/neki-it/')}>
        <Icon name="linkedin" size={30} color="white" />
      </TouchableOpacity>
        </View>
    </View>
  );
}

export default Footer;
