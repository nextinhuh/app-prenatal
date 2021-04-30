import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import * as SplashScreen from 'expo-splash-screen';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const [userStatus, setUserStatus] = useState<React.FC>(AppRoutes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    firebase.auth().onAuthStateChanged(status => {
      if (status) {
        setUserStatus(AuthRoutes);
        setLoading(false);
        SplashScreen.hideAsync();
      } else {
        setUserStatus(AppRoutes);
        setLoading(false);
        SplashScreen.hideAsync();
      }
    });
  }, []);

  return <>{loading ? null : userStatus}</>;
};

export default Routes;
