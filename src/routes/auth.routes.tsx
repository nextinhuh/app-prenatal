import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ProfileUpdate from '../pages/ProfileUpdate';
import Notes from '../pages/Notes';
import Album from '../pages/Album';

import BottomTabs from './bottom.tabs.routes';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />

    <Auth.Screen name="Dashboard" component={Dashboard} />

    <Auth.Screen name="Album" component={Album} />
    <Auth.Screen name="Notes" component={Notes} />
    <Auth.Screen name="ProfileUpdate" component={ProfileUpdate} />

    <Auth.Screen name="BottomTabsMedicalRecords" component={BottomTabs} />
  </Auth.Navigator>
);

export default AuthRoutes;
