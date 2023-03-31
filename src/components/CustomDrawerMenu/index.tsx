/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from 'react';
import { Text } from 'react-native';
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Feather,
  Entypo,
} from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';

import { Container, BorderRight } from './styles';
import { useTheme } from '../../hooks/theme';

const CustomDrawerMenu: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps,
) => {
  const { state, ...rest } = props;
  const newState = { ...state }; // copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter((item: { name: string }) => {
    if (
      item.name !== 'NoteView' &&
      item.name !== 'Tips' &&
      item.name !== 'ProfileUpdate' &&
      item.name !== 'BottomTabsMedicalRecords' &&
      item.name !== 'AlbumView' &&
      item.name !== 'Welcome'
    ) {
      return true;
    }
    return false;
  }); // replace "Login' with your route name

  const handleNavLogOff = useCallback(() => {
    getAuth().signOut();
  }, []);

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

        <Entypo
          name="tools"
          size={24}
          color="white"
          style={{ marginTop: '100%' }}
        />

        <Feather
          name="log-out"
          size={24}
          color="white"
          style={{ marginTop: '100%' }}
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
        <DrawerItem
          label={() => (
            <Text
              style={{
                color: '#3D4E57',
                fontWeight: 'bold',
                fontFamily: 'Montserrat_400Regular',
              }}
            >
              Sair
            </Text>
          )}
          style={{ marginLeft: 0, marginTop: 30 }}
          onPress={() => handleNavLogOff()}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default CustomDrawerMenu;
