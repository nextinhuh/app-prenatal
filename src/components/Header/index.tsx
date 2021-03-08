/* eslint-disable prettier/prettier */
import React from 'react';
import { ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, BackNavigationButton, TitleText, ChildrenContainer } from './styles';

interface HeaderViewProps extends ViewProps {
  title?: string;
  icon?: string;
  teste?: Function;
}

const Input: React.FC<HeaderViewProps> = ({ teste, title, children, ...rest }) => {
  const navigation = useNavigation();
  return (
    <Container>
      <BackNavigationButton onPress={teste}>
        <Ionicons name="ios-arrow-back" size={40} color="#F54F51" />
      </BackNavigationButton>

      <TitleText>{title}</TitleText>

      <ChildrenContainer>
        {children}
      </ChildrenContainer>

    </Container>
  );
};
export default Input;
