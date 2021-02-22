import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 0 16px;

  flex-direction: row;

  align-items: center;

  border-width: 2px;
  border-color: #f1f1f1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f1f1f1;
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
