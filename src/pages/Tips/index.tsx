import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, Modal, View, Text } from 'react-native';
import { Button, Card, Menu, Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { Container, Header, BackButton, Title, OptionButton } from './styles';

import Input from '../../components/Input';
import Button2 from '../../components/Button';

const Tips: React.FC = () => {
  const navigation = useNavigation();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const firebaseAuth = getAuth().currentUser;
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [carouselItems, setCarouselItems] = useState({
    activeIndex: 0,
    carouselItems: [
      {
        title: 'Item 1',
        text: 'Text 1',
      },
      {
        title: 'Item 2',
        text: 'Text 2',
      },
      {
        title: 'Item 3',
        text: 'Text 3',
      },
      {
        title: 'Item 4',
        text: 'Text 4',
      },
      {
        title: 'Item 5',
        text: 'Text 5',
      },
    ],
  });

  useEffect(() => { }, [firebaseAuth]);

  const handleNavBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleMenu = useCallback(() => {
    setVisibleMenu(!visibleMenu);
  }, [visibleMenu]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Tips</Title>

        <Menu
          visible={visibleMenu}
          onDismiss={handleToggleMenu}
          anchor={
            <OptionButton onPress={handleToggleMenu}>
              <FontAwesome5 name="ellipsis-v" size={30} color="#503d77" />
            </OptionButton>
          }
        >
          <Menu.Item onPress={() => { }} title="Adicionar uma foto" />
          <Divider />
          <Menu.Item onPress={() => { }} title="Apagar foto(s)" />
        </Menu>
      </Header>

    </Container>
  );
};

export default Tips;
