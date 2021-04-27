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
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import firebase from 'firebase';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useConsult } from '../../hooks/consults';
import 'firebase/firestore';

import MedicalRecords from '../MedicalRecords';
import Prescriptions from '../Prescriptions';

import Header from '../../components/Header';

import {
  Container,
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

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const FirstRoute: React.FC = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );

  const SecondRoute: React.FC = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    first: MedicalRecords,
    second: Prescriptions,
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
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Consults;
