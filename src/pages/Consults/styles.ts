import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 0px 40px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #503d77;
  font-family: Underdog_400Regular;
  border-bottom-width: 2px;
  border-color: #503d77;
  margin-left: 85px;
`;

export const BackButton = styled.TouchableOpacity``;

export const IndicatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const IndicatorCard = styled.View`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 57px;
  align-items: center;
  justify-content: center;
  background-color: #b2dcea;
  border-radius: 8px;
`;

export const IndicatorTextNumber = styled.Text`
  font-size: 22px;
  font-family: Lato_700Bold;
  color: #503d77;
`;

export const IndicatorText = styled.Text`
  font-size: 14px;
  font-family: Trocchi_400Regular;
  color: #a884f4;
`;

export const ConsultCard = styled.TouchableOpacity`
  height: 90px;
  width: 320px;
  background-color: #b2dcea;
  margin: 20px 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-radius: 10px;
`;

export const ConsultText = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 16px;
  color: black;
  width: 150px;
`;
