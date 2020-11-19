import React, { useCallback } from 'react';
import { ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ButtonEditAvatar,
  ButtonEditAvatarText,
  Image,
  Header,
  BackButton,
  LogOffButton,
} from './styles';

const ProfileUpdate: React.FC = () => {
  const navigation = useNavigation();

  const handlePNavBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavLogOff = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'SignIn' }],
      index: 0,
    });
  }, [navigation]);

  const handleAddPhoto = useCallback(() => {
    Alert.alert('', 'Favor escolha alguma das opções abaixo:', [
      {
        text: 'Cancelar',
      },
      { text: 'Tirar uma foto agora', onPress: handleTakePhoto },
      {
        text: 'Escolher uma foto da galeria',
        onPress: handleGaleryPhotoPicker,
      },
    ]);
  }, []);

  const handleTakePhoto = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
  }, []);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handlePNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <LogOffButton onPress={handleNavLogOff}>
          <FontAwesome5 name="power-off" size={25} color="#503d77" />
        </LogOffButton>
      </Header>

      <Title>Meu Perfil</Title>
      <Image
        source={{
          uri:
            'https://avatars0.githubusercontent.com/u/50875570?s=460&u=fe14fc8cb776233600522328f1ea1406f895f44a&v=4',
        }}
      />

      <ButtonEditAvatar onPress={handleAddPhoto}>
        <ButtonEditAvatarText>Editar Foto</ButtonEditAvatarText>
      </ButtonEditAvatar>
      <ScrollView style={{ width: '100%' }}>
        <Input name="name" placeholder="Nome Completo" icon="user" />
        <Input name="email" placeholder="E-mail" icon="mail" />
        <Input
          name="date_birth"
          placeholder="Data de nascimento"
          icon="calendar"
        />
        <Input name="password" placeholder="Senha" icon="lock" />
        <Input
          name="password_confirmation"
          placeholder="Comfirmar senha"
          icon="lock"
        />
      </ScrollView>
      <Button>Confirmar alteração</Button>
    </Container>
  );
};

export default ProfileUpdate;
