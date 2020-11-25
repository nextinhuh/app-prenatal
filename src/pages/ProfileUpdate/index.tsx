import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
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
  name: string | undefined;
  photoUrl: string | undefined;
  email: string | undefined;
}

interface UserUpdate {
  name: string | undefined;
  email: string | undefined;
  password: string;
  confirmPassword: string;
}

const ProfileUpdate: React.FC = () => {
  const navigation = useNavigation();
  const firebaseAuth = firebase.auth().currentUser;
  const storageFirebase = firebase.storage();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (firebaseAuth) {
        const user = {
          name: firebaseAuth.displayName ? firebaseAuth.displayName : '',
          photoUrl: firebaseAuth.photoURL ? firebaseAuth.photoURL : '',
          email: firebaseAuth.email ? firebaseAuth.email : '',
        };
        setUserInfo(user);
      }
    }

    loadUser();
  }, [firebaseAuth]);

  const handleNavBack = useCallback(() => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setUpdatingPhoto(true);
      const image = await fetch(result.uri);
      const blobImage = await image.blob();

      const imageRef = await storageFirebase
        .ref()
        .child(`images/${firebaseAuth?.uid}`);

      const uploadImage = await imageRef.put(blobImage);
      let linkImage = '';

      await imageRef.getDownloadURL().then(url => {
        if (url) {
          linkImage = url;
        }
      });

      firebaseAuth?.updateProfile({
        photoURL: linkImage,
      });

      const user = {
        name: userInfo.name,
        photoUrl: linkImage,
        email: userInfo.email,
      };
      setUserInfo(user);
      setUpdatingPhoto(false);
    }
  }, [storageFirebase, firebaseAuth, userInfo.name, userInfo.email]);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setUpdatingPhoto(true);
      const image = await fetch(result.uri);
      const blobImage = await image.blob();

      const imageRef = await storageFirebase
        .ref()
        .child(`images/${firebaseAuth?.uid}`);

      const uploadImage = await imageRef.put(blobImage);
      let linkImage = '';

      await imageRef.getDownloadURL().then(url => {
        if (url) {
          linkImage = url;
        }
      });

      firebaseAuth?.updateProfile({
        photoURL: linkImage,
      });

      const user = {
        name: userInfo.name,
        photoUrl: linkImage,
        email: userInfo.email,
      };
      setUserInfo(user);
      setUpdatingPhoto(false);
    }
  }, [storageFirebase, firebaseAuth, userInfo.name, userInfo.email]);

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

  const handleUpdateUser = useCallback(
    (user: UserUpdate) => {
      if (user.email !== userInfo.email && user.email !== undefined) {
        firebaseAuth?.updateEmail(user.email).catch(err => {
          console.log(err);
        });
      }

      if (user.name !== userInfo.name && user.name !== undefined) {
        firebaseAuth?.updateProfile({
          displayName: user.name,
        });
      }

      if (user.confirmPassword !== '') {
        firebaseAuth?.updatePassword(user.confirmPassword);
      }

      Alert.alert('Perfil atualizado com sucesso!', '', [
        {
          text: 'Ok',
          onPress: handleNavBack,
        },
      ]);
    },
    [firebaseAuth, userInfo.email, userInfo.name, handleNavBack],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <LogOffButton onPress={handleNavLogOff}>
          <FontAwesome5 name="power-off" size={25} color="#503d77" />
        </LogOffButton>
      </Header>

      <Title>Meu Perfil</Title>

      {updatingPhoto ? (
        <ActivityIndicator size={50} color="#503d77" />
      ) : userInfo.photoUrl ? (
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
            email: firebaseAuth?.email ? firebaseAuth?.email : '',
            password: '',
            name: firebaseAuth?.displayName ? firebaseAuth?.displayName : '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Precisa ser um email'),
            name: Yup.string().min(5, 'Deve conter no mínimo 5 letas'),
            password: Yup.string().min(6, 'No minímo 6 caracteres'),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref('password'), undefined],
              'As senhas devem ser iguais',
            ),
          })}
          onSubmit={values => handleUpdateUser(values)}
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

              {isSubmitting && <ActivityIndicator />}

              {!isSubmitting && (
                <Button
                  style={{ alignSelf: 'center' }}
                  onPress={() => handleSubmit()}
                >
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
