import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  display: flex;
  width: 80px;
  height: 80px;
  background: #fd3954;
  border-radius: 40px;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #505050;
  font-size: 17px;
  font-family: 'Montserrat_400Regular';
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalCard = styled.View`
  background-color: #f2f2f2;
  border-radius: 20px;
  width: 270px;
  height: 288px;
  align-items: center;
  padding: 5%;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  color: #f54f51;
  font-family: 'Montserrat_400Regular';
  font-weight: bold;
  margin-top: 15%;
  margin-bottom: 10%;
`;

export const Icon = styled(AntDesign)``;
