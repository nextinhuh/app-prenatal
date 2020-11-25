/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import firebase from 'firebase';
import { useConsult } from '../../hooks/consults';
import 'firebase/firestore';

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

const Consults: React.FC = () => {
  const navigate = useNavigation();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [consultsList, setConsultsList] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const { updateConsultId } = useConsult();

  useEffect(() => {
    async function listConsults() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('consults')
        .get()
        .then(result => {
          const resultList: any = [];
          result.forEach(doc => {
            resultList.push(doc.id);
          });
          setConsultsList(resultList);
          setLoading(false);
        });
    }

    listConsults();
  }, [firebaseFirestore, firebaseAuth]);

  const getFormatedDate = useCallback((date: number) => {
    const getDate = new Date(date);
    const formatedDate = format(
      getDate,
      "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm'h' ",
      { locale: ptBR },
    );
    return formatedDate;
  }, []);

  const handleNavBack = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  const handleNavMedicalRecords = useCallback(
    async (consultId: string) => {
      updateConsultId(consultId);
      navigate.navigate('BottomTabsMedicalRecords');
    },
    [navigate, updateConsultId],
  );

  const handleTest = useCallback(async () => {
    const time = new Date().getTime();
    await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('consults')
      .doc(time.toString())
      .set({
        prescriptions: {
          bloodPressure: '120 x 80',
          heartRate: 60,
          weight: 86,
          heigh: 1.6,
          abdominalCircumference: 60,
        },
        medicalRecords: [
          {
            title: 'Repouso',
            description:
              'Fazer repouso com duração de 2 horas, a cada 5 horas.',
          },
          {
            title: 'Alimentação',
            description: ' Dieta balanceada, comer comidas leves.',
          },
          {
            title: 'Exercício',
            description: 'Exercitar os membros inferiores com regularidade.',
          },
          {
            title: 'Teste',
            description:
              'Testando o teste Testando o teste Testando o teste Testando o teste.',
          },
        ],
      });
  }, [firebaseFirestore, firebaseAuth]);

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
          <IndicatorTextNumber>{consultsList?.length}</IndicatorTextNumber>
          <IndicatorText>Consultas</IndicatorText>
        </IndicatorCard>
      </IndicatorContainer>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={consultsList}
          keyExtractor={consult => consult}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: consult }) => (
            <ConsultCard onPress={() => handleNavMedicalRecords(consult)}>
              <FontAwesome5 name="laptop-medical" size={45} color="#503d77" />
              <ConsultText>
                Consulta realizada {getFormatedDate(parseInt(consult))}.
              </ConsultText>
            </ConsultCard>
          )}
        />
      )}
    </Container>
  );
};

export default Consults;
