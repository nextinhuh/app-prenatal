import React, { useCallback } from 'react';
import { Alert, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
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
  Image,
  TitleDescription,
  ErrorText,
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
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <Container>
          <Title>Cegonha</Title>
          <Image source={logoImg} />
          <TitleDescription>Crie sua conta</TitleDescription>

          <Formik
            initialValues={{
              email: '',
              password: '',
              name: '',
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
            onSubmit={values => handleCreateUser(values)}
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
                  <Button onPress={() => handleSubmit()}>Criar conta</Button>
                )}
              </>
            )}
          </Formik>
        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="arrow-back"
          size={20}
          color="#76348D"
          style={{ marginRight: 10 }}
        />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </Container>
  );
};

export default SignUp;
