import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 0px 40px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #503d77;
  font-family: Underdog_400Regular;
  border-bottom-width: 2px;
  border-color: #503d77;
  margin-left: 85px;
`;

export const OptionButton = styled.TouchableOpacity``;

export const ConsultCard = styled.View`
  width: 85%;
  background-color: #b2dcea;
  margin: 20px 30px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 10px;
`;

export const ConsultCardTitle = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 22px;
  color: #a884f4;
  width: 100%;
  text-align: center;
`;

export const ConsultText = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 18px;
  width: 80%;
  text-align: center;
  margin-top: 10px;
`;
