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

export const Icon = styled(AntDesign)``;
