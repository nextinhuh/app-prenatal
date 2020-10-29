import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, onBlur, ...rest }) => (
  <Container>
    <Icon name={icon} size={25} color="#76348D" />
    <TextInput
      onBlur={onBlur}
      placeholderTextColor="#76348D"
      keyboardAppearance="dark"
      {...rest}
    />
  </Container>
);

export default Input;
