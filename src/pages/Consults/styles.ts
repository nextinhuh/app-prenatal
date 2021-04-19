import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-right: -360%;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  background-color: black;
  width: 100%;
  height: 100%;
  margin-top: 30%;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  width: 110px;
  height: 110px;
  position: absolute;
  right: 15px;
  top: 60px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  border-width: 2px;
  border-color: white;
`;

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
  width: 70%;
  margin-left: 10px;
`;
