import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 64px;
  color: #a884f4;
  margin-top: 20px;
  margin-bottom: 30px;
  font-family: 'Sofia_400Regular';
`;

export const BackToSignIn = styled.TouchableOpacity`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackToSignInText = styled.Text`
  font-size: 16px;
  color: #76348d;
  border-bottom-width: 2px;
  border-color: #76348d;
  font-family: Trocchi_400Regular;
`;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

export const TitleDescription = styled.Text`
  font-size: 30px;
  color: #a884f4;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Sofia_400Regular';
`;
