import {Feather} from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 60px;
    background: #152461;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 0 16px;

    flex-direction: row;

    align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;

`;

export const Icon = styled(Feather)`
    margin-right: 16px;
`;