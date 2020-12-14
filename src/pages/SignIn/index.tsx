import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
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
  Image,
  TitleDescription,
} from './styles';

import logoImg from '../../assets/logo.png';

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dbFirestore = firebase.firestore();
  const [loading, setLoading] = useState(false);

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Container>
        <Title>Cegonha</Title>

        <Image source={logoImg} />

        <TitleDescription>Faça seu login</TitleDescription>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required('Email é obrigatório')
              .email('Precisa ser um email'),
            password: Yup.string().required('Senha é obrigatória'),
          })}
          onSubmit={values => handleLogon(values)}
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
                onBlur={handleBlur('email')}
                name="email"
                icon="mail"
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}

              <Input
                onBlur={handleBlur('password')}
                name="password"
                icon="lock"
                placeholder="Senha"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}

              {loading && <ActivityIndicator />}

              {!loading && (
                <Button onPress={() => handleSubmit()}>Entrar</Button>
              )}
            </>
          )}
        </Formik>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <CreateAccountButtonText>Cadastre-se</CreateAccountButtonText>
        </CreateAccountButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
