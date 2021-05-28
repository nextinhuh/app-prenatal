import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ConfigurationContainer = styled.View`
  height: 100%;
  width: 100%;

  padding: 10%;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-right: -380%;
  font-family: 'Montserrat_400Regular';
`;

export const ConfigurationTitle = styled.Text`
  font-family: 'Montserrat_400Regular';
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 5%;
`;

export const ConfigurationItem = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 5%;
  margin-top: 10%;
`;

export const ConfigurationItemText = styled.Text`
  font-size: 18px;
  color: white;
  font-family: 'Montserrat_400Regular';
  margin-left: 8%;
`;
