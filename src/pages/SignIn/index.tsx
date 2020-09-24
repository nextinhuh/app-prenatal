import React from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {useNavigation} from '@react-navigation/native';

import {Container, Title, CreateAccountButtonText, CreateAccountButton, ErrorText, Image} from './styles';

import logoImg from '../../assets/logo.png';

interface UserData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    async function handleLogon(user: UserData){
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(user.email === 'teste@teste.com' && user.password === '1234'){
            navigation.navigate('Dashboard')
        }else{
            Alert.alert(
                "Usuário / Senha Incorreto(s)!",
                "Favor verificar e tentar novamente.",
                [
                  { text: "OK" }
                ]
                );
        }
    }

    return (
        <Container>
            <Image source={logoImg}/>
            <View>
                <Title>Faça seu logon</Title>
            </View>

            <Formik
                initialValues={{email:'', password: ''}}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required('Email é obrigatório').email('Precisa ser um email'),
                    password: Yup.string().required('Senha é obrigatória')
                })}
                onSubmit={values => handleLogon(values)}
            >
                {({values, handleChange, handleSubmit, errors, isSubmitting, handleBlur, touched}) => (
                    <>
                    <Input 
                    onBlur={handleBlur('email')}
                    name="email" 
                    icon="mail" 
                    placeholder="E-mail" 
                    value={values.email} 
                    onChangeText={handleChange('email')}
                    />
                    {touched.email && <ErrorText >{errors.email}</ErrorText>}

                    <Input 
                    onBlur={handleBlur('password')}
                    name="password" 
                    icon="lock" 
                    placeholder="Senha" 
                    value={values.password} 
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    />
                    {touched.password && <ErrorText >{errors.password}</ErrorText>}
                    

                    {isSubmitting && <ActivityIndicator />}
                    
                    {!isSubmitting && <Button onPress={() => handleSubmit()}>Entrar</Button>}
                    
                    </>
                )}
            </Formik>

            

            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
              <CreateAccountButtonText>Crie uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </Container>
    )
}

export default SignIn;