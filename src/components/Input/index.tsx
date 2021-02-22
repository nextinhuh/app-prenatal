import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ name, icon, onBlur, ...rest }) => (
  <Container>
    <Icon name={icon} size={25} color="#F1F1F1" />
    <TextInput
      onBlur={onBlur}
      placeholderTextColor="#f1f1f1"
      keyboardAppearance="dark"
      {...rest}
    />
  </Container>
);

export default Input;
