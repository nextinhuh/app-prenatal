import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 80px;
  width: 100%;
  padding: 0px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #503d77;
  font-family: Underdog_400Regular;
  border-bottom-width: 2px;
  border-color: #503d77;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
`;

export const ConsultCard = styled.View`
  width: 85%;
  background-color: #b2dcea;
  margin: 40px 30px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px;
`;

export const ConsultCardTitle = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 22px;
  color: #a884f4;
  width: 100%;
  text-align: center;
`;

export const ConsultCardText = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 18px;
`;
