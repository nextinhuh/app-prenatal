import React, { useEffect, useMemo, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerMenu from '../components/CustomDrawerMenu';
import { useTheme } from '../hooks/theme';

import Dashboard from '../pages/Dashboard';
import ProfileUpdate from '../pages/ProfileUpdate';
import Notes from '../pages/Notes';
import NoteView from '../pages/NoteView';
import Album from '../pages/Album';
import Consults from '../pages/Consults';
import Tips from '../pages/Tips';
import AlbumView from '../pages/AlbumView';
import ConfigurationMenu from '../pages/ConfigurationMenu';
import Welcome from '../pages/Welcome';

const Auth = createDrawerNavigator();

const AuthRoutes: React.FC = () => {
  const { color } = useTheme();

  return (
    <Auth.Navigator
      initialRouteName="Welcome"
      drawerContentOptions={{
        activeBackgroundColor: color ? color.colorTwo : '#EC6478',
        activeTintColor: 'white',
      }}
      drawerContent={props => <CustomDrawerMenu {...props} />}
    >
      <Auth.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Home',
        }}
      />
      <Auth.Screen
        name="Consults"
        component={Consults}
        options={{
          title: 'Consultas',
        }}
      />
      <Auth.Screen
        name="Album"
        component={Album}
        options={{
          title: 'Album',
        }}
      />
      <Auth.Screen
        name="Notes"
        component={Notes}
        options={{
          title: 'Notas',
        }}
      />

      <Auth.Screen
        name="ConfigurationMenu"
        component={ConfigurationMenu}
        options={{
          title: 'Configurações',
        }}
      />

      <Auth.Screen name="Welcome" component={Welcome} />

      <Auth.Screen name="NoteView" component={NoteView} />
      <Auth.Screen name="AlbumView" component={AlbumView} />

      <Auth.Screen name="Tips" component={Tips} />
      <Auth.Screen name="ProfileUpdate" component={ProfileUpdate} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
