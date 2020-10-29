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

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
  color: #76348d;
  border-bottom-width: 2px;
  border-color: #76348d;
  font-family: Trocchi_400Regular;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  margin-top: 50px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const TitleDescription = styled.Text`
  font-size: 28px;
  color: #a884f4;
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: 'Sofia_400Regular';
`;
