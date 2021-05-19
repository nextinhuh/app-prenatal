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
  width: 85%;
  margin-top: 15%;
`;

export const ImageContainer = styled.View`
  position: relative;
`;

export const ImageButton = styled.TouchableOpacity``;

export const Image = styled.Image<ImageProps>`
  width: 100px;
  position: relative;
  height: 100px;
  border-radius: 8px;
  margin: 5px;
  opacity: ${props => (props.isSelected ? 0.3 : 1)};
`;

export const ImageButtonDelete = styled.TouchableOpacity`
  position: absolute;
  left: 65px;
  width: 100%;
  height: 100%;
  top: 10px;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
`;
