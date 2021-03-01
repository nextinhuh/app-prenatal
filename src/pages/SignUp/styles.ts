import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const SingUpContainer = styled.View`
  height: 85%;
  width: 100%;
  background: #fd3954;

  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;

  align-items: center;
  justify-content: center;

  elevation: 30;
`;

export const InputContainer = styled.View`
  padding: 20px 30px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 64px;
  color: #f1f1f1;
  font-family: 'PoiretOne_400Regular';
  text-shadow: 3px 6px 5px #505050;

  height: 90px;
  margin-top: 280px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
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
