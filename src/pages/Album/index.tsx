import React, { useCallback, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  Header,
  BackButton,
  OptionButton,
  AlbumList,
  Image,
  ImageButton,
} from './styles';

const Album: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleNavBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const images = [
    {
      id: 1,
      uri:
        'https://avatars0.githubusercontent.com/u/50875570?s=460&u=fe14fc8cb776233600522328f1ea1406f895f44a&v=4',
    },
    {
      id: 2,
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
    },
    {
      id: 3,
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
    },
    {
      id: 4,
      uri:
        'https://images.pexels.com/photos/4669141/pexels-photo-4669141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 5,
      uri:
        'https://images.pexels.com/photos/4669107/pexels-photo-4669107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 6,
      uri:
        'https://images.pexels.com/photos/4669103/pexels-photo-4669103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 7,
      uri:
        'https://images.pexels.com/photos/4669109/pexels-photo-4669109.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 8,
      uri:
        'https://images.pexels.com/photos/4669142/pexels-photo-4669142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 9,
      uri:
        'https://images.pexels.com/photos/4669118/pexels-photo-4669118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 10,
      uri:
        'https://images.pexels.com/photos/4669102/pexels-photo-4669102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 11,
      uri:
        'https://images.pexels.com/photos/4669101/pexels-photo-4669101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 12,
      uri:
        'https://images.pexels.com/photos/5192920/pexels-photo-5192920.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 13,
      uri:
        'https://images.pexels.com/photos/1046399/pexels-photo-1046399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 14,
      uri:
        'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 15,
      uri:
        'https://images.pexels.com/photos/1550342/pexels-photo-1550342.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 16,
      uri:
        'https://images.pexels.com/photos/1046398/pexels-photo-1046398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 17,
      uri:
        'https://images.pexels.com/photos/1550340/pexels-photo-1550340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 18,
      uri:
        'https://images.pexels.com/photos/3973905/pexels-photo-3973905.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 19,
      uri:
        'https://images.pexels.com/photos/5756577/pexels-photo-5756577.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 20,
      uri:
        'https://images.pexels.com/photos/1550334/pexels-photo-1550334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 21,
      uri:
        'https://images.pexels.com/photos/4669146/pexels-photo-4669146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      id: 22,
      uri:
        'https://images.pexels.com/photos/5756565/pexels-photo-5756565.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 23,
      uri:
        'https://images.pexels.com/photos/258644/pexels-photo-258644.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ];

  const handleToggleImageView = useCallback(
    index => {
      setImageIndex(index);
      setIsVisible(!visible);
    },
    [visible],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Album</Title>

        <OptionButton>
          <FontAwesome5 name="ellipsis-v" size={25} color="#503d77" />
        </OptionButton>
      </Header>

      <AlbumList
        data={images}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={image => image.uri}
        renderItem={({ item: image, index }) => (
          <ImageButton onPress={() => handleToggleImageView(index)}>
            <Image source={{ uri: image.uri }} />
          </ImageButton>
        )}
      />

      <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </Container>
  );
};

export default Album;
