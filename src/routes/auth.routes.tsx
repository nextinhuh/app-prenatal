import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import CustomDrawerMenu from '../components/CustomDrawerMenu';

import Dashboard from '../pages/Dashboard';
import ProfileUpdate from '../pages/ProfileUpdate';
import Notes from '../pages/Notes';
import NoteView from '../pages/NoteView';
import Album from '../pages/Album';
import Consults from '../pages/Consults';
import Tips from '../pages/Tips';

import BottomTabs from './bottom.tabs.routes';

const Auth = createDrawerNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    initialRouteName="Notes"
    drawerContentOptions={{
      activeBackgroundColor: '#EC6478',
      activeTintColor: 'white',
    }}
    drawerContent={props => <CustomDrawerMenu {...props} />}
  >
    <Auth.Screen
      name="Notes"
      component={Notes}
      options={{
        title: 'Notas',
      }}
    />
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
    <Auth.Screen name="NoteView" component={NoteView} />

    <Auth.Screen name="Tips" component={Tips} />
    <Auth.Screen name="ProfileUpdate" component={ProfileUpdate} />

    <Auth.Screen name="BottomTabsMedicalRecords" component={BottomTabs} />
  </Auth.Navigator>
);

export default AuthRoutes;
