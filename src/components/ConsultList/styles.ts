import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgb(242, 242, 242);
`;

export const ConsultCard = styled.TouchableOpacity`
  height: 90px;
  width: 320px;
  border-left-width: 2px;
  border-color: #fe3855;
  margin: 0px 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-top-right-radius: 10px;
`;

export const ConsultText = styled.Text`
  font-family: 'Montserrat_400Regular';
  font-weight: bold;
  font-size: 18px;
  color: black;
  width: 70%;
  margin-left: -55px;
`;
