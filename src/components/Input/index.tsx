/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon, IconButton } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
  icon?: string;
  isPassword?: boolean;
  borderColor?: string;
  textPlaceHolderColor?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  name,
  isPassword,
  onBlur,
  borderColor,
  textPlaceHolderColor,
  ...rest
}) => {
  const [viewPassword, setViewPassword] = useState(isPassword);

  const handleViewPasswordChange = useCallback(() => {
    setViewPassword(!viewPassword);
  }, [viewPassword]);

  return (
    <Container borderColor={borderColor}>
      <Icon name={icon} size={25} color="#F1F1F1" />

      <TextInput
        onBlur={onBlur}
        placeholderTextColor={textPlaceHolderColor || "#f1f1f1"}
        keyboardAppearance="dark"
        secureTextEntry={viewPassword}
        {...rest}
      />

      {isPassword && (
        <IconButton onPress={handleViewPasswordChange}>
          {viewPassword ? (
            <Icon name="eye" size={25} color="#F1F1F1" />
          ) : (
            <Icon name="eye-off" size={25} color="#F1F1F1" />
          )}
        </IconButton>
      )}

    </Container>
  );
};
export default Input;
