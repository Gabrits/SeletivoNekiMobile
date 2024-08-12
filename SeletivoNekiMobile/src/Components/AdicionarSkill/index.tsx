import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ToastAndroid,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { Picker } from '@react-native-picker/picker'; 
import { styles } from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonComponent } from '../ButtonComponent';
import { ButtonComponentAddHabilidade } from '../ButtonComponentAddHabilidade';

interface Skill {
  id: string;
  nome: string;
}

interface AdicionarSkillProps {
  closeModal: () => void;
}

const AdicionarSkill = ({ closeModal }: AdicionarSkillProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('INTERMEDIARIO');
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('O usuário não está autenticado.');
        return;
      }

      try {
        const response = await fetch('http://192.168.1.2:8080/skills', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar skills. Verifique as permissões e o token.');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error('Erro ao buscar skills:', err);
        setError('Erro ao buscar skills.');
      }
    };

    const fetchUserSkills = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('O usuário não está autenticado.');
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        const userId = decodedToken.userId;
        if (!userId) {
          throw new Error('userId não encontrado no token.');
        }

        const response = await fetch(`http://192.168.1.2:8080/usuarios/skills/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar habilidades do usuário. Verifique as permissões e o token.');
        }
        const data = await response.json();
        setUserSkills(data);
      } catch (err) {
        console.error('Erro ao buscar habilidades do usuário:', err);
        setError('Erro ao buscar habilidades do usuário.');
      }
    };

    fetchSkills();
    fetchUserSkills();
  }, []);

  const handleAddSkill = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setError('O usuário não está autenticado.');
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      const userId = decodedToken.userId;
      if (!userId) {
        throw new Error('userId não encontrado no token.');
      }

      const skillAlreadyExists = userSkills.some(skill => skill.skillId === parseInt(selectedSkill));

      if (skillAlreadyExists) {
        ToastAndroid.show('Você já tem esta habilidade associada.', ToastAndroid.LONG);
        return;
      }

      const response = await fetch('http://192.168.1.2:8080/usuarios/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId: userId,
          skillId: selectedSkill,
          level: selectedLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar skill. Verifique as permissões e o token.');
      }

      ToastAndroid.show('Skill adicionada com sucesso.', ToastAndroid.LONG);
      closeModal();
    } catch (err) {
      console.error('Erro ao adicionar skill:', err);
      ToastAndroid.show('Erro ao adicionar skill.', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.cardModal}>
        <View style={styles.conteudoModal}>
          <View style={styles.closeButtonContainer} >
                <Icon name="close" size={24} color="white" onPress={closeModal}/>
            </View>
          <Text style={styles.title}>Adicionar Habilidade</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.caixaEntrada}>
            <Picker
              selectedValue={selectedSkill}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSkill(itemValue)}
            >
              <Picker.Item label="Qual a sua skill?" value="" />
              {skills.map(skill => (
                <Picker.Item key={`skill-${skill.id}`} label={skill.nome} value={skill.id} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedLevel}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLevel(itemValue)}
            >
              <Picker.Item label="Iniciante" value="INICIANTE" />
              <Picker.Item label="Intermediário" value="INTERMEDIARIO" />
              <Picker.Item label="Avançado" value="AVANCADO" />
            </Picker>
            <View style={styles.containerBotao}>
            <ButtonComponentAddHabilidade title='Adicionar Habilidade' handleOnPress={handleAddSkill}/>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdicionarSkill;