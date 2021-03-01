/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  ErrorText,
  SingUpContainer,
  InputContainer,
} from './styles';

import logoImg from '../../assets/logo.png';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const dbFirestore = firebase.firestore();

  const formik = useFormik({
    initialValues: { email: '', password: '', name: '', confirmPassword: '' },
    onSubmit: values => handleCreateUser(values),
    validationSchema: Yup.object().shape({
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
    }),
  });

  const handleCreateUser = useCallback(
    (user: User) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(userCreated => {
          dbFirestore.collection('users').doc(userCreated.user?.uid).set({
            name: user.name,
          });
          Alert.alert(
            `Olá bem vindo(a) ${user.name},`,
            'Sua conta foi criada com sucesso!',
            [{ text: 'OK' }],
          );
          firebase.auth().signOut();

          navigation.navigate('SignIn');
        })
        .catch(err => {
          let msgErro = '';
          switch (err.code) {
            case 'auth/email-already-in-use':
              msgErro =
                'O endereço de email já esta sendo utilizado, favor tentar um diferente.';
              break;

            default:
              msgErro = err.code;
              break;
          }
          Alert.alert('Erro!', `${msgErro}`, [{ text: 'Ok' }]);
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp' }],
          });
        });
    },
    [navigation, dbFirestore],
  );

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SingUpContainer>
          <Title>Cegonha</Title>

          <InputContainer>
            <KeyboardAvoidingView
              style={{ width: '100%', alignItems: 'center', flex: 1 }}
              behavior="height"
            >
              <Input
                onBlur={formik.handleBlur('name')}
                name="name"
                icon="user"
                placeholder="Nome"
                value={formik.values.name}
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

              <BackToSignIn onPress={() => navigation.goBack()}>
                <BackToSignInText>
                  Já possui uma conta? Faça já o login
                </BackToSignInText>
              </BackToSignIn>

            </KeyboardAvoidingView>

          </InputContainer>
        </SingUpContainer>
      </TouchableWithoutFeedback>

      {!formik.isSubmitting ? (
        <Button icon="check" onPress={() => formik.handleSubmit()} />
      ) : (
          <ActivityIndicator
            style={{ marginTop: 25 }}
            size={40}
            color="#fd3954"
          />
        )}

    </Container>
  );
};

export default SignUp;
