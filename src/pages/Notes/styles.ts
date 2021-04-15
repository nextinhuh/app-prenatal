import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 0px 40px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleCard = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat_400Regular';
  color: white;
  font-weight: bold;
  background-color: #f54f51;
`;

export const DeleteButtonSquare = styled.TouchableOpacity``;

export const DeleteContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DeleteButtonText = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat_400Regular';
  color: #f54f51;
  margin-right: 10px;
`;
