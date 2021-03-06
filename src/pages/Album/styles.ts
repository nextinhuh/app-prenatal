import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface ImageProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  width: 100%;
  padding: 0px 40px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

export const CancelDeleteButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ConfirmDeleteButton = styled.TouchableOpacity`
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

export const AlbumList = styled(FlatList as new () => FlatList)`
  width: 100%;
  margin-bottom: 15px;
  margin-top: 10%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const ImageContainer = styled.View`
  width: 100%;
  margin-bottom: 5%;
  border-color: #f54f51;
  border-width: 0.1px;
  border-radius: 3px;
`;

export const ImageButton = styled.TouchableOpacity`
  align-items: center;
  width: 100%;
  height: 110px;
  justify-content: center;
`;

export const AlbumTitle = styled.Text`
  position: absolute;
  top: 18px;
  left: 0px;
  max-width: 190px;
  min-width: 60px;
  padding-left: 10px;
  background-color: #f54f51;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  text-align: right;
  color: white;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`;

export const Image = styled.Image<ImageProps>`
  width: 100%;
  height: 110px;
  border-radius: 8px;
  opacity: ${props => (props.isSelected ? 0.2 : 1)};
`;

export const ImageButtonDelete = styled.TouchableOpacity`
  position: absolute;
  right: -300px;
  width: 100%;
  height: 100%;
  top: 10px;
`;
