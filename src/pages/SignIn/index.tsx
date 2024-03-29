/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import iconImg from '../../assets/icon.png';

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
} from './styles';

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => handleLogon(values),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email é obrigatório')
        .email('Precisa ser um email'),
      password: Yup.string().required('Senha é obrigatória').min(6, 'No minímo 6 caracteres'),
    }),
  });

  async function handleLogon(user: UserData) {
    setLoading(!loading);
    /*
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        setLoading(!loading);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          'Usuário / Senha Incorreto(s)!',
          'Favor verificar e tentar novamente.',
          [{ text: 'OK' }],
        );
      });*/
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ContainerSingIn keyboardVisible={keyboard.keyboardShown}>
          <LinearGradient
            colors={['#F74462', '#FE3855']}
            style={{
              flex: 1,
              width: '100%',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              alignItems: 'center',
              elevation: 30
            }}
          >

            <Title>Cegonha</Title>

            {!keyboard.keyboardShown && <Image source={iconImg} style={{ width: 150, height: 150, marginBottom: -50, resizeMode: 'contain' }} />}

            <ScrollView
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
            >


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

              </InputContainer>

            </ScrollView>
          </LinearGradient>
        </ContainerSingIn>

        {!loading ? (
          <Button icon="arrowright" onPress={() => formik.handleSubmit()} style={{ marginTop: 10 }} />
        ) : (
          <ActivityIndicator style={{ marginTop: 25 }} size={40} color="#fd3954" />
        )}

      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
