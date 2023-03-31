import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/Input';
import Button from '../../components/Button';
import imgUserIcon from '../../assets/user.png';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  ButtonEditAvatar,
  ErrorText,
  HeaderContainer,
  HeaderTitle,
  UserAvatar,
  FormContainer,
  ProfileContainer,
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
  const { color } = useTheme();
  const keyboard = useKeyboard();
  const dbFirestore = getFirestore();
  const firebaseAuth = getAuth().currentUser;
  const storageFirebase = getStorage();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const user = {
        name: firebaseAuth?.displayName || '',
        photoUrl: firebaseAuth?.photoURL || '',
        email: firebaseAuth?.email || '',
      };
      setUserInfo(user);
    }
    loadUser();
  }, [firebaseAuth]);

  const handleNavBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [navigation]);

  const handleTakePhoto = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    /*
    if (!result.canceled) {
      setUpdatingPhoto(true);
      const image = await fetch(result.assets[0].uri);
      const blobImage = await image.blob();

      const imageRef = await storageFirebase
        .ref()
        .child(`images/${firebaseAuth?.uid}`);

      await imageRef.put(blobImage);
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
    }*/
  }, [storageFirebase, firebaseAuth, userInfo.name, userInfo.email]);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    /*
    if (!result.canceled) {
      setUpdatingPhoto(true);
      const image = await fetch(result.assets[0].uri);
      const blobImage = await image.blob();

      const imageRef = await storageFirebase
        .ref()
        .child(`images/${firebaseAuth?.uid}`);

      await imageRef.put(blobImage);
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
    }*/
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
    async (user: UserUpdate) => {
      /*
      if (user.email !== userInfo.email && user.email !== undefined) {
        console.log(userInfo.email);
        await firebaseAuth?.updateEmail(user.email).catch(err => {
          console.log(err);
        });
      }

      if (user.name !== userInfo.name && user.name !== undefined) {
        await firebaseAuth
          ?.updateProfile({
            displayName: user.name,
          })
          .then(() => {
            dbFirestore
              .collection('users')
              .doc(firebaseAuth.uid)
              .update({ name: user.name });
          });
      }

      if (user.confirmPassword !== '') {
        await firebaseAuth?.updatePassword(user.confirmPassword).then(() => {
          Alert.alert('Perfil atualizado com sucesso!', '', [
            {
              text: 'Ok',
              onPress: handleNavBack,
            },
          ]);
        });
      }

      Alert.alert('Perfil atualizado com sucesso!', '', [
        {
          text: 'Ok',
          onPress: handleNavBack,
        },
      ]);*/
    },
    [firebaseAuth, userInfo, handleNavBack, dbFirestore],
  );

  const formik = useFormik({
    initialValues: {
      email: userInfo.email,
      password: '',
      name: userInfo.name,
      confirmPassword: '',
    },
    onSubmit: values => handleUpdateUser(values),
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Formato do email incorreto!'),
      name: Yup.string().min(5, 'Deve conter no mínimo 5 letas'),
      password: Yup.string().min(6, 'No minímo 6 caracteres'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'As senhas devem ser iguais',
      ),
    }),
  });

  const navBackResetRoute = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [navigation]);

  return (
    <Container>
      <ProfileContainer keyboardVisible={keyboard.keyboardShown}>
        <LinearGradient
          // Background Linear Gradient
          colors={
            color
              ? [`${color.colorOne}`, `${color.colorTwo}`]
              : ['#F74462', '#FE3855']
          }
          style={{
            flex: 1,
            width: '100%',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            elevation: 30,
          }}
        >
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
          >
            <HeaderContainer>
              <Header
                iconColor="#FFF"
                borderWhiteColor
                backFunction={navBackResetRoute}
                style={{ height: '18%' }}
              >
                <HeaderTitle>PERFIL</HeaderTitle>
              </Header>
            </HeaderContainer>

            {updatingPhoto ? (
              <ActivityIndicator size={50} color="#503d77" />
            ) : userInfo.photoUrl ? (
              <UserAvatar
                source={{
                  uri: `${userInfo.photoUrl}`,
                }}
              />
            ) : (
              <UserAvatar source={imgUserIcon} />
            )}

            <ButtonEditAvatar onPress={handleAddPhoto}>
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={30}
                color={color ? color.colorTwo : '#fe3855'}
              />
            </ButtonEditAvatar>

            <FormContainer>
              <Input
                onBlur={formik.handleBlur('name')}
                name="name"
                icon="user"
                defaultValue={userInfo.name}
                onChangeText={formik.handleChange('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <ErrorText>{formik.errors.name}</ErrorText>
              )}

              <Input
                onBlur={formik.handleBlur('email')}
                name="email"
                icon="mail"
                placeholder="E-mail"
                defaultValue={userInfo.email}
                onChangeText={formik.handleChange('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorText>{formik.errors.email}</ErrorText>
              )}

              <Input
                onBlur={formik.handleBlur('password')}
                name="password"
                icon="lock"
                placeholder="Senha"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                isPassword
              />
              {formik.touched.password && formik.errors.password && (
                <ErrorText>{formik.errors.password}</ErrorText>
              )}

              <Input
                onBlur={formik.handleBlur('confirmPassword')}
                name="confirmPassword"
                icon="lock"
                placeholder="Confirmar senha"
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                isPassword
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <ErrorText>{formik.errors.confirmPassword}</ErrorText>
                )}

              {formik.isSubmitting && <ActivityIndicator />}
            </FormContainer>
          </ScrollView>
        </LinearGradient>
      </ProfileContainer>

      {!formik.isSubmitting && (
        <Button
          icon="check"
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginBottom: 35,
            marginTop: 10,
            backgroundColor: color && color.colorTwo,
          }}
          onPress={() => formik.handleSubmit()}
        />
      )}
    </Container>
  );
};

export default ProfileUpdate;
