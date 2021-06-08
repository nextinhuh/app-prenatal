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
  height: 280px;
  border-bottom-left-radius: 130px;
  border-bottom-right-radius: 130px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-right: -360%;
`;

export const UserAvatar = styled.Image`
  position: absolute;
  right: 28%;
  top: 12%;
  width: 170px;
  height: 170px;
  border-radius: 85px;
  border-width: 1.5px;
  border-color: white;
`;

export const TabViewContainer = styled.View`
  flex: 1;
  margin-top: 280px;
  width: 100%;
  height: 40%;
  background-color: black;
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
  font-family: 'Montserrat_400Regular';
  font-size: 16px;
  color: black;
  width: 70%;
  margin-left: 10px;
`;
