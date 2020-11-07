import React, { useCallback } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
  LogoutContainer,
} from './styles';

const Dashboard: React.FC = () => {
  const navigate = useNavigation();

  const handleNavConsult = useCallback(() => {
    navigate.navigate('');
  }, [navigate]);

  const handleNavMedicalRecords = useCallback(() => {
    navigate.navigate('BottomTabsMedicalRecords');
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
    navigate.reset({
      routes: [{ name: 'SignIn' }],
      index: 0,
    });
  }, [navigate]);

  return (
    <Container>
      <LogoutContainer onPress={handleNavLogOff}>
        <FontAwesome5 name="power-off" size={25} color="#503d77" />
      </LogoutContainer>
      <Header>
        <UserNameButton onPress={handleNavProfileUpdate}>
          <UserAvatar
            source={{
              uri:
                'https://avatars0.githubusercontent.com/u/50875570?s=460&u=fe14fc8cb776233600522328f1ea1406f895f44a&v=4',
            }}
          />
        </UserNameButton>

        <ContainerMessage>
          <WelcomeText>Bem vinda, </WelcomeText>
          <UserNameText>Nome do usuário</UserNameText>
        </ContainerMessage>
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
        <MenuItem style={{ backgroundColor: '#4CEC9F' }}>
          <FontAwesome5 name="user-md" size={50} color="#503d77" />
          <MenuText>Consultas</MenuText>
        </MenuItem>

        <MenuItem
          style={{ backgroundColor: '#F1D99A' }}
          onPress={handleNavMedicalRecords}
        >
          <FontAwesome5 name="file-medical" size={50} color="#503d77" />
          <MenuText>Prontuários</MenuText>
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

        <MenuItem
          style={{ backgroundColor: '#859DF2' }}
          onPress={handleNavAlbum}
        >
          <FontAwesome5 name="images" size={50} color="#503d77" />
          <MenuText>Álbum de fotos</MenuText>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default Dashboard;
