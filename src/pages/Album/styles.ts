import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface ImageProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
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

export const OptionButton = styled.TouchableOpacity``;
export const BackButton = styled.TouchableOpacity``;

export const CancelDeleteButton = styled.TouchableOpacity`
  margin-top: -40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CancelDeleteButtonText = styled.Text`
  font-size: 18px;
  font-family: Underdog_400Regular;
  color: #503d77;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: Underdog_400Regular;
  color: #503d77;
`;

export const AlbumList = styled(FlatList as new () => FlatList)`
  width: 90%;
  height: 50%;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Image = styled.Image<ImageProps>`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin: 5px;
  opacity: ${props => (props.isSelected ? 0.1 : 1)};
`;

export const ImageButton = styled.TouchableOpacity``;

export const ImageButtonDelete = styled.TouchableOpacity``;
