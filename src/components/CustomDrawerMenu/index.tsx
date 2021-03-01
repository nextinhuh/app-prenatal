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
  props: any,
) => {
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
          {...props}
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
