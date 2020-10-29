import React from 'react';
import { StatusBar, Text } from 'react-native';
import { useFonts, Sofia_400Regular } from '@expo-google-fonts/sofia';
import { Trocchi_400Regular } from '@expo-google-fonts/trocchi';
import { Lato_700Bold } from '@expo-google-fonts/lato';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Sofia_400Regular,
    Trocchi_400Regular,
    Lato_700Bold,
  });
  if (!fontsLoaded)
    return <Text>Carregando - trocar por outra tela depois</Text>;
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
