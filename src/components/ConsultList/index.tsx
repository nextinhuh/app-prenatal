/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useConsult } from '../../hooks/consults';

import { Container, ConsultCard, ConsultText, TextInformative } from './styles';

const ConsultList: React.FC = (props: any) => {
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [consultsList, setConsultsList] = useState<string[]>();
  const [refreshing, setRefreshing] = React.useState(false);
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

          if (resultList.length === 0) {
            resultList.push(
              'Você ainda não tem consultas cadastradas, puxe para baixo para atualizar a lista!',
            );
          }
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
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
        if (resultList.length === 0) {
          resultList.push(
            'Você ainda não tem consultas cadastradas, puxe para baixo para atualizar a lista!',
          );
        }
        setConsultsList(resultList);
        setRefreshing(false);
      });
  }, [firebaseFirestore, firebaseAuth]);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={consultsList}
          keyExtractor={consult => consult}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item: consult }) => (
            <>
              {consultsList &&
                consultsList[0] ===
                'Você ainda não tem consultas cadastradas, puxe para baixo para atualizar a lista!' ? (
                <TextInformative>{consultsList[0]}</TextInformative>
              ) : (
                <ConsultCard onPress={() => handleJumpTo(consult)}>
                  <FontAwesome
                    name="circle"
                    size={24}
                    color="#FE3855"
                    style={{ position: 'absolute', left: -12, top: 10 }}
                  />
                  <ConsultText>
                    {getFormatedDate(parseInt(consult))}
                  </ConsultText>
                </ConsultCard>
              )}
            </>
          )}
        />
      )}
    </Container>
  );
};

export default ConsultList;
