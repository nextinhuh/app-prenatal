import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface ContainerProps {
  borderColor?: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 0 16px;

  flex-direction: row;

  align-items: center;

  border-width: 2px;
  border-color: ${props => (props.borderColor ? props.borderColor : '#f1f1f1')};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f1f1f1;
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
  padding-right: 10px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;

export const IconButton = styled.TouchableOpacity``;
