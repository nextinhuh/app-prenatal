import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  BackButton,
  ConsultCard,
  ConsultCardTitle,
  ConsultCardText,
} from './styles';

const MedicalRecords: React.FC = () => {
  const navigate = useNavigation();

  const handleNavToBack = useCallback(() => {
    navigate.navigate('Consults');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavToBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Prontuário</Title>
      </Header>

      <ConsultCard>
        <ConsultCardTitle>
          Sinais vitais
          {'\n'}
        </ConsultCardTitle>
        <ConsultCardText>Pressão aterial: 120 x 80 mmHg</ConsultCardText>
        <ConsultCardText>Frequência cardíaca: 60 ipm</ConsultCardText>
        <ConsultCardText>Peso: 86 Kg</ConsultCardText>
        <ConsultCardText>Altura: 1,60 Mts</ConsultCardText>
        <ConsultCardText>Circunferência abdominal: 60 Cm</ConsultCardText>
      </ConsultCard>
    </Container>
  );
};

export default MedicalRecords;
