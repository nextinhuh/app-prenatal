import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '../hooks/theme';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AuthFirstLoginRoutes from './authFirstLogin.routes';

const Routes: React.FC = () => {
  const [userStatusLogged, setUserStatusLogged] = useState<React.FC>(AppRoutes);
  const [loading, setLoading] = useState(true);
  const dbFirestore = getFirestore();
  const { updateThemeColor } = useTheme();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    /*
    firebase.auth().onAuthStateChanged(async status => {
      if (status?.uid) {
        await dbFirestore
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .get()
          .then(async result => {
            if (result.data()?.firstLogin) {
              let userName: any;

              if (result.exists) {
                userName = result.data();
              }

              await firebase.auth().currentUser?.updateProfile({
                displayName: userName.name,
              });
              setUserStatusLogged(AuthFirstLoginRoutes);
              setLoading(false);
              SplashScreen.hideAsync();
            } else {
              updateThemeColor({
                colorOne: result.data()?.themeColor?.colorOne,
                colorTwo: result.data()?.themeColor?.colorTwo,
              });

              setUserStatusLogged(AuthRoutes);
              setLoading(false);
              SplashScreen.hideAsync();
            }
          });
      } else {
        setUserStatusLogged(AppRoutes);
        setLoading(false);
        SplashScreen.hideAsync();
      }
    });*/
  }, [dbFirestore, updateThemeColor]);

  return <>{loading ? userStatusLogged : userStatusLogged}</>;
};

export default Routes;
