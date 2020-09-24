import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    padding: 0 30px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #FFF;
    margin-bottom: 30px;
    margin-top: 20px;
`;

export const BackToSignIn = styled.TouchableOpacity`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
`;

export const BackToSignInText = styled.Text`
    font-size: 16px;
    color: #FFF;
    padding-left: 10px;
`;

export const Image = styled.Image`
    width: 200px;
    height: 200px;
`;