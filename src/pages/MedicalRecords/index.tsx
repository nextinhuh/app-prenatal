import React, { useCallback } from 'react';
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
  OptionButton,
  BackButton,
  ConsultCard,
  ConsultText,
} from './styles';

const MedicalRecords: React.FC = () => {
  const navigate = useNavigation();

  const handleNavToBack = useCallback(() => {
    navigate.reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [navigate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavToBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Prontuários</Title>

        <OptionButton onPress={handleNavToBack}>
          <FontAwesome5 name="ellipsis-v" size={25} color="#503d77" />
        </OptionButton>
      </Header>

      <IndicatorContainer>
        <IndicatorCard>
          <IndicatorTextNumber>16</IndicatorTextNumber>
          <IndicatorText>Consultas</IndicatorText>
        </IndicatorCard>
      </IndicatorContainer>

      <ConsultCard>
        <FontAwesome5 name="notes-medical" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
      <ConsultCard>
        <FontAwesome5 name="notes-medical" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
      <ConsultCard>
        <FontAwesome5 name="notes-medical" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
    </Container>
  );
};

export default MedicalRecords;
