import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  position: absolute;
  background-color: #fe3855;
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 130px;
  border-bottom-right-radius: 130px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-right: -400%;
  font-family: 'Montserrat_400Regular';
`;

export const UserAvatar = styled.Image`
  position: absolute;
  right: 28%;
  top: 30%;
  width: 170px;
  height: 170px;
  border-radius: 85px;
  border-width: 1.5px;
  border-color: white;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

export const ButtonEditAvatar = styled.TouchableOpacity`
  position: absolute;
  top: 30%;
  left: 57%;

  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  margin-top: 75%;
  width: 100%;
  padding: 2% 5% 2% 5%;
`;
