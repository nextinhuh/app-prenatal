import React from 'react';
import { StatusBar } from 'react-native';

import { useFonts, Sofia_400Regular } from '@expo-google-fonts/sofia';
import { Trocchi_400Regular } from '@expo-google-fonts/trocchi';
import { Lato_700Bold } from '@expo-google-fonts/lato';
import { PoiretOne_400Regular } from '@expo-google-fonts/poiret-one';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Underdog_400Regular } from '@expo-google-fonts/underdog';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { initializeApp } from 'firebase/app';

import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import AppContextProvider from './src/hooks';
import firebaseConfig from './src/config/FirebaseConfig';


const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Sofia_400Regular,
    Trocchi_400Regular,
    Lato_700Bold,
    Underdog_400Regular,
    PoiretOne_400Regular,
    Montserrat_400Regular,
    Roboto_400Regular,
    OpenSans_400Regular,
  });
  if (!fontsLoaded) SplashScreen.preventAutoHideAsync();
  else SplashScreen.hideAsync();
  const app = initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" translucent />
      <AppContextProvider>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
