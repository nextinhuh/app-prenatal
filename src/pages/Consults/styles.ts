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
  position: absolute;
  background-color: #fe3855;
  width: 100%;
  height: 30%;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 180px;
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
