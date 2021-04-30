import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgb(242, 242, 242);
`;

export const Title = styled.Text`
  font-size: 28px;
  color: black;
  font-family: 'OpenSans_400Regular';
  margin-bottom: 10%;
  font-weight: bold;
`;

export const MedicalRecordContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10%;
`;

export const CardText = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  color: #666666;
  margin-bottom: 5%;
`;

export const PrescriptionContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10%;
  margin-top: -8%;
`;

export const PrescriptionCardTitle = styled.Text`
  font-family: 'OpenSans_400Regular';
  font-size: 18px;
  font-weight: bold;
  color: #666666;
  text-align: center;
  margin-bottom: 2%;
`;

export const TextInformative = styled.Text`
  font-size: 26px;
  color: black;
  font-family: 'OpenSans_400Regular';
  font-weight: bold;
  text-align: center;
  padding: 5%;
`;
