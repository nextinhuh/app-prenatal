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

export const CarouselContainer = styled.View`
  flex-direction: row;
  height: 50%;
  margin-top: 15px;
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

export const CarouselContainer2 = styled.View`
  height: 7%;
  margin-top: 10px;
  width: 100%;
`;

export const DividerContainer = styled.View`
  height: 55px;
  width: 105px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.View`
  height: 2px;
  flex: 1;
  background-color: #f98996;
`;

export const FilledCircle = styled.View`
  height: 35px;
  width: 35px;
  border-radius: 18px;
  background-color: #ff4261;
  margin-right: 10px;
`;

export const CarouselCard2 = styled.View`
  height: 35px;
  width: 35px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: #ff4261;
  elevation: 3;
`;

export const TitleBannerCard2 = styled.Text`
  font-size: 30px;
  color: white;
`;

export const SelectWeekButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroudImage = styled.ImageBackground`
  flex: 1;
  height: 140px;
  width: 140px;
  justify-content: center;
  align-items: center;
`;

export const ContainerButton = styled.View`
  height: 140px;
  width: 140px;
  border-radius: 70px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

export const SelectWeekButton = styled.TouchableOpacity`
  height: 20%;
  width: 20%;
  margin: 5px 0px;
  align-items: center;
  justify-content: center;
`;

export const SelectWeekCountText = styled.Text`
  color: white;
  font-family: 'Montserrat_400Regular';
  font-size: 28px;
  width: 40px;
  text-align: center;
`;

export const SelectWeekText = styled.Text`
  color: white;
  font-family: 'Montserrat_400Regular';
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-left: 0px;
  margin-bottom: 80px;
`;

export const AdMobContainer = styled.View`
  position: absolute;
  bottom: 0;
`;
