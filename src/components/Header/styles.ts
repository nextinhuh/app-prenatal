import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 6%;
  margin-top: 15%;
  flex-direction: row;
  align-items: center;
  border-right-width: 8px;
  border-color: #f54f51;
  padding: 0px 15px;
`;

export const BackNavigationButton = styled.TouchableOpacity``;

export const TitleText = styled.Text`
  font-size: 24px;
  color: #f54f51;
  font-family: 'Montserrat_400Regular';
  margin-left: 15px;
  font-weight: bold;
`;

export const ChildrenContainer = styled.View`
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 30%;
  flex-direction: row;
  margin-left: 3%;
`;
