/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import firebase from 'firebase';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useConsult } from '../../hooks/consults';
import 'firebase/firestore';

import ConsultList from '../../components/ConsultList';
import Prescriptions from '../Prescriptions';

import Header from '../../components/Header';

import {
  Container,
  ConsultCard,
  ConsultText,
  HeaderTitle,
  HeaderContainer,
  TabViewContainer,
} from './styles';

const Consults: React.FC = () => {
  const navigate = useNavigation();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [consultsList, setConsultsList] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const { updateConsultId } = useConsult();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'ConsultList' },
    { key: 'MedicalRecordAndPrescription' },
  ]);

  const SecondRoute: React.FC = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#FE3855',
        width: '20%',
        height: 4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginLeft: '11%',
      }}
      style={{
        backgroundColor: 'rgb(242,242,242)',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
      }}
      activeColor="#FE3855"
      inactiveColor="gray"
      renderIcon={({ route, focused, color }) => (
        <>
          {route.key === 'ConsultList' ? (
            <FontAwesome name="list-alt" size={32} color={color} />
          ) : (
            <FontAwesome5 name="book-medical" size={32} color={color} />
          )}
        </>
      )}
    />
  );

  const renderScene = SceneMap({
    ConsultList,
    MedicalRecordAndPrescription: SecondRoute,
  });

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
        <Header iconColor="#FFF" borderWhiteColor>
          <HeaderTitle>CONSULTAS</HeaderTitle>
        </Header>
      </HeaderContainer>

      <TabViewContainer>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </TabViewContainer>
    </Container>
  );
};

export default Consults;
