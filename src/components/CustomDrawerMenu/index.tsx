/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Container, BorderRight } from './styles';

const CustomDrawerMenu: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps,
) => {
  const { state, ...rest } = props;
  const newState = { ...state }; // copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter(
    (item: { name: string }) => item.name !== 'NoteView',
  ); // replace "Login' with your route name
  return (
    <Container>
      <BorderRight>
        <AntDesign
          name="home"
          size={24}
          color="white"
          style={{ marginTop: '140%' }}
        />

        <FontAwesome5
          name="person-booth"
          size={24}
          color="white"
          style={{ marginTop: '110%' }}
        />

        <MaterialIcons
          name="photo-album"
          size={24}
          color="white"
          style={{ marginTop: '110%' }}
        />

        <FontAwesome5
          name="newspaper"
          size={24}
          color="white"
          style={{ marginTop: '105%' }}
        />
      </BorderRight>
      <DrawerContentScrollView {...props} style={{}}>
        <DrawerItemList
          {...rest}
          state={newState}
          labelStyle={{
            fontFamily: 'Montserrat_400Regular',
            fontWeight: 'bold',
          }}
          itemStyle={{
            marginTop: 30,
            marginLeft: 0,
            width: '100%',
            borderRadius: 0,
          }}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default CustomDrawerMenu;
