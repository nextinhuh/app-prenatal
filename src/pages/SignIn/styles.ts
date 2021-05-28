import styled from 'styled-components/native';

interface ContainerSignInProps {
  keyboardVisible?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerSingIn = styled.View<ContainerSignInProps>`
  height: ${props => (props.keyboardVisible ? '82%' : '85%')};
  width: 100%;

  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-size: 64px;
  color: #f1f1f1;
  font-family: 'PoiretOne_400Regular';
  text-shadow: 3px 6px 5px #505050;
  height: 90px;
  margin-top: 80px;
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

export const ForgotPasswordButton = styled.TouchableOpacity``;

export const ForgotPasswordButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
  color: #f1f1f1;
  border-bottom-width: 1px;
  border-color: #f1f1f1;
  font-family: 'Montserrat_400Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity``;

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 22px;
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
  margin-top: 15px;
  margin-bottom: 15px;

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
