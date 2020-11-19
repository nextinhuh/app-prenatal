import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  IndicatorContainer,
  IndicatorCard,
  IndicatorTextNumber,
  IndicatorText,
  BackButton,
  ConsultCard,
  ConsultText,
} from './styles';

const consultsList = [
  {
    id: 1,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 2,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 3,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 4,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 5,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 6,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 7,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 8,
    description: 'Consulta do dia 13 de março de 2020.',
  },
  {
    id: 9,
    description: 'Consulta do dia 13 de março de 2020.',
  },
];

const Consults: React.FC = () => {
  const navigate = useNavigation();

  const handleNavBack = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  const handleNavMedicalRecords = useCallback(() => {
    navigate.navigate('BottomTabsMedicalRecords');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Consultas</Title>
      </Header>

      <IndicatorContainer>
        <IndicatorCard>
          <IndicatorTextNumber>16</IndicatorTextNumber>
          <IndicatorText>Consultas</IndicatorText>
        </IndicatorCard>
      </IndicatorContainer>

      <FlatList
        data={consultsList}
        keyExtractor={consult => consult.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: consult }) => (
          <ConsultCard onPress={handleNavMedicalRecords}>
            <FontAwesome5 name="laptop-medical" size={45} color="#503d77" />
            <ConsultText>{consult.description}</ConsultText>
          </ConsultCard>
        )}
      />
    </Container>
  );
};

export default Consults;
