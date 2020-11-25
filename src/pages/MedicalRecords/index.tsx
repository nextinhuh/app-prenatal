/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation  } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';
import { useConsult } from '../../hooks/consults';

import {
  Container,
  Header,
  Title,
  BackButton,
  ConsultCard,
  ConsultCardTitle,
  ConsultCardText,
} from './styles';

interface MedicalRecords {
  abdominalCircumference: number;
  bloodPressure: string;
  heartRate: number;
  heigh: number;
  weight: number;
}

const MedicalRecords: React.FC = () => {
  const navigate = useNavigation();
  const {consultId} = useConsult();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecords>();




  useEffect(() => {
    async function loadMedicalRecords() {
      firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('consults')
        .doc(consultId)
        .get()
        .then(result => {
          if (result.exists) {
            setMedicalRecords(result.data()?.prescriptions);
          }
        });
    }

    loadMedicalRecords();
  }, [firebaseAuth, firebaseFirestore, consultId]);

  const handleNavToBack = useCallback(() => {
    navigate.navigate('Consults');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavToBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Prontuário</Title>
      </Header>

      <ConsultCard>
        <ConsultCardTitle>
          Sinais vitais
          {'\n'}
        </ConsultCardTitle>
        <ConsultCardText>Pressão aterial: {medicalRecords?.bloodPressure} mmHg</ConsultCardText>
        <ConsultCardText>Frequência cardíaca: {medicalRecords?.heartRate} ipm</ConsultCardText>
        <ConsultCardText>Peso: {medicalRecords?.weight} Kg</ConsultCardText>
        <ConsultCardText>Altura: {medicalRecords?.heigh} Mts</ConsultCardText>
        <ConsultCardText>Circunferência abdominal: {medicalRecords?.abdominalCircumference} Cm</ConsultCardText>
      </ConsultCard>
    </Container>
  );
};

export default MedicalRecords;
