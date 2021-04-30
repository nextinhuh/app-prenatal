/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { SceneRendererProps } from 'react-native-tab-view';

import firebase from 'firebase';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useConsult } from '../../hooks/consults';

import { Container, ConsultCard, ConsultText } from './styles';

const ConsultList: React.FC = (props: any) => {
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
    const formatedDate = format(getDate, "HH:mm - dd'/'MM'/'yyyy", {
      locale: ptBR,
    });
    return formatedDate;
  }, []);

  const handleJumpTo = useCallback(
    (consultId: string) => {
      updateConsultId(consultId);
      props.jumpTo('MedicalRecordAndPrescription');
    },
    [props, updateConsultId],
  );

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={consultsList}
          keyExtractor={consult => consult}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: consult }) => (
            <ConsultCard onPress={() => handleJumpTo(consult)}>
              <FontAwesome
                name="circle"
                size={24}
                color="#FE3855"
                style={{ position: 'absolute', left: -12, top: 10 }}
              />
              <ConsultText>{getFormatedDate(parseInt(consult))}</ConsultText>
            </ConsultCard>
          )}
        />
      )}
    </Container>
  );
};

export default ConsultList;
