import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin: 40px 20px 50px 20px;
  width: 90%;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #e5f2eb;
  border-radius: 50px;
`;

export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-left: 40px;
`;

export const ContainerMessage = styled.Text`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const UserNameButton = styled.TouchableOpacity``;

export const UserNameText = styled.Text`
  font-size: 20px;
  color: #a884f4;
`;

export const WelcomeText = styled.Text`
  font-size: 20px;
  color: #503d77;
`;

export const IndicatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const IndicatorCard = styled.View`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 57px;
  align-items: center;
  justify-content: center;
  background-color: #b2dcea;
  border-radius: 8px;
`;

export const IndicatorTextNumber = styled.Text`
  font-size: 20px;
  font-family: Lato_700Bold;
  color: #503d77;
`;

export const IndicatorText = styled.Text`
  font-size: 12px;
  font-family: Trocchi_400Regular;
  color: #a884f4;
`;

export const MenuContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 50px;
  max-height: 300px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 45%;
  height: 170px;
  background-color: #b2dcea;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const MenuText = styled.Text`
  font-family: Sofia_400Regular;
  font-size: 19px;
  color: #503d77;
  margin-top: 20px;
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-left: 0px;
  margin-bottom: 80px;
`;

export const AdMobContainer = styled.View`
  position: absolute;
  bottom: 0;
`;
