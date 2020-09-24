import React from 'react';
import {StatusBar, View} from 'react-native'

import Routes from './src/routes'

import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => (
    <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#2641AD" />
        <View style={{ flex: 1, backgroundColor: '#2641AD' }}>
        <Routes />
      </View>
    </NavigationContainer>
)

export default App;