import styled from 'styled-components/native';

interface ProfileContainerProps {
  keyboardVisible?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ProfileContainer = styled.View<ProfileContainerProps>`
  height: ${props => (props.keyboardVisible ? '85%' : '90%')};
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  height: 20%;
  margin-top: 5%;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-right: -400%;
  font-family: 'Montserrat_400Regular';
`;

export const UserAvatar = styled.Image`
  margin-top: -45px;
  width: 170px;
  height: 170px;
  border-radius: 85px;
  border-width: 1.5px;
  border-color: white;
  align-self: center;
`;

export const ButtonEditAvatar = styled.TouchableOpacity`
  position: absolute;
  top: 37%;
  left: 60%;

  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  margin-top: 10%;
  width: 100%;
  padding: 2% 8% 2% 8%;
  margin-bottom: 5%;
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
