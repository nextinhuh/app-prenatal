/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';

import firebase from 'firebase';
import { useConsult } from '../../hooks/consults';

import {
  Container,
  Title,
  MedicalRecordContainer,
  CardText,
  PrescriptionContainer,
  PrescriptionCardTitle,
  TextInformative
} from './styles';

interface MedicalRecords {
  abdominalCircumference: number;
  bloodPressure: string;
  heartRate: number;
  heigh: number;
  weight: number;
}

type Prescription = Array<{
  title: string;
  description: string;
}>;

const MedicalRecordAndPrescription: React.FC = () => {
  const { consultId } = useConsult();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecords>();
  const [prescription, setPrescription] = useState<Prescription>();


  useMemo(() => {
    async function loadMedicalRecords() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('consults')
        .doc(consultId)
        .get()
        .then(result => {
          if (result.exists) {
            setMedicalRecords(result.data()?.medicalRecords);
            setLoading(false);
          }
        });
    }

    async function loadRecords() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('consults')
        .doc(consultId)
        .get()
        .then(result => {
          if (result.exists) {
            const records: Prescription = result.data()?.prescriptions;
            setPrescription(records);
          }
        });
    }
    if (consultId) {
      loadRecords();
      loadMedicalRecords();
    }
  }, [firebaseFirestore, firebaseAuth, consultId]);



  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Container>

        {loading ? (
          <TextInformative>Porfavor, selecione uma consulta para visualizar o prontuário/prescrição!</TextInformative>
        ) : (
          <>
            <MedicalRecordContainer>
              <Title>Prontuário</Title>

              <CardText>Pressão aterial: {medicalRecords?.bloodPressure}</CardText>
              <CardText>Frequência cardíaca: {medicalRecords?.heartRate}</CardText>
              <CardText>Peso: {medicalRecords?.weight}</CardText>
              <CardText>Altura: {medicalRecords?.heigh}</CardText>
              <CardText>Circunferência abdominal: {medicalRecords?.abdominalCircumference}</CardText>

            </MedicalRecordContainer>

            <PrescriptionContainer>
              <Title>Prescrições</Title>

              <FlatList
                data={prescription}
                keyExtractor={prescriptions => prescriptions.title}
                showsVerticalScrollIndicator={false}
                style={{ width: '85%' }}
                renderItem={({ item: prescriptions }) => (
                  <>
                    <PrescriptionCardTitle>{prescriptions.title}</PrescriptionCardTitle>
                    <CardText>- {prescriptions.description}</CardText>
                  </>
                )}
              />
            </PrescriptionContainer>
          </>
        )}
      </Container>

    </ScrollView>
  );
};

export default MedicalRecordAndPrescription;
