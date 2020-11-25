import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';

import imgUserIcon from '../../assets/user.png';

import {
  Container,
  Header,
  UserAvatar,
  ContainerMessage,
  WelcomeText,
  UserNameText,
  IndicatorContainer,
  IndicatorCard,
  IndicatorTextNumber,
  IndicatorText,
  MenuContainer,
  MenuItem,
  MenuText,
  UserNameButton,
  LogoutButton,
} from './styles';

interface User {
  name: string | undefined | null;
  photoUrl: string | undefined | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigation();
  const dbFirestore = firebase.firestore();
  const [userInfo, setUserInfo] = useState<User>({} as User);

  useEffect(() => {
    const user = {
      name: firebase.auth().currentUser?.displayName,
      photoUrl: firebase.auth().currentUser?.photoURL,
    };
    setUserInfo(user);
  }, []);

  const handleNavConsult = useCallback(() => {
    navigate.navigate('Consults');
  }, [navigate]);

  const handleNavNotes = useCallback(() => {
    navigate.navigate('Notes');
  }, [navigate]);

  const handleNavAlbum = useCallback(() => {
    navigate.navigate('Album');
  }, [navigate]);

  const handleNavProfileUpdate = useCallback(() => {
    navigate.navigate('ProfileUpdate');
  }, [navigate]);

  const handleNavLogOff = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <Container>
      <Header>
        <UserNameButton onPress={handleNavProfileUpdate}>
          {userInfo.photoUrl ? (
            <UserAvatar
              source={{
                uri: `${userInfo.photoUrl}`,
              }}
            />
          ) : (
            <UserAvatar source={imgUserIcon} />
          )}
        </UserNameButton>

        <ContainerMessage>
          <WelcomeText>
            Olá,
            {'\n'}
          </WelcomeText>
          <UserNameText>{userInfo?.name}</UserNameText>
        </ContainerMessage>

        <LogoutButton onPress={handleNavLogOff}>
          <FontAwesome5 name="power-off" size={25} color="#503d77" />
        </LogoutButton>
      </Header>

      <IndicatorContainer>
        <IndicatorCard>
          <IndicatorTextNumber>16</IndicatorTextNumber>
          <IndicatorText>Prontuários</IndicatorText>
        </IndicatorCard>

        <IndicatorCard>
          <IndicatorTextNumber>4</IndicatorTextNumber>
          <IndicatorText>Consultas</IndicatorText>
        </IndicatorCard>

        <IndicatorCard>
          <IndicatorTextNumber>2</IndicatorTextNumber>
          <IndicatorText>Gestações</IndicatorText>
        </IndicatorCard>
      </IndicatorContainer>

      <MenuContainer>
        <MenuItem
          style={{ backgroundColor: '#4CEC9F' }}
          onPress={handleNavConsult}
        >
          <FontAwesome5 name="user-md" size={50} color="#503d77" />
          <MenuText>Consultas</MenuText>
        </MenuItem>

        <MenuItem
          style={{ backgroundColor: '#F1D99A' }}
          onPress={handleNavAlbum}
        >
          <FontAwesome5 name="images" size={50} color="#503d77" />
          <MenuText>Álbum de fotos</MenuText>
        </MenuItem>
      </MenuContainer>

      <MenuContainer>
        <MenuItem
          style={{ backgroundColor: '#F98996' }}
          onPress={handleNavNotes}
        >
          <FontAwesome5 name="sticky-note" size={50} color="#503d77" />
          <MenuText>Anotações</MenuText>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default Dashboard;
