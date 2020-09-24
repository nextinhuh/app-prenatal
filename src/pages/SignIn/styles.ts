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
    margin-top: 20px;
    margin-bottom: 30px;
`;

export const CreateAccountButtonText = styled.Text`
    color: #FFF;
    font-size: 18px;
    margin-left: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
    margin-top: 120px;
`;

export const ErrorText = styled.Text`
    color: red;
    font-size: 16px;
    font-weight: bold;
    align-self: flex-end;
`;

export const Image = styled.Image`
    width: 200px;
    height: 200px;
`;