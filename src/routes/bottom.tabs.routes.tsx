import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import MedicalRecords from '../pages/MedicalRecords';
import Prescriptions from '../pages/Prescriptions';

const BottomTabs = createBottomTabNavigator();

const AuthRoutes: React.FC = () => (
  <BottomTabs.Navigator
    tabBarOptions={{
      activeTintColor: '#E03CFB',
      inactiveTintColor: '#503D77',
    }}
  >
    <BottomTabs.Screen
      name="ProfileUpdate"
      component={MedicalRecords}
      options={{
        tabBarLabel: 'Prontuários',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="notes-medical" size={25} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Prescriptions"
      component={Prescriptions}
      options={{
        tabBarLabel: 'Prescrições',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="signature" size={25} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export default AuthRoutes;
