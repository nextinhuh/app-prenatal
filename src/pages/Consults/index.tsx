/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import firebase from 'firebase';
import { useConsult } from '../../hooks/consults';
import 'firebase/firestore';

import Header from '../../components/Header';

import {
  Container,
  IndicatorContainer,
  IndicatorCard,
  IndicatorTextNumber,
  IndicatorText,
  ConsultCard,
  ConsultText,
  HeaderTitle,
  HeaderContainer,
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

  return (
    <Container>
      <HeaderContainer>
        <Header iconColor="#FFF">
          <HeaderTitle>REGISTRAR</HeaderTitle>
        </Header>
      </HeaderContainer>

      {/* <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Consultas</Title>
      </Header> */}

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
