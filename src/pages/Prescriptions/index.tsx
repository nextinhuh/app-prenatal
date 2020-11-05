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
  ConsultCard,
  ConsultText,
} from './styles';

const Prescription: React.FC = () => {
  const navigate = useNavigation();

  const handleNavToBack = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  return (
    <Container>
      <Header>
        <Title>Prescrições</Title>

        <OptionButton>
          <FontAwesome5 name="ellipsis-v" size={25} color="#503d77" />
        </OptionButton>
      </Header>

      <IndicatorContainer>
        <IndicatorCard>
          <IndicatorTextNumber>16</IndicatorTextNumber>
          <IndicatorText>Prescrições</IndicatorText>
        </IndicatorCard>
      </IndicatorContainer>

      <ConsultCard>
        <FontAwesome5 name="signature" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
      <ConsultCard>
        <FontAwesome5 name="signature" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
      <ConsultCard>
        <FontAwesome5 name="signature" size={45} color="#503d77" />
        <ConsultText>Consulta do dia 13 de março de 2020.</ConsultText>
      </ConsultCard>
    </Container>
  );
};

export default Prescription;
