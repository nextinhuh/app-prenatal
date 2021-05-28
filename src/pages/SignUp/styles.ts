import styled from 'styled-components/native';

interface SignUpContainerProps {
  keyboardVisible?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const SingUpContainer = styled.View<SignUpContainerProps>`
  height: ${props => (props.keyboardVisible ? '82%' : '85%')};
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 64px;
  color: #f1f1f1;
  font-family: 'PoiretOne_400Regular';
  text-shadow: 3px 6px 5px #505050;
  margin-top: 80px;
  height: 90px;
`;

export const InputContainer = styled.View`
  padding: 20px 30px;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
  margin-top: -20px;
  margin-bottom: 10px;
  font-family: 'Montserrat_400Regular';
`;

export const BackToSignIn = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const BackToSignInText = styled.Text`
  font-size: 14px;
  color: #f1f1f1;
  border-bottom-width: 1px;
  border-color: #f1f1f1;
  font-family: 'Montserrat_400Regular';
`;
