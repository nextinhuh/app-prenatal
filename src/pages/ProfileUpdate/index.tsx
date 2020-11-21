import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import Input from '../../components/Input';
import Button from '../../components/Button';
import imgUserIcon from '../../assets/user.png';

import {
  Container,
  Title,
  ButtonEditAvatar,
  ButtonEditAvatarText,
  Image,
  Header,
  BackButton,
  LogOffButton,
  ErrorText,
} from './styles';

interface User {
  name: string | undefined | null;
  photoUrl: string | undefined | null;
}

const ProfileUpdate: React.FC = () => {
  const navigation = useNavigation();
  const firebaseAuth = firebase.auth();
  const storageFirebase = firebase.storage();
  const [userInfo, setUserInfo] = useState<User>({} as User);

  useEffect(() => {
    const user = {
      name: firebaseAuth.currentUser?.displayName,
      photoUrl: firebaseAuth.currentUser?.photoURL,
    };
    setUserInfo(user);
  }, []);

  const handlePNavBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [navigation]);

  const handleNavLogOff = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  const handleTakePhoto = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const image = await fetch(result.uri);
      const blobImage = await image.blob();

      const imageRef = storageFirebase
        .ref()
        .child(`images/${firebaseAuth.currentUser?.uid}`);

      const uploadImage = imageRef.put(blobImage);
      let linkImage = '';

      await imageRef.getDownloadURL().then(url => {
        if (url) {
          linkImage = url;
        }
      });

      firebaseAuth.currentUser?.updateProfile({
        photoURL: linkImage,
      });

      const user = {
        name: firebase.auth().currentUser?.displayName,
        photoUrl: linkImage,
      };
      setUserInfo(user);
    }
  }, [storageFirebase, firebaseAuth]);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const image = await fetch(result.uri);
      const blobImage = await image.blob();

      const imageRef = await storageFirebase
        .ref()
        .child(`images/${firebaseAuth.currentUser?.uid}`);

      const uploadImage = await imageRef.put(blobImage);
      let linkImage = '';

      await imageRef.getDownloadURL().then(url => {
        if (url) {
          linkImage = url;
        }
      });

      firebaseAuth.currentUser?.updateProfile({
        photoURL: linkImage,
      });

      const user = {
        name: firebase.auth().currentUser?.displayName,
        photoUrl: linkImage,
      };
      setUserInfo(user);
    }
  }, [storageFirebase, firebaseAuth]);

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
  }, [handleGaleryPhotoPicker, handleTakePhoto]);

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
      {userInfo.photoUrl ? (
        <Image
          source={{
            uri: `${userInfo.photoUrl}`,
          }}
        />
      ) : (
        <Image source={imgUserIcon} />
      )}

      <ButtonEditAvatar onPress={handleAddPhoto}>
        <ButtonEditAvatarText>Editar Foto</ButtonEditAvatarText>
      </ButtonEditAvatar>
      <ScrollView style={{ width: '100%' }}>
        <Formik
          initialValues={{
            email: firebaseAuth.currentUser?.email,
            password: '',
            name: firebaseAuth.currentUser?.displayName,
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required('Email é obrigatório')
              .email('Precisa ser um email'),
            password: Yup.string()
              .required('Senha é obrigatória')
              .min(6, 'No minímo 6 caracteres'),
            name: Yup.string()
              .required('Nome é obrigatório')
              .min(5, 'Deve conter no mínimo 5 letas'),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref('password'), undefined],
              'As senhas devem ser iguais',
            ),
          })}
          onSubmit={() => {}}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            isSubmitting,
            handleBlur,
            touched,
          }) => (
            <>
              <Input
                onBlur={handleBlur('name')}
                name="name"
                icon="user"
                placeholder="Nome"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {touched.name && <ErrorText>{errors.name}</ErrorText>}

              <Input
                onBlur={handleBlur('email')}
                name="email"
                icon="mail"
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {touched.email && <ErrorText>{errors.email}</ErrorText>}

              <Input
                onBlur={handleBlur('password')}
                name="password"
                icon="lock"
                placeholder="Senha"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              {touched.password && <ErrorText>{errors.password}</ErrorText>}

              <Input
                onBlur={handleBlur('confirmPassword')}
                name="confirmPassword"
                icon="lock"
                placeholder="Confirmar senha"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry
              />
              {touched.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}

              {!isSubmitting && (
                <Button onPress={() => handleSubmit()}>
                  Confirmar alteração
                </Button>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default ProfileUpdate;
