import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonText, Icon, ButtonContainer } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...rest }) => (
  <Container {...rest}>
    <ButtonContainer>
      <Icon name={icon} size={35} color="white" />

      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  </Container>
);

export default Button;
