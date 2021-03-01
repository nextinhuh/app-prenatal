import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin-top: 20%;
  flex-direction: row;
  margin-left: 5%;
`;

export const DrawerMenuButton = styled.TouchableOpacity``;

export const WelcomeText = styled.Text`
  margin-left: 3%;
  font-size: 20px;
  color: #fe637a;
  font-family: 'Montserrat_400Regular';
`;

export const CarouselContainer = styled.View`
  flex-direction: row;
  height: 50%;
  margin-top: 15px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  position: absolute;
  right: 15px;
  top: 60px;
  margin-left: 40px;
  border-width: 2px;
  border-color: white;
`;

export const CarouselCard = styled.View`
  border-radius: 15px;
  border-width: 1px;
  height: 100%;
  margin: 0px 0px 0px 10px;
  z-index: 50;
`;

export const ImageBannerCard = styled.Image`
  width: 100%;
  height: 50%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const TitleBannerCard = styled.Text`
  background-color: #fe637a;
  font-family: 'Montserrat_400Regular';
  border-radius: 5px;
  width: 90%;
  text-align: center;
  position: absolute;
  align-self: center;
  height: 30px;
  color: white;
  font-size: 16px;
  top: 48%;
`;

export const DescriptionBannerCard = styled.Text`
  margin-top: 30px;
  text-align: center;
  padding: 0px 5px;
  font-family: 'Montserrat_400Regular';
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

export const LogoutButton = styled.TouchableOpacity`
  margin-left: 0px;
  margin-bottom: 80px;
`;

export const AdMobContainer = styled.View`
  position: absolute;
  bottom: 0;
`;
