import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import MedicalRecords from '../pages/MedicalRecords';
import Prescriptions from '../pages/Prescriptions';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation: React.FC = () => (
  <BottomTabs.Navigator
    tabBarOptions={{
      activeBackgroundColor: '#b2dcea',
      activeTintColor: '#E03CFB',
      inactiveTintColor: '#503D77',
    }}
  >
    <BottomTabs.Screen
      name="MedicalRecords"
      component={MedicalRecords}
      options={{
        tabBarLabel: 'Prontuário',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="notes-medical" size={25} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Prescriptions"
      component={Prescriptions}
      options={{
        tabBarLabel: 'Prescrição',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="signature" size={25} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export default BottomTabsNavigation;
