import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  ConfigurationContainer,
  HeaderTitle,
  ConfigurationTitle,
  ConfigurationItem,
  ConfigurationItemText,
} from './styles';

import Header from '../../components/Header';

const ConfigurationMenu: React.FC = () => {
  const navigation = useNavigation();

  const handleNavToUpdateProfile = useCallback(() => {
    navigation.navigate('ProfileUpdate');
  }, [navigation]);

  return (
    <Container>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F74462', '#FE3855']}
        style={{
          width: '100%',
          height: '90%',
          borderBottomLeftRadius: 70,
          borderBottomRightRadius: 70,
        }}
      >
        <Header iconColor="#FFF" borderWhiteColor style={{ height: '6%' }}>
          <HeaderTitle>OPÇÕES</HeaderTitle>
        </Header>
        <ConfigurationContainer>
          <ConfigurationTitle>SUAS CONFIGURAÇÕES</ConfigurationTitle>

          <ConfigurationItem onPress={handleNavToUpdateProfile}>
            <Ionicons name="md-person" size={24} color="white" />
            <ConfigurationItemText>Editar perfil</ConfigurationItemText>
          </ConfigurationItem>

          <ConfigurationItem>
            <Foundation name="paint-bucket" size={24} color="white" />
            <ConfigurationItemText>
              Mudar o tema do aplicativo
            </ConfigurationItemText>
          </ConfigurationItem>

          <ConfigurationItem>
            <MaterialIcons name="child-care" size={24} color="white" />
            <ConfigurationItemText>
              Mudar preferência de sexo
            </ConfigurationItemText>
          </ConfigurationItem>
        </ConfigurationContainer>
      </LinearGradient>
    </Container>
  );
};

export default ConfigurationMenu;
