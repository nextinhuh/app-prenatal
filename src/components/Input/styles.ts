import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;

  flex-direction: row;

  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #76348d;
  font-size: 16px;
  font-family: 'Trocchi_400Regular';
  border-bottom-width: 2px;
  border-color: #76348d;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
