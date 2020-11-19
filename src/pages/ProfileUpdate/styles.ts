import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 40px 30px;
`;

export const Header = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: #503d77;
  margin-top: 10px;
  font-family: 'Trocchi_400Regular';
`;

export const BackButton = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
`;

export const LogOffButton = styled.TouchableOpacity``;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 20px;
`;

export const ButtonEditAvatar = styled.TouchableOpacity``;

export const ButtonEditAvatarText = styled.Text`
  font-size: 20px;
  color: #503d77;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Trocchi_400Regular';
  border-bottom-width: 2px;
  border-color: #503d77;
`;
