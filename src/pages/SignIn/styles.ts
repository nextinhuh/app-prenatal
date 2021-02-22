import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerSingIn = styled.View`
  width: 100%;
  height: 85%;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;

  background: #fd3954;

  align-items: center;
  justify-content: center;

  elevation: 30;
`;

export const Title = styled.Text`
  font-size: 64px;
  color: #f1f1f1;
  font-family: 'PoiretOne_400Regular';
  text-shadow: 3px 6px 5px #505050;
  height: 13%;
  margin-top: 2%;
`;

export const InputContainer = styled.View`
  margin-top: 30px;
  padding: 20px 30px;
  align-items: center;
`;
export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

export const ForgotPasswordButton = styled.TouchableOpacity``;

export const ForgotPasswordButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  margin-bottom: 15px;
  color: #f1f1f1;
  border-bottom-width: 1px;
  border-color: #f1f1f1;
  font-family: 'Montserrat_400Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity``;

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
  color: #f1f1f1;
  font-family: 'Montserrat_400Regular';
  font-weight: bold;
`;

export const DividerContainer = styled.View`
  padding: 0 30px;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  flex: 1;
  height: 2px;
  background-color: #f1f1f1;
  elevation: 6;
`;

export const DividerText = styled.Text`
  width: 90px;
  text-align: center;
  color: #f1f1f1;
  font-family: 'Montserrat_400Regular';
  font-size: 23px;
  text-shadow: 2px 4px 5px #505050;
`;

export const SocialEntryButton = styled.TouchableOpacity`
  display: flex;
  width: 280px;
  height: 50px;
  background: #f1f1f1;
  border-radius: 15px;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

export const SocialEntryContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SocialEntryButtonText = styled.Text`
  color: #505050;
  font-size: 17px;
  font-family: 'Montserrat_400Regular';
  font-weight: bold;
`;

export const ImageIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 5%;
`;
