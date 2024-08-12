import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { styles } from './style';

interface Skill {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  level?: string; 
}

interface CardSkillProps {
  skill: Skill;
  onDelete: (id: string) => void;
}

const CardSkill: React.FC<CardSkillProps> = ({ skill, onDelete }) => {
  const [level, setLevel] = useState<string>(skill.level || 'INTERMEDIARIO');
  const [corBolinha, setCorBolinha] = useState<string[]>(getInitialColors(skill.level || 'INTERMEDIARIO'));

  function getInitialColors(level: string): string[] {
    if (level === 'INICIANTE') return ['#DC3545', '#343A40', '#343A40'];
    if (level === 'INTERMEDIARIO') return ['#FFC107', '#FFC107', '#343A40'];
    if (level === 'AVANCADO') return ['#28A745', '#28A745', '#28A745'];
    return ['#343A40', '#343A40', '#343A40'];
  }

  function formatLevel(level: string): string {
    switch (level) {
      case 'INICIANTE':
        return 'Level Iniciante';
      case 'INTERMEDIARIO':
        return 'Level Intermediário';
      case 'AVANCADO':
        return 'Level Avançado';
      default:
        return 'Desconhecido';
    }
  }

  useEffect(() => {
    setCorBolinha(getInitialColors(level));
  }, [level]);

  const getUserId = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }
      
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Erro ao obter userId:', error);
      return null;
    }
  };

  const updateSkillLevel = async (newLevel: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await getUserId();
      if (!token || !userId) {
        throw new Error('Token ou ID do usuário não encontrado');
      }

      const response = await fetch(`http://192.168.1.2:8080/usuarios/skills/${userId}/${skill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: skill.nome,
          descricao: skill.descricao,
          imagemUrl: skill.imagemUrl,
          level: newLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar skill.');
      }

      setLevel(newLevel);
    } catch (error) {
      console.error('Erro ao atualizar skill:', error);
      Alert.alert('Erro', 'Erro ao atualizar skill.');
    }
  };

  const handleBolinha = (numero: number) => {
    let novoLevel = 'INTERMEDIARIO';

    if (numero === 0) {
      novoLevel = 'INICIANTE';
    } else if (numero === 1) {
      novoLevel = 'INTERMEDIARIO';
    } else if (numero === 2) {
      novoLevel = 'AVANCADO';
    }

    updateSkillLevel(novoLevel);
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await getUserId();
      if (!token || !userId) {
        throw new Error('Token ou ID do usuário não encontrado');
      }

      const response = await fetch(`http://192.168.1.2:8080/usuarios/skills/${userId}/${skill.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar skill.');
      }

      if (onDelete) {
        onDelete(skill.id);
      }
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      Alert.alert('Erro', 'Erro ao deletar skill.');
    }
  };

  return (
    <View style={styles.containerGeral}>
      <View style={styles.imagem}>
        <Image source={{ uri: skill.imagemUrl }} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>{skill.nome}</Text>
      </View>
      <View style={styles.descricao}>
        <Text style={styles.descricaoText}>{skill.descricao}</Text>
      </View>
      <View style={styles.level}>
        <Text>{formatLevel(level)}</Text>
      </View>
      <View style={styles.levelBolinha}>
        {corBolinha.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.bolinha, { backgroundColor: color }]}
            onPress={() => handleBolinha(index)}
          >
            <Icon name="circle" size={20} color={color} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleDelete} style={{ position: 'absolute', top: 0, right: 0, padding:10, backgroundColor:"#DC3545", borderRadius:100, alignContent:"center", borderColor: "#121212", borderWidth:1}}>
        <Icon name="trash" size={20} color="#121212" />
      </TouchableOpacity>
    </View>
  );
};

export default CardSkill;
