import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  Image,
  TitleDescription,
} from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Title>Cegonha</Title>
      <Image source={logoImg} />
      <TitleDescription>Crie sua conta</TitleDescription>

      <Input name="name" placeholder="Nome Completo" icon="user" />
      <Input name="email" placeholder="E-mail" icon="mail" />
      <Input name="password" placeholder="Senha" icon="lock" />

      <Button>Criar conta</Button>

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
