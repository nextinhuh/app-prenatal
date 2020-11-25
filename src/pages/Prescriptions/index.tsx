import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { useConsult } from '../../hooks/consults';

import {
  Container,
  Header,
  Title,
  ConsultCardTitle,
  ConsultCard,
  ConsultText,
} from './styles';

type Prescription = Array<{
  title: string;
  description: string;
}>;

interface RouteParams {
  consultId: string;
}

const Prescription: React.FC = () => {
  const firebaseAuth = firebase.auth().currentUser;
  const { consultId } = useConsult();
  const firebaseFirestore = firebase.firestore();
  const [prescription, setPrescription] = useState<Prescription>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('consults')
        .doc(consultId)
        .get()
        .then(result => {
          if (result.exists) {
            const records: Prescription = result.data()?.medicalRecords;
            setPrescription(records);
            setLoading(false);
          }
        });
    }

    loadRecords();
  }, [firebaseAuth, firebaseFirestore, consultId]);

  return (
    <Container>
      <Header>
        <Title>Prescrições</Title>
      </Header>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={prescription}
          keyExtractor={prescriptions => prescriptions.title}
          showsVerticalScrollIndicator={false}
          style={{ width: '85%' }}
          renderItem={({ item: prescriptions }) => (
            <ConsultCard>
              <ConsultCardTitle>{prescriptions.title}</ConsultCardTitle>
              <ConsultText>{prescriptions.description}</ConsultText>
            </ConsultCard>
          )}
        />
      )}
    </Container>
  );
};

export default Prescription;
