/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { Container, BackNavigationButton, TitleText, ChildrenContainer } from './styles';

interface HeaderViewProps extends ViewProps {
  title?: string;
  icon?: string;
  backFunction?: Function;
  iconColor?: string;
  borderWhiteColor?: boolean;
}

const Input: React.FC<HeaderViewProps> = ({ borderWhiteColor, iconColor, backFunction, title, children, ...rest }) => {
  const navigation = useNavigation();
  const [backFunctionExist, setBackFunctionExist] = useState<Boolean>();

  useEffect(() => {
    if (backFunction != null) {
      setBackFunctionExist(true);
    } else {
      setBackFunctionExist(false);
    }
  }, [backFunction]);

  const navBackFunction = useCallback(() => {
    if (backFunction != null) {
      backFunction();
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer())
    }
  }, [navigation, backFunction]);

  return (
    <Container borderWhiteColor={borderWhiteColor} {...rest}>
      <BackNavigationButton onPress={navBackFunction}>
        {backFunctionExist ?
          <MaterialIcons name="keyboard-arrow-left" size={40} color={iconColor || "#F54F51"} />
          :
          <Feather name="menu" size={36} color={iconColor || "#F54F51"} />}

      </BackNavigationButton>

      <TitleText style={{ color: iconColor || "#F54F51" }}>{title}</TitleText>

      <ChildrenContainer>
        {children}
      </ChildrenContainer>

    </Container>
  );
};
export default Input;
