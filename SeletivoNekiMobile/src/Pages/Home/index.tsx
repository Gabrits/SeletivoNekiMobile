import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  Modal,
} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import CardSkill from '../../Components/CardSkill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../Components/NavBar';
import { ButtonComponentHabilidade } from '../../Components/ButtonComponentHabilidade';
import Footer from '../../Components/Footer';
import AdicionarSkill from '../../Components/AdicionarSkill';
import { styles } from './style';

interface Skill {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  level?: string;
}

const Home: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const getUserIdFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode<{ userId: string }>(token);
        return decodedToken.userId;
      }
      return null;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserIdFromToken();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      if (userId) {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            throw new Error('Token não encontrado');
          }

          const response = await fetch(`http://192.168.1.2:8080/usuarios/skills/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao carregar skills');
          }

          const data = await response.json();
          setSkills(data);
        } catch (error) {
          console.error('Erro ao carregar skills:', error);
          Alert.alert('Erro', 'Não foi possível carregar as skills.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSkills();
  }, [userId]);

  const handleDeleteSkill = (id: string) => {
    setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />
      <View style={styles.titulo}>
        <Text style={styles.bemVindo1}>Exiba suas</Text>
        <Text style={styles.bemVindo2}>Habilidades!</Text>
        <Text style={styles.descricao}>
          Adicione suas competências com fotos, descrições e níveis de proficiência. Mostre o que você sabe fazer!
        </Text>
        <ButtonComponentHabilidade title='Adicionar Habilidade' handleOnChange={handleOpenModal} />
      </View>
      <View style={styles.divisor} />
      <Text style={styles.tituloSkills}>Habilidades</Text>
      <View style={styles.cardsContainer}>
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardSkill 
              skill={item} 
              onDelete={handleDeleteSkill} 
            />
          )}
        />
      </View>
      <Footer />

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <AdicionarSkill closeModal={handleCloseModal} />
      </Modal>
    </ScrollView>
  );
};

export default Home;
