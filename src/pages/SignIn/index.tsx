/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  CreateAccountButtonText,
  CreateAccountButton,
  ErrorText,
  ContainerSingIn,
  InputContainer,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  DividerContainer,
  Line,
  DividerText,
  SocialEntryButton,
  SocialEntryButtonText,
  SocialEntryContainer,
  ImageIcon,
} from './styles';

import logoGoogle from '../../assets/google.svg';
import logoFacebook from '../../assets/facebook.png';

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dbFirestore = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const [handleSubmit, setHandleSubmit] = useState<any>();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => handleLogon(values),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email é obrigatório')
        .email('Precisa ser um email'),
      password: Yup.string().required('Senha é obrigatória'),
    }),
  });

  async function handleLogon(user: UserData) {
    setLoading(!loading);
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(async logedUser => {
        if (logedUser.user?.displayName === null) {
          let userName: any;
          await dbFirestore
            .collection('users')
            .doc(logedUser.user?.uid)
            .get()
            .then(result => {
              if (result.exists) {
                userName = result.data();
              }
            });
          await firebase.auth().currentUser?.updateProfile({
            displayName: userName.name,
          });
        }
        setLoading(!loading);
      })
      .catch(err => {
        setLoading(false);

        Alert.alert(
          'Usuário / Senha Incorreto(s)!',
          'Favor verificar e tentar novamente.',
          [{ text: 'OK' }],
        );
      });
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ContainerSingIn>
          <Title>Cegonha</Title>

          <InputContainer>
            <KeyboardAvoidingView
              style={{ width: '100%', alignItems: 'center' }}
              behavior="height"
            >
              <Input
                onBlur={formik.handleBlur('email')}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorText>{formik.errors.email}</ErrorText>
              )}

              <Input
                onBlur={formik.handleBlur('password')}
                name="password"
                icon="lock"
                autoCapitalize="none"
                placeholder="Senha"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                isPassword
              />
              {formik.touched.password && formik.errors.password && (
                <ErrorText>{formik.errors.password}</ErrorText>
              )}
            </KeyboardAvoidingView>
          </InputContainer>


          <ForgotPasswordButton
            onPress={() => navigation.navigate('SignUp')}
          >
            <ForgotPasswordButtonText>
              Esqueceu a senha?
            </ForgotPasswordButtonText>
          </ForgotPasswordButton>

          <CreateAccountButton
            onPress={() => navigation.navigate('SignUp')}
          >
            <CreateAccountButtonText>Cadastre-se</CreateAccountButtonText>
          </CreateAccountButton>

          <DividerContainer>
            <Line />
            <DividerText>OU</DividerText>
            <Line />
          </DividerContainer>

          <SocialEntryButton>
            <SocialEntryContainer>
              <ImageIcon source={logoGoogle} />
              <SocialEntryButtonText>Entrar com Google</SocialEntryButtonText>
            </SocialEntryContainer>
          </SocialEntryButton>

          <SocialEntryButton>
            <SocialEntryContainer>
              <ImageIcon source={logoFacebook} />
              <SocialEntryButtonText>
                Entrar com Facebook
              </SocialEntryButtonText>
            </SocialEntryContainer>
          </SocialEntryButton>
        </ContainerSingIn>
      </TouchableWithoutFeedback>

      {!loading ? (
        <Button icon="arrowright" onPress={() => formik.handleSubmit()} />
      ) : (
          <ActivityIndicator style={{ marginTop: 25 }} size={40} color="#fd3954" />
        )}
    </Container>
  );
};

export default SignIn;
