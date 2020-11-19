import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title,
  ConsultCardTitle,
  ConsultCard,
  ConsultText,
} from './styles';

const Prescription: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Prescrições</Title>
      </Header>

      <ConsultCard>
        <ConsultCardTitle>Repouso</ConsultCardTitle>
        <ConsultText>
          Fazer repouso com duração de 2 horas, a cada 5 horas.
        </ConsultText>
      </ConsultCard>

      <ConsultCard>
        <ConsultCardTitle>Alimentação</ConsultCardTitle>
        <ConsultText>
          Dieta balanceada, comer comidas leves na janta.
        </ConsultText>
      </ConsultCard>
      <ConsultCard>
        <ConsultCardTitle>Exercícios</ConsultCardTitle>
        <ConsultText>
          Exercitar os membros inferiores com regularidade.
        </ConsultText>
      </ConsultCard>
    </Container>
  );
};

export default Prescription;
